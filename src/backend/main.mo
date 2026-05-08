import Common "types/common";
import UserTypes "types/user";
import SpotTypes "types/spots";
import HistoryTypes "types/history";
import UserMixin "mixins/user-api";
import SpotsMixin "mixins/spots-api";
import HistoryMixin "mixins/history-api";
import SpotsLib "lib/spots";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  // --- Stable state ---
  let profiles : Map.Map<Common.UserId, UserTypes.UserProfile> = Map.empty();
  let spots : Map.Map<Text, SpotTypes.SolvedSpot> = Map.empty();
  let histories : Map.Map<Common.UserId, List.List<HistoryTypes.HandHistory>> = Map.empty();
  let historyState = { var nextHistoryId : Nat = 0 };

  // --- Seed sample data on first install ---
  SpotsLib.seedSampleSpots(spots);

  // --- Mixin composition ---
  include UserMixin(profiles);
  include SpotsMixin(spots);
  include HistoryMixin(histories, historyState);
};
