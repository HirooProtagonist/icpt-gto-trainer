import SpotTypes "../types/spots";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

module {
  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  // Build a realistic 169-entry RangeMatrix.
  // The distribution varies slightly per index to create natural-looking ranges.
  func makeRange(baseBet : Float, baseCall : Float, _baseCheck : Float, baseFold : Float) : SpotTypes.RangeMatrix {
    Array.tabulate<SpotTypes.ActionFrequency>(
      169,
      func(i) {
        // Create small variations based on hand position in the matrix
        let row = i / 13; // 0-12
        let col = i % 13; // 0-12
        let isPaired = row == col;
        let isSuited = row < col;
        let handStrength : Float = (13.0 - row.toFloat()) * (13.0 - col.toFloat()) / 169.0;

        let betAdj = if (isPaired) { 0.1 } else if (isSuited) { 0.05 } else { 0.0 };
        let foldAdj = if (isPaired) { -0.08 } else if (not isSuited) { 0.05 } else { 0.0 };
        let strengthAdj = handStrength * 0.2 - 0.1;

        let bet   = clamp(baseBet   + betAdj + strengthAdj * 0.5);
        let call  = clamp(baseCall  - strengthAdj * 0.3);
        let fold  = clamp(baseFold  + foldAdj - strengthAdj * 0.3);
        let check = clamp(1.0 - bet - call - fold);
        let raise = 0.0;
        { bet; call; fold; check; raise };
      },
    );
  };

  func clamp(v : Float) : Float {
    if (v < 0.0) 0.0 else if (v > 1.0) 1.0 else v;
  };

  func card(rank : Text, suit : Text) : SpotTypes.Card { { rank; suit } };

  func spot(
    id : Text,
    positions : [Text],
    street : Text,
    board : [SpotTypes.Card],
    ev : Float,
    action : Text,
    description : Text,
    heroPos : Text,
    boardTexture : Text,
    betSizing : Text,
    baseBet : Float,
    baseCall : Float,
    baseCheck : Float,
    baseFold : Float,
  ) : SpotTypes.SolvedSpot {
    {
      id;
      positions;
      street;
      board;
      ranges = makeRange(baseBet, baseCall, baseCheck, baseFold);
      evData = { expectedValue = ev; action };
      filters = {
        position = heroPos;
        street;
        stackSize = "100bb";
        boardTexture;
        betSizing;
      };
      description;
    };
  };

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  public func getSpotById(
    spots : Map.Map<Text, SpotTypes.SolvedSpot>,
    id : Text,
  ) : ?SpotTypes.SolvedSpot {
    spots.get(id);
  };

  public func listSpots(
    spots : Map.Map<Text, SpotTypes.SolvedSpot>,
    filters : ?SpotTypes.SpotFilters,
  ) : [SpotTypes.SolvedSpot] {
    switch (filters) {
      case null {
        spots.values().toArray();
      };
      case (?f) {
        spots.values().filter(func(s : SpotTypes.SolvedSpot) : Bool {
            let posMatch  = f.position == "" or s.filters.position == f.position;
            let strMatch  = f.street    == "" or s.filters.street    == f.street;
            let stkMatch  = f.stackSize == "" or s.filters.stackSize  == f.stackSize;
            let texMatch  = f.boardTexture == "" or s.filters.boardTexture == f.boardTexture;
            let betMatch  = f.betSizing == "" or s.filters.betSizing  == f.betSizing;
            posMatch and strMatch and stkMatch and texMatch and betMatch;
          }).toArray();
      };
    };
  };

  public func searchSpots(
    spots : Map.Map<Text, SpotTypes.SolvedSpot>,
    searchQuery : Text,
  ) : [SpotTypes.SolvedSpot] {
    if (searchQuery == "") {
      return spots.values().toArray();
    };
    let q = searchQuery.toLower();
    spots.values().filter(func(s : SpotTypes.SolvedSpot) : Bool {
      let descMatch = s.description.toLower().contains(#text q);
      let posMatch  = s.positions.any(func(p : Text) : Bool {
        p.toLower().contains(#text q)
      });
      descMatch or posMatch;
    }).toArray();
  };

  public func seedSampleSpots(
    spots : Map.Map<Text, SpotTypes.SolvedSpot>,
  ) : () {
    if (not spots.isEmpty()) return;

    // ---- PREFLOP (5 spots) ----
    spots.add(
      "pf_btn_open",
      spot(
        "pf_btn_open", ["BTN"], "Preflop", [],
        0.45, "Raise 2.5bb",
        "BTN open raise — standard 2.5bb open",
        "BTN", "none", "2.5bb",
        0.72, 0.0, 0.10, 0.18,
      ),
    );
    spots.add(
      "pf_co_open",
      spot(
        "pf_co_open", ["CO"], "Preflop", [],
        0.38, "Raise 2.5bb",
        "CO open raise — standard 2.5bb open",
        "CO", "none", "2.5bb",
        0.65, 0.0, 0.12, 0.23,
      ),
    );
    spots.add(
      "pf_sb_vs_bb",
      spot(
        "pf_sb_vs_bb", ["SB", "BB"], "Preflop", [],
        0.22, "Raise 3bb",
        "SB vs BB single raised pot — SB 3bb open",
        "SB", "none", "3bb",
        0.60, 0.05, 0.15, 0.20,
      ),
    );
    spots.add(
      "pf_btn_3bet_co",
      spot(
        "pf_btn_3bet_co", ["BTN", "CO"], "Preflop", [],
        0.67, "3-bet 9bb",
        "BTN 3-bet vs CO open — polarized 3-bet range",
        "BTN", "none", "9bb",
        0.68, 0.0, 0.08, 0.24,
      ),
    );
    spots.add(
      "pf_bb_def_btn",
      spot(
        "pf_bb_def_btn", ["BB", "BTN"], "Preflop", [],
        -0.12, "Call",
        "BB defense vs BTN open — BB calling range",
        "BB", "none", "2.5bb",
        0.10, 0.55, 0.0, 0.35,
      ),
    );

    // ---- FLOP (6 spots) ----
    spots.add(
      "fl_btn_bb_akr",
      spot(
        "fl_btn_bb_akr", ["BTN", "BB"], "Flop",
        [card("A", "s"), card("K", "h"), card("7", "d")],
        0.31, "Bet 33%",
        "BTN vs BB — dry A-K-7 rainbow flop",
        "BTN", "dry", "33%",
        0.55, 0.15, 0.20, 0.10,
      ),
    );
    spots.add(
      "fl_co_btn_jt9",
      spot(
        "fl_co_btn_jt9", ["CO", "BTN"], "Flop",
        [card("J", "c"), card("T", "d"), card("9", "h")],
        0.28, "Bet 50%",
        "CO open BTN 3-bet — wet J-T-9 two-tone flop",
        "CO", "wet", "50%",
        0.40, 0.25, 0.25, 0.10,
      ),
    );
    spots.add(
      "fl_sb_bb_227",
      spot(
        "fl_sb_bb_227", ["SB", "BB"], "Flop",
        [card("2", "s"), card("2", "h"), card("7", "d")],
        0.18, "Check",
        "SB vs BB — paired 2-2-7 rainbow flop",
        "SB", "paired", "0%",
        0.25, 0.20, 0.40, 0.15,
      ),
    );
    spots.add(
      "fl_btn_bb_k42",
      spot(
        "fl_btn_bb_k42", ["BTN", "BB"], "Flop",
        [card("K", "d"), card("4", "h"), card("2", "c")],
        0.35, "Bet 33%",
        "BTN vs BB — dry K-4-2 rainbow flop",
        "BTN", "dry", "33%",
        0.58, 0.12, 0.20, 0.10,
      ),
    );
    spots.add(
      "fl_co_btn_876cc",
      spot(
        "fl_co_btn_876cc", ["CO", "BTN"], "Flop",
        [card("8", "c"), card("7", "c"), card("6", "h")],
        0.19, "Bet 50%",
        "CO vs BTN — monotone/wet 8-7-6 two-club flop",
        "CO", "wet", "50%",
        0.38, 0.28, 0.22, 0.12,
      ),
    );
    spots.add(
      "fl_btn_bb_aa2",
      spot(
        "fl_btn_bb_aa2", ["BTN", "BB"], "Flop",
        [card("A", "h"), card("A", "h"), card("2", "s")],
        0.42, "Bet 33%",
        "BTN vs BB — trips A-A-2 rainbow flop",
        "BTN", "paired", "33%",
        0.45, 0.22, 0.25, 0.08,
      ),
    );

    // ---- TURN (2 spots) ----
    spots.add(
      "tn_btn_bb_ask72",
      spot(
        "tn_btn_bb_ask72", ["BTN", "BB"], "Turn",
        [card("A", "s"), card("K", "h"), card("7", "d"), card("2", "c")],
        0.28, "Bet 75%",
        "BTN vs BB — barrel spot A-K-7-2 turn",
        "BTN", "dry", "75%",
        0.48, 0.20, 0.18, 0.14,
      ),
    );
    spots.add(
      "tn_sb_bb_jt98",
      spot(
        "tn_sb_bb_jt98", ["SB", "BB"], "Turn",
        [card("J", "c"), card("T", "d"), card("9", "h"), card("8", "d")],
        0.15, "Check-Raise",
        "SB vs BB — check-raise spot J-T-9-8 runout",
        "SB", "wet", "75%",
        0.32, 0.30, 0.22, 0.16,
      ),
    );

    // ---- RIVER (2 spots) ----
    spots.add(
      "rv_btn_bb_ask725",
      spot(
        "rv_btn_bb_ask725", ["BTN", "BB"], "River",
        [card("A", "s"), card("K", "h"), card("7", "d"), card("2", "c"), card("5", "h")],
        0.45, "Bet 75%",
        "BTN vs BB — value/bluff balance A-K-7-2-5 river",
        "BTN", "dry", "75%",
        0.50, 0.18, 0.12, 0.20,
      ),
    );
    spots.add(
      "rv_co_btn_k42j9",
      spot(
        "rv_co_btn_k42j9", ["CO", "BTN"], "River",
        [card("K", "d"), card("4", "h"), card("2", "c"), card("J", "h"), card("9", "s")],
        0.22, "Check-Raise",
        "CO vs BTN — river check-raise K-4-2-J-9 runout",
        "CO", "dry", "75%",
        0.28, 0.32, 0.20, 0.20,
      ),
    );
  };
};
