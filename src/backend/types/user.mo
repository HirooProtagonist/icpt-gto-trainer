import Common "common";

module {
  public type Stats = {
    var sessionsPlayed : Nat;
    var accuracy : Float;
    var evSaved : Float;
  };

  public type Settings = {
    var language : Text;
    var animationSpeed : Nat;
    var soundEffects : Bool;
    var showHints : Bool;
    var evDisplay : Bool;
    var evDetailLevel : Text;
  };

  public type UserProfile = {
    id : Common.UserId;
    stats : Stats;
    settings : Settings;
    createdAt : Common.Timestamp;
  };

  // Shared (immutable) version for public API boundary
  public type StatsPublic = {
    sessionsPlayed : Nat;
    accuracy : Float;
    evSaved : Float;
  };

  public type SettingsPublic = {
    language : Text;
    animationSpeed : Nat;
    soundEffects : Bool;
    showHints : Bool;
    evDisplay : Bool;
    evDetailLevel : Text;
  };

  public type UserProfilePublic = {
    id : Common.UserId;
    stats : StatsPublic;
    settings : SettingsPublic;
    createdAt : Common.Timestamp;
  };

  public type UserProfileSettings = SettingsPublic;
};
