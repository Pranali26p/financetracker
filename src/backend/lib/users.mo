// Domain logic for user profile management.
// All functions are stateless — they operate on the provided state slices.
import Map "mo:core/Map";
import UserTypes "../types/users";

module {
  public type User = UserTypes.User;
  public type UpsertUserInput = UserTypes.UpsertUserInput;

  /// Register or update a user profile.
  /// If a profile already exists for the userId it is updated (username + email);
  /// the original `createdAt` timestamp is preserved on update.
  public func upsert(
    users : Map.Map<Text, User>,
    userId : Text,
    input : UpsertUserInput,
    now : Int,
  ) : User {
    let user : User = switch (users.get(userId)) {
      case (?existing) {
        // Preserve createdAt on update; only username and email change
        { existing with username = input.username; email = input.email };
      };
      case null {
        // New registration — set createdAt to now
        { id = userId; username = input.username; email = input.email; createdAt = now };
      };
    };
    users.add(userId, user);
    user;
  };

  /// Return the user profile for the given ID, or null if not registered.
  public func get(
    users : Map.Map<Text, User>,
    userId : Text,
  ) : ?User {
    users.get(userId);
  };
};
