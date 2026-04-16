// Cross-cutting types shared across all domains of the Personal Finance Manager.
module {
  /// Unique identifier for users (derived from their Internet Identity principal text)
  public type UserId = Text;

  /// Unix-style timestamp in nanoseconds (as returned by Time.now())
  public type Timestamp = Int;

  /// Auto-incremented numeric ID for transactions and budgets
  public type RecordId = Nat;
};
