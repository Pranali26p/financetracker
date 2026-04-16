// Public API surface for the users domain.
// State slices are injected via mixin parameters.
import Map "mo:core/Map";
import Time "mo:core/Time";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
  users : Map.Map<Text, UserLib.User>,
) {
  /// Register or update the calling user's profile; idempotent upsert.
  public shared ({ caller }) func upsertUser(
    input : UserTypes.UpsertUserInput
  ) : async UserTypes.User {
    UserLib.upsert(users, caller.toText(), input, Time.now());
  };

  /// Return the calling user's profile, or null if not yet registered.
  public shared query ({ caller }) func getUser() : async ?UserTypes.User {
    UserLib.get(users, caller.toText());
  };
};
