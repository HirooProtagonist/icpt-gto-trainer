module {
  public type Card = {
    rank : Text;
    suit : Text;
  };

  public type ActionFrequency = {
    bet : Float;
    call : Float;
    fold : Float;
    check : Float;
    raise : Float;
  };

  // 169 entries (one per hand combo)
  public type RangeMatrix = [ActionFrequency];

  public type EvData = {
    expectedValue : Float;
    action : Text;
  };

  public type SpotFilters = {
    position : Text;
    street : Text;
    stackSize : Text;
    boardTexture : Text;
    betSizing : Text;
  };

  public type SolvedSpot = {
    id : Text;
    positions : [Text];
    street : Text;
    board : [Card];
    ranges : RangeMatrix;
    evData : EvData;
    filters : SpotFilters;
    description : Text;
  };
};
