// Public API surface for the transactions domain.
// State slices are injected via mixin parameters.
// `nextTxIdCounter` is a single-element List<Nat> used as a mutable ID counter.
import List "mo:core/List";
import Time "mo:core/Time";
import TxTypes "../types/transactions";
import TxLib "../lib/transactions";

mixin (
  transactions : List.List<TxLib.Transaction>,
  nextTxIdCounter : List.List<Nat>,
) {
  /// Create a new transaction for the calling user.
  public shared ({ caller }) func createTransaction(
    input : TxTypes.CreateTransactionInput
  ) : async TxTypes.Transaction {
    let userId = caller.toText();
    TxLib.create(transactions, nextTxIdCounter, userId, input, Time.now());
  };

  /// Return all transactions for the calling user, sorted by date descending.
  public shared query ({ caller }) func getTransactions() : async [TxTypes.Transaction] {
    TxLib.getByUser(transactions, caller.toText());
  };

  /// Update an existing transaction owned by the calling user.
  public shared ({ caller }) func updateTransaction(
    input : TxTypes.UpdateTransactionInput
  ) : async TxTypes.Transaction {
    TxLib.update(transactions, caller.toText(), input, Time.now());
  };

  /// Delete a transaction by ID; only the owner can delete their transaction.
  public shared ({ caller }) func deleteTransaction(id : Nat) : async () {
    TxLib.delete(transactions, caller.toText(), id);
  };

  /// Return transactions for the calling user filtered by month and year.
  public shared query ({ caller }) func getTransactionsByMonth(
    month : Nat,
    year : Nat,
  ) : async [TxTypes.Transaction] {
    TxLib.getByMonth(transactions, caller.toText(), month, year);
  };

  /// Return transactions for the calling user filtered by category.
  public shared query ({ caller }) func getTransactionsByCategory(
    category : TxTypes.Category
  ) : async [TxTypes.Transaction] {
    TxLib.getByCategory(transactions, caller.toText(), category);
  };

  /// Return a dashboard summary (total balance, income, expenses) for the calling user.
  public shared query ({ caller }) func getDashboardSummary() : async TxTypes.DashboardSummary {
    TxLib.dashboardSummary(transactions, caller.toText());
  };
};
