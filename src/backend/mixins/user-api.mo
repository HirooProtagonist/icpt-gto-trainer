import Common "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";
import Map "mo:core/Map";

mixin (profiles : Map.Map<Common.UserId, UserTypes.UserProfile>) {
  public shared query ({ caller }) func getUserProfile() : async ?UserTypes.UserProfilePublic {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func createOrUpdateUser(
    settings : UserTypes.UserProfileSettings
  ) : async UserTypes.UserProfilePublic {
    UserLib.createOrUpdate(profiles, caller, settings);
  };

  public shared ({ caller }) func updateUserStats(
    stats : UserTypes.StatsPublic
  ) : async () {
    UserLib.updateStats(profiles, caller, stats);
  };
};
