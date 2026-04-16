// Domain logic for budget management.
// All functions are stateless — they operate on the provided state slices.
// ID counter is passed as a single-element List<Nat> for mutable reference semantics.
import List "mo:core/List";
import Int "mo:core/Int";
import BudgetTypes "../types/budgets";
import TxTypes "../types/transactions";

module {
  public type Budget = BudgetTypes.Budget;
  public type SetBudgetInput = BudgetTypes.SetBudgetInput;
  public type BudgetWithSpending = BudgetTypes.BudgetWithSpending;
  public type Category = TxTypes.Category;
  public type Transaction = TxTypes.Transaction;

  // ── Internal helpers ──────────────────────────────────────────────────────

  /// Read the current value from a single-element counter list.
  func peekId(counter : List.List<Nat>) : Nat {
    switch (counter.first()) {
      case (?n) n;
      case null 1;
    };
  };

  /// Increment the counter stored in the first element of the list.
  func bumpId(counter : List.List<Nat>) {
    let current = peekId(counter);
    counter.put(0, current + 1);
  };

  // ── Public functions ──────────────────────────────────────────────────────

  /// Create or update a budget for the given user.
  /// If a budget already exists for the same user/month/year/category it is updated in place;
  /// otherwise a new budget record is inserted.
  public func set(
    budgets : List.List<Budget>,
    nextIdCounter : List.List<Nat>,
    userId : Text,
    input : SetBudgetInput,
    now : Int,
  ) : Budget {
    // Try to find an existing budget for the same (user, month, year, category) tuple
    let existingIdx = budgets.findIndex(func(b : Budget) : Bool {
      b.userId == userId and
      b.month == input.month and
      b.year == input.year and
      b.category == input.category
    });

    switch (existingIdx) {
      case (?idx) {
        // Update the existing budget's amount and updatedAt
        let existing = budgets.at(idx);
        let updated : Budget = { existing with amount = input.amount; updatedAt = now };
        budgets.put(idx, updated);
        updated;
      };
      case null {
        // Create a brand-new budget record
        let id = peekId(nextIdCounter);
        let budget : Budget = {
          id;
          userId;
          month = input.month;
          year = input.year;
          amount = input.amount;
          category = input.category;
          createdAt = now;
          updatedAt = now;
        };
        budgets.add(budget);
        bumpId(nextIdCounter);
        budget;
      };
    };
  };

  /// Return all budgets for a user, enriched with actual spending totals derived
  /// from the transaction list for the corresponding month/year and (optionally) category.
  public func getByUser(
    budgets : List.List<Budget>,
    txns : List.List<Transaction>,
    userId : Text,
  ) : [BudgetWithSpending] {
    budgets.filter(func(b : Budget) : Bool { b.userId == userId })
      .map<Budget, BudgetWithSpending>(func(budget : Budget) : BudgetWithSpending {
        // Sum expenses that fall within this budget's month/year (and category if specified)
        var spent : Nat = 0;
        txns.forEach(func(t : Transaction) {
          if (t.userId == userId and t.txType == #expense) {
            // Check month/year match
            let secs = Int.abs(t.date) / 1_000_000_000;
            let days = secs / 86400;
            let (txYear, txMonth) = daysToYearMonth(days);
            if (txYear == budget.year and txMonth == budget.month) {
              // Check category match: null budget = all categories; Some(c) = specific category
              let catMatch = switch (budget.category) {
                case null true; // global monthly budget — count all expenses
                case (?c) t.category == c;
              };
              if (catMatch) { spent += t.amount };
            };
          };
        });
        let remaining : Int = budget.amount.toInt() - spent.toInt();
        { budget; spent; remaining };
      }).toArray();
  };

  /// Delete a budget by ID; traps if not found or unauthorized.
  public func delete(
    budgets : List.List<Budget>,
    userId : Text,
    id : Nat,
  ) : () {
    let idx = switch (budgets.findIndex(func(b : Budget) : Bool { b.id == id })) {
      case (?i) i;
      case null Runtime.trap("Budget not found");
    };
    let existing = budgets.at(idx);
    if (existing.userId != userId) {
      Runtime.trap("Unauthorized: budget belongs to another user");
    };
    let filtered = budgets.filter(func(b : Budget) : Bool { b.id != id });
    budgets.clear();
    budgets.addAll(filtered.values());
  };

  // ── Calendar helpers ──────────────────────────────────────────────────────

  /// Convert days-since-Unix-epoch to (year, month).
  func daysToYearMonth(days : Nat) : (Nat, Nat) {
    let z : Int = days.toInt() + 719468;
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Nat = Int.abs(z - era * 146097);
    let yoe : Nat = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Nat = Int.abs(yoe.toInt() + era * 400);
    let doy : Nat = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Nat = (5 * doy + 2) / 153;
    let month : Nat = if (mp < 10) mp + 3 else mp - 9;
    let year : Nat = if (month <= 2) y + 1 else y;
    (year, month);
  };
};
