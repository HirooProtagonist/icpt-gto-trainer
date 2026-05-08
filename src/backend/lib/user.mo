import Common "../types/common";
import UserTypes "../types/user";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
  ) : ?UserTypes.UserProfilePublic {
    switch (profiles.get(caller)) {
      case (?profile) ?toPublic(profile);
      case null null;
    };
  };

  public func createOrUpdate(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    settings : UserTypes.UserProfileSettings,
  ) : UserTypes.UserProfilePublic {
    let profile : UserTypes.UserProfile = switch (profiles.get(caller)) {
      case (?existing) {
        existing.settings.language := settings.language;
        existing.settings.animationSpeed := settings.animationSpeed;
        existing.settings.soundEffects := settings.soundEffects;
        existing.settings.showHints := settings.showHints;
        existing.settings.evDisplay := settings.evDisplay;
        existing.settings.evDetailLevel := settings.evDetailLevel;
        existing;
      };
      case null {
        let newProfile : UserTypes.UserProfile = {
          id = caller;
          stats = {
            var sessionsPlayed = 0;
            var accuracy = 0.0;
            var evSaved = 0.0;
          };
          settings = {
            var language = settings.language;
            var animationSpeed = settings.animationSpeed;
            var soundEffects = settings.soundEffects;
            var showHints = settings.showHints;
            var evDisplay = settings.evDisplay;
            var evDetailLevel = settings.evDetailLevel;
          };
          createdAt = Time.now();
        };
        profiles.add(caller, newProfile);
        newProfile;
      };
    };
    toPublic(profile);
  };

  public func updateStats(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    stats : UserTypes.StatsPublic,
  ) : () {
    switch (profiles.get(caller)) {
      case (?profile) {
        profile.stats.sessionsPlayed := stats.sessionsPlayed;
        profile.stats.accuracy := stats.accuracy;
        profile.stats.evSaved := stats.evSaved;
      };
      case null {};
    };
  };

  public func toPublic(profile : UserTypes.UserProfile) : UserTypes.UserProfilePublic {
    {
      id = profile.id;
      stats = {
        sessionsPlayed = profile.stats.sessionsPlayed;
        accuracy = profile.stats.accuracy;
        evSaved = profile.stats.evSaved;
      };
      settings = {
        language = profile.settings.language;
        animationSpeed = profile.settings.animationSpeed;
        soundEffects = profile.settings.soundEffects;
        showHints = profile.settings.showHints;
        evDisplay = profile.settings.evDisplay;
        evDetailLevel = profile.settings.evDetailLevel;
      };
      createdAt = profile.createdAt;
    };
  };
};
