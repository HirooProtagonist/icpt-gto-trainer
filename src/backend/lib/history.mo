import Common "../types/common";
import HistoryTypes "../types/history";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public func addHandHistory(
    histories : Map.Map<Common.UserId, List.List<HistoryTypes.HandHistory>>,
    state : { var nextHistoryId : Nat },
    caller : Common.UserId,
    hands : [HistoryTypes.ParsedHand],
  ) : HistoryTypes.HandHistory {
    let id = state.nextHistoryId.toText();
    state.nextHistoryId += 1;
    let analysis : HistoryTypes.Analysis = {
      vpip = 0.0;
      pfr = 0.0;
      threeBetPct = 0.0;
      foldToCbet = 0.0;
      biggestMistakes = [];
    };
    let entry : HistoryTypes.HandHistory = { id; userId = caller; hands; analysis };
    switch (histories.get(caller)) {
      case (?userList) userList.add(entry);
      case null {
        let newList = List.empty<HistoryTypes.HandHistory>();
        newList.add(entry);
        histories.add(caller, newList);
      };
    };
    entry;
  };

  public func getUserHandHistory(
    histories : Map.Map<Common.UserId, List.List<HistoryTypes.HandHistory>>,
    caller : Common.UserId,
  ) : [HistoryTypes.HandHistory] {
    switch (histories.get(caller)) {
      case (?userList) userList.toArray();
      case null [];
    };
  };
};
