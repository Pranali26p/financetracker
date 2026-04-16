// Domain-specific types for transactions and categories.
import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type RecordId = CommonTypes.RecordId;

  /// Transaction type: income adds to balance, expense subtracts
  public type TransactionType = {
    #income;
    #expense;
  };

  /// Predefined spending/earning categories
  public type Category = {
    #food;
    #travel;
    #salary;
    #rent;
    #entertainment;
    #shopping;
    #healthcare;
    #education;
    #others;
  };

  /// Core transaction record stored in the canister
  public type Transaction = {
    id : RecordId;
    userId : UserId;
    txType : TransactionType;
    amount : Nat; // stored in smallest currency unit (e.g. cents)
    category : Category;
    date : Timestamp;
    description : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  /// Input payload for creating a new transaction
  public type CreateTransactionInput = {
    txType : TransactionType;
    amount : Nat;
    category : Category;
    date : Timestamp;
    description : Text;
  };

  /// Input payload for updating an existing transaction
  public type UpdateTransactionInput = {
    id : RecordId;
    txType : TransactionType;
    amount : Nat;
    category : Category;
    date : Timestamp;
    description : Text;
  };

  /// Summary returned by the dashboard query
  public type DashboardSummary = {
    totalBalance : Int;  // income - expenses (can be negative)
    totalIncome : Nat;
    totalExpenses : Nat;
    transactionCount : Nat;
  };
};
