// Domain-specific types for user management.
// Auth is handled locally on the frontend; the backend tracks minimal user metadata.
import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;

  /// Minimal user record for backend awareness
  public type User = {
    id : UserId;
    username : Text;
    email : Text;
    createdAt : Timestamp;
  };

  /// Input payload for registering or updating a user profile
  public type UpsertUserInput = {
    username : Text;
    email : Text;
  };
};
