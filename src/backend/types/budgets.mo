// Domain-specific types for budget management.
import CommonTypes "common";
import TxTypes "transactions";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type RecordId = CommonTypes.RecordId;
  public type Category = TxTypes.Category;

  /// A monthly budget entry — can be a global monthly cap or per-category limit
  public type Budget = {
    id : RecordId;
    userId : UserId;
    month : Nat;  // 1–12
    year : Nat;   // e.g. 2025
    amount : Nat; // budget ceiling in smallest currency unit
    category : ?Category; // null = overall monthly budget; Some(c) = per-category budget
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  /// Input payload for creating or updating a budget
  public type SetBudgetInput = {
    month : Nat;
    year : Nat;
    amount : Nat;
    category : ?Category;
  };

  /// Remaining budget info returned alongside a budget record
  public type BudgetWithSpending = {
    budget : Budget;
    spent : Nat;
    remaining : Int; // budget.amount - spent (can be negative when overspent)
  };
};
