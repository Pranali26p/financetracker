// Composition root for the Personal Finance Manager canister.
// Owns all stable state and delegates every public method to domain mixins.
// No business logic lives here — only state declarations and mixin includes.
import List "mo:core/List";
import Map "mo:core/Map";

import TxLib "lib/transactions";
import BudgetLib "lib/budgets";
import UserLib "lib/users";

import TransactionsMixin "mixins/transactions-api";
import BudgetsMixin "mixins/budgets-api";
import UsersMixin "mixins/users-api";

actor {
  // ── Transactions state ──────────────────────────────────────────────────
  /// All transactions across all users
  let transactions = List.empty<TxLib.Transaction>();
  /// Auto-increment counter for transaction IDs (single-element List for mutable reference)
  let nextTxIdCounter = List.singleton<Nat>(1);

  // ── Budgets state ────────────────────────────────────────────────────────
  /// All budget records across all users
  let budgets = List.empty<BudgetLib.Budget>();
  /// Auto-increment counter for budget IDs (single-element List for mutable reference)
  let nextBudgetIdCounter = List.singleton<Nat>(1);

  // ── Users state ──────────────────────────────────────────────────────────
  /// User profiles indexed by their UserId (Principal text)
  let users = Map.empty<Text, UserLib.User>();

  // ── Mixin composition ────────────────────────────────────────────────────
  include TransactionsMixin(transactions, nextTxIdCounter);
  include BudgetsMixin(budgets, nextBudgetIdCounter, transactions);
  include UsersMixin(users);
};
