import Common "../types/common";
import HistoryTypes "../types/history";
import HistoryLib "../lib/history";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  histories : Map.Map<Common.UserId, List.List<HistoryTypes.HandHistory>>,
  historyState : { var nextHistoryId : Nat },
) {
  public shared ({ caller }) func addHandHistory(
    hands : [HistoryTypes.ParsedHand]
  ) : async HistoryTypes.HandHistory {
    HistoryLib.addHandHistory(histories, historyState, caller, hands);
  };

  public shared query ({ caller }) func getUserHandHistory() : async [HistoryTypes.HandHistory] {
    HistoryLib.getUserHandHistory(histories, caller);
  };
};
