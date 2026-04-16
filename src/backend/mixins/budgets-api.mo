// Public API surface for the budgets domain.
// State slices are injected via mixin parameters.
// `nextBudgetIdCounter` is a single-element List<Nat> used as a mutable ID counter.
import List "mo:core/List";
import Time "mo:core/Time";
import BudgetTypes "../types/budgets";
import BudgetLib "../lib/budgets";
import TxLib "../lib/transactions";

mixin (
  budgets : List.List<BudgetLib.Budget>,
  nextBudgetIdCounter : List.List<Nat>,
  transactions : List.List<TxLib.Transaction>,
) {
  /// Create or update a monthly budget for the calling user.
  public shared ({ caller }) func setBudget(
    input : BudgetTypes.SetBudgetInput
  ) : async BudgetTypes.Budget {
    BudgetLib.set(budgets, nextBudgetIdCounter, caller.toText(), input, Time.now());
  };

  /// Return all budgets for the calling user, enriched with spending totals.
  public shared query ({ caller }) func getBudgets() : async [BudgetTypes.BudgetWithSpending] {
    BudgetLib.getByUser(budgets, transactions, caller.toText());
  };

  /// Delete a budget by ID; only the owner can delete their budget.
  public shared ({ caller }) func deleteBudget(id : Nat) : async () {
    BudgetLib.delete(budgets, caller.toText(), id);
  };
};
