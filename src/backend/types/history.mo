import Common "common";

module {
  public type ParsedHand = {
    handNumber : Text;
    date : Text;
    result : Float;
    actions : [Text];
    street : Text;
  };

  public type Analysis = {
    vpip : Float;
    pfr : Float;
    threeBetPct : Float;
    foldToCbet : Float;
    biggestMistakes : [Text];
  };

  public type HandHistory = {
    id : Text;
    userId : Common.UserId;
    hands : [ParsedHand];
    analysis : Analysis;
  };
};
