// Domain logic for transaction management.
// All functions are stateless — they operate on the provided state slices.
// ID counters are passed as single-element List<Nat> so they can be mutated by reference.
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import TxTypes "../types/transactions";

module {
  public type Transaction = TxTypes.Transaction;
  public type CreateTransactionInput = TxTypes.CreateTransactionInput;
  public type UpdateTransactionInput = TxTypes.UpdateTransactionInput;
  public type DashboardSummary = TxTypes.DashboardSummary;
  public type TransactionType = TxTypes.TransactionType;
  public type Category = TxTypes.Category;

  // ── Internal helpers ──────────────────────────────────────────────────────

  /// Read the current value from a single-element counter list.
  func peekId(counter : List.List<Nat>) : Nat {
    switch (counter.first()) {
      case (?n) n;
      case null 1; // fallback; should never happen if properly initialised
    };
  };

  /// Increment the counter stored in the first element of the list.
  func bumpId(counter : List.List<Nat>) {
    let current = peekId(counter);
    counter.put(0, current + 1);
  };

  // ── Public functions ──────────────────────────────────────────────────────

  /// Create and add a new transaction to the list; returns the created record.
  /// `nextIdCounter` must be a single-element List initialised to the starting ID.
  public func create(
    txns : List.List<Transaction>,
    nextIdCounter : List.List<Nat>,
    userId : Text,
    input : CreateTransactionInput,
    now : Int,
  ) : Transaction {
    let id = peekId(nextIdCounter);
    let tx : Transaction = {
      id;
      userId;
      txType = input.txType;
      amount = input.amount;
      category = input.category;
      date = input.date;
      description = input.description;
      createdAt = now;
      updatedAt = now;
    };
    txns.add(tx);
    bumpId(nextIdCounter);
    tx;
  };

  /// Return all transactions belonging to the given user, sorted by date descending.
  public func getByUser(
    txns : List.List<Transaction>,
    userId : Text,
  ) : [Transaction] {
    let userTxns = txns.filter(func(t : Transaction) : Bool { t.userId == userId });
    // Sort descending by date (most recent first)
    userTxns.sort(func(a : Transaction, b : Transaction) : Order.Order {
      Int.compare(b.date, a.date)
    }).toArray();
  };

  /// Return a single transaction by ID for the given user, or null if not found/unauthorized.
  public func getById(
    txns : List.List<Transaction>,
    userId : Text,
    id : Nat,
  ) : ?Transaction {
    txns.find(func(t : Transaction) : Bool {
      t.id == id and t.userId == userId
    });
  };

  /// Update an existing transaction; traps if the record doesn't exist or belongs to another user.
  public func update(
    txns : List.List<Transaction>,
    userId : Text,
    input : UpdateTransactionInput,
    now : Int,
  ) : Transaction {
    let idx = switch (txns.findIndex(func(t : Transaction) : Bool { t.id == input.id })) {
      case (?i) i;
      case null Runtime.trap("Transaction not found");
    };
    let existing = txns.at(idx);
    if (existing.userId != userId) {
      Runtime.trap("Unauthorized: transaction belongs to another user");
    };
    let updated : Transaction = {
      existing with
      txType = input.txType;
      amount = input.amount;
      category = input.category;
      date = input.date;
      description = input.description;
      updatedAt = now;
    };
    txns.put(idx, updated);
    updated;
  };

  /// Remove a transaction by ID; traps if not found or unauthorized.
  public func delete(
    txns : List.List<Transaction>,
    userId : Text,
    id : Nat,
  ) : () {
    let idx = switch (txns.findIndex(func(t : Transaction) : Bool { t.id == id })) {
      case (?i) i;
      case null Runtime.trap("Transaction not found");
    };
    let existing = txns.at(idx);
    if (existing.userId != userId) {
      Runtime.trap("Unauthorized: transaction belongs to another user");
    };
    // Shift remaining elements: remove by rebuilding without the target
    let filtered = txns.filter(func(t : Transaction) : Bool { t.id != id });
    txns.clear();
    txns.addAll(filtered.values());
  };

  /// Return transactions for a user filtered to a specific month/year.
  /// `month` is 1–12. Dates are nanosecond timestamps; we convert to seconds for month/year math.
  public func getByMonth(
    txns : List.List<Transaction>,
    userId : Text,
    month : Nat,
    year : Nat,
  ) : [Transaction] {
    txns.filter(func(t : Transaction) : Bool {
      if (t.userId != userId) return false;
      // Convert nanosecond timestamp to seconds
      let secs = Int.abs(t.date) / 1_000_000_000;
      // Days since Unix epoch
      let days = secs / 86400;
      // Compute year/month using proleptic Gregorian calendar (simplified)
      let (txYear, txMonth) = daysToYearMonth(days);
      txYear == year and txMonth == month;
    }).toArray();
  };

  /// Return transactions for a user filtered by category.
  public func getByCategory(
    txns : List.List<Transaction>,
    userId : Text,
    category : Category,
  ) : [Transaction] {
    txns.filter(func(t : Transaction) : Bool {
      t.userId == userId and t.category == category
    }).toArray();
  };

  /// Compute dashboard summary (total balance, income, expenses) for a user.
  public func dashboardSummary(
    txns : List.List<Transaction>,
    userId : Text,
  ) : DashboardSummary {
    var totalIncome : Nat = 0;
    var totalExpenses : Nat = 0;
    var count : Nat = 0;

    txns.forEach(func(t : Transaction) {
      if (t.userId == userId) {
        count += 1;
        switch (t.txType) {
          case (#income) { totalIncome += t.amount };
          case (#expense) { totalExpenses += t.amount };
        };
      };
    });

    let totalBalance : Int = totalIncome.toInt() - totalExpenses.toInt();
    {
      totalBalance;
      totalIncome;
      totalExpenses;
      transactionCount = count;
    };
  };

  // ── Calendar helpers ──────────────────────────────────────────────────────

  /// Convert days-since-Unix-epoch to (year, month).
  /// Uses the standard proleptic Gregorian algorithm.
  func daysToYearMonth(days : Nat) : (Nat, Nat) {
    // Algorithm: shift epoch to 1 March 0000 for simpler leap-year handling
    let z : Int = days.toInt() + 719468;
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Nat = Int.abs(z - era * 146097); // day of era [0, 146096]
    let yoe : Nat = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365; // year of era [0, 399]
    let y : Nat = Int.abs(yoe.toInt() + era * 400);
    let doy : Nat = doe - (365 * yoe + yoe / 4 - yoe / 100); // day of year [0, 365]
    let mp : Nat = (5 * doy + 2) / 153; // month prime [0, 11]
    let month : Nat = if (mp < 10) mp + 3 else mp - 9;
    let year : Nat = if (month <= 2) y + 1 else y;
    (year, month);
  };
};
