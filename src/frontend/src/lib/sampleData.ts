import type { Card, RangeCell, SolvedSpot } from "@/types";

const RANKS = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

function buildDefaultRange(): RangeCell[] {
  const cells: RangeCell[] = [];
  for (const r1 of RANKS) {
    for (const r2 of RANKS) {
      const ri = RANKS.indexOf(r1);
      const rj = RANKS.indexOf(r2);
      const hand =
        ri < rj ? `${r1}${r2}s` : ri > rj ? `${r2}${r1}o` : `${r1}${r2}`;
      const premium = ri <= 3 && rj <= 3;
      const connected = Math.abs(ri - rj) <= 2;
      const betFreq = premium ? 0.8 : connected ? 0.4 : Math.random() * 0.3;
      const callFreq = premium ? 0.1 : connected ? 0.35 : Math.random() * 0.25;
      const foldFreq = Math.max(0, 1 - betFreq - callFreq);
      cells.push({
        hand,
        betFreq,
        callFreq,
        foldFreq,
        ev: premium ? 2.4 : connected ? 0.8 : -0.2,
      });
    }
  }
  return cells;
}

export const SAMPLE_SPOTS: SolvedSpot[] = [
  {
    id: "btn-bb-flop-ask7",
    heroPosition: "BTN",
    villainPosition: "BB",
    street: "flop",
    board: [
      { rank: "A", suit: "s" },
      { rank: "K", suit: "h" },
      { rank: "7", suit: "d" },
    ] as Card[],
    potBb: 6.5,
    stackBb: 96,
    action: "BTN open → BB call",
    range: buildDefaultRange(),
    description: "BTN c-bet spot on AK7r. BTN has significant range advantage.",
  },
  {
    id: "co-btn-3bet-jt9",
    heroPosition: "CO",
    villainPosition: "BTN",
    street: "flop",
    board: [
      { rank: "J", suit: "c" },
      { rank: "T", suit: "d" },
      { rank: "9", suit: "h" },
    ] as Card[],
    potBb: 19,
    stackBb: 85,
    action: "CO open → BTN 3bet → CO call",
    range: buildDefaultRange(),
    description:
      "CO facing BTN 3bet on wet JT9 board. High connectivity favors BTN.",
  },
  {
    id: "sb-bb-flop-227",
    heroPosition: "SB",
    villainPosition: "BB",
    street: "flop",
    board: [
      { rank: "2", suit: "s" },
      { rank: "2", suit: "h" },
      { rank: "7", suit: "d" },
    ] as Card[],
    potBb: 4,
    stackBb: 98,
    action: "SB complete → BB check",
    range: buildDefaultRange(),
    description:
      "SB vs BB limped pot, dry paired board. Mixed strategy required.",
  },
  {
    id: "btn-open-preflop",
    heroPosition: "BTN",
    villainPosition: "BB",
    street: "preflop",
    board: [],
    potBb: 1.5,
    stackBb: 100,
    action: "BTN open RFI",
    range: buildDefaultRange(),
    description:
      "BTN opening range, 100bb deep. Wide value + playability range.",
  },
  {
    id: "bb-defend-btn-3bet",
    heroPosition: "BB",
    villainPosition: "BTN",
    street: "preflop",
    board: [],
    potBb: 6,
    stackBb: 97,
    action: "BTN open → BB 3bet decision",
    range: buildDefaultRange(),
    description: "BB 3bet/call/fold vs BTN open. Balanced range construction.",
  },
  {
    id: "turn-barrel-k94-2",
    heroPosition: "CO",
    villainPosition: "BB",
    street: "turn",
    board: [
      { rank: "K", suit: "d" },
      { rank: "9", suit: "h" },
      { rank: "4", suit: "c" },
      { rank: "2", suit: "s" },
    ] as Card[],
    potBb: 14,
    stackBb: 82,
    action: "CO bet flop → BB call → turn",
    range: buildDefaultRange(),
    description: "Turn barrel on K942r. Blank turn, CO decides frequency.",
  },
  {
    id: "river-value-bluff-a86-3-t",
    heroPosition: "BTN",
    villainPosition: "BB",
    street: "river",
    board: [
      { rank: "A", suit: "h" },
      { rank: "8", suit: "d" },
      { rank: "6", suit: "c" },
      { rank: "3", suit: "s" },
      { rank: "T", suit: "h" },
    ] as Card[],
    potBb: 32,
    stackBb: 64,
    action: "BTN 3 streets aggression",
    range: buildDefaultRange(),
    description:
      "River value/bluff balance on A8633T. Polarised betting strategy.",
  },
  {
    id: "utg-open-preflop",
    heroPosition: "UTG",
    villainPosition: "BB",
    street: "preflop",
    board: [],
    potBb: 2,
    stackBb: 100,
    action: "UTG open RFI",
    range: buildDefaultRange(),
    description:
      "UTG tight opening range. Premium hands only with high frequency.",
  },
  {
    id: "co-open-preflop",
    heroPosition: "CO",
    villainPosition: "BTN",
    street: "preflop",
    board: [],
    potBb: 2,
    stackBb: 100,
    action: "CO open RFI",
    range: buildDefaultRange(),
    description:
      "CO opening range vs BTN. Wider than UTG, balanced with blockers.",
  },
  {
    id: "btn-3bet-vs-co",
    heroPosition: "BTN",
    villainPosition: "CO",
    street: "preflop",
    board: [],
    potBb: 5,
    stackBb: 98,
    action: "CO open → BTN 3bet",
    range: buildDefaultRange(),
    description: "BTN 3bet range vs CO. Value + bluffs with best blockers.",
  },
  {
    id: "flop-kk3-rainbow",
    heroPosition: "BTN",
    villainPosition: "BB",
    street: "flop",
    board: [
      { rank: "K", suit: "h" },
      { rank: "K", suit: "c" },
      { rank: "3", suit: "d" },
    ] as Card[],
    potBb: 7,
    stackBb: 93,
    action: "BTN open → BB call",
    range: buildDefaultRange(),
    description: "Paired board KK3r. BTN overwhelmingly ahead, careful sizing.",
  },
  {
    id: "flop-876-2tone",
    heroPosition: "SB",
    villainPosition: "BB",
    street: "flop",
    board: [
      { rank: "8", suit: "c" },
      { rank: "7", suit: "c" },
      { rank: "6", suit: "d" },
    ] as Card[],
    potBb: 5,
    stackBb: 97,
    action: "SB open → BB call",
    range: buildDefaultRange(),
    description:
      "Very wet connected board 876. Many draws, GTO check at high frequency.",
  },
  {
    id: "turn-check-raise-a43-q",
    heroPosition: "BB",
    villainPosition: "BTN",
    street: "turn",
    board: [
      { rank: "A", suit: "d" },
      { rank: "4", suit: "h" },
      { rank: "3", suit: "s" },
      { rank: "Q", suit: "d" },
    ] as Card[],
    potBb: 18,
    stackBb: 79,
    action: "SRP flop check → BTN bet → BB decision",
    range: buildDefaultRange(),
    description:
      "BB facing turn bet on A43Q. Check-raise or call with strong holdings.",
  },
  {
    id: "river-bluff-catch-k95-2-j",
    heroPosition: "BB",
    villainPosition: "CO",
    street: "river",
    board: [
      { rank: "K", suit: "s" },
      { rank: "9", suit: "h" },
      { rank: "5", suit: "d" },
      { rank: "2", suit: "c" },
      { rank: "J", suit: "s" },
    ] as Card[],
    potBb: 28,
    stackBb: 68,
    action: "3bet pot, river facing bet",
    range: buildDefaultRange(),
    description:
      "BB facing river overbet in 3bet pot. Bluff-catch decision with Kx.",
  },
  {
    id: "flop-aa2-rainbow",
    heroPosition: "CO",
    villainPosition: "BB",
    street: "flop",
    board: [
      { rank: "A", suit: "h" },
      { rank: "A", suit: "c" },
      { rank: "2", suit: "s" },
    ] as Card[],
    potBb: 8,
    stackBb: 92,
    action: "CO open → BB call",
    range: buildDefaultRange(),
    description:
      "AA2r triple-paired board. Rare texture — most hands miss, slow play aces.",
  },
];

export const HERO_HANDS: [Card, Card][] = [
  [
    { rank: "A", suit: "h" },
    { rank: "K", suit: "d" },
  ],
  [
    { rank: "Q", suit: "s" },
    { rank: "Q", suit: "h" },
  ],
  [
    { rank: "J", suit: "c" },
    { rank: "T", suit: "c" },
  ],
  [
    { rank: "K", suit: "h" },
    { rank: "Q", suit: "d" },
  ],
  [
    { rank: "9", suit: "s" },
    { rank: "9", suit: "h" },
  ],
  [
    { rank: "A", suit: "c" },
    { rank: "7", suit: "c" },
  ],
  [
    { rank: "6", suit: "d" },
    { rank: "5", suit: "d" },
  ],
  [
    { rank: "T", suit: "s" },
    { rank: "J", suit: "h" },
  ],
  [
    { rank: "8", suit: "s" },
    { rank: "8", suit: "c" },
  ],
  [
    { rank: "A", suit: "d" },
    { rank: "5", suit: "s" },
  ],
];

export const GTO_EXPLANATIONS: Record<string, string> = {
  fold: "Данная рука слишком слабая для продолжения на этой текстуре. Фолд — оптимальное решение.",
  check: "Чек сохраняет диапазон сбалансированным. Ставка здесь даёт мало EV.",
  call: "Колл защищает диапазон и сохраняет потенциальные руки. Рейз увеличил бы дисперсию.",
  raise:
    "Рейз максимизирует EV с данной рукой. Выгодное соотношение ставки к банку.",
  allin: "All-in оптимален на ривере для максимизации EV с нат-руками.",
};

// Alias for backward compatibility
export const sampleSpots = SAMPLE_SPOTS;
export interface HandHistoryRow {
  handNumber: string;
  date: string;
  result: number;
  actions: string[];
  street: string;
}

export const SAMPLE_HANDS: HandHistoryRow[] = [
  {
    handNumber: "#123456789",
    date: "2026-04-21",
    result: 12.5,
    street: "River",
    actions: [
      "Preflop: BTN raises to 2.5bb, BB calls",
      "Flop (5.5bb): Kh 7d 2c \u2014 BB checks, BTN bets 3bb, BB calls",
      "Turn (11.5bb): 9s \u2014 BB checks, BTN bets 8bb, BB calls",
      "River (27.5bb): As \u2014 BB checks, BTN bets 18bb, BB folds",
    ],
  },
  {
    handNumber: "#123456790",
    date: "2026-04-21",
    result: -6.0,
    street: "Flop",
    actions: [
      "Preflop: CO raises to 2.5bb, BTN 3bets to 8bb, CO calls",
      "Flop (17bb): Jc Td 9h \u2014 CO checks, BTN bets 9bb, CO raises to 26bb, BTN folds",
    ],
  },
  {
    handNumber: "#123456791",
    date: "2026-04-22",
    result: 3.0,
    street: "Flop",
    actions: [
      "Preflop: SB raises to 2.5bb, BB calls",
      "Flop (5.5bb): 2s 2h 7d \u2014 SB bets 2bb, BB calls",
      "Turn (9.5bb): Qh \u2014 SB checks, BB checks",
      "River (9.5bb): 5c \u2014 SB bets 6bb, BB folds",
    ],
  },
  {
    handNumber: "#123456792",
    date: "2026-04-22",
    result: -18.5,
    street: "River",
    actions: [
      "Preflop: UTG raises to 2.5bb, BTN calls, BB calls",
      "Flop (8bb): Ah Kd 3c \u2014 BB checks, UTG bets 5bb, BTN raises to 15bb, BB folds, UTG calls",
      "Turn (38bb): 7s \u2014 UTG checks, BTN bets 22bb, UTG calls",
      "River (82bb): 2d \u2014 UTG checks, BTN bets 50bb, UTG calls, BTN shows KK",
    ],
  },
];

export const SAMPLE_STATS = {
  vpip: 28,
  pfr: 21,
  threeBetPct: 8,
  foldToCbet: 52,
  biggestMistakes: [
    "\u0427\u0440\u0435\u0437\u043c\u0435\u0440\u043d\u044b\u0439 \u043a\u043e\u043b\u043b \u043d\u0430 \u0440\u0438\u0432\u0435\u0440\u0435 \u0441 \u0431\u043b\u043e\u043a\u0435\u0440\u0430\u043c\u0438 (EV: -4.2bb)",
    "\u041d\u0435\u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0440\u0435\u0439\u0437\u0430 \u043d\u0430 \u0444\u043b\u043e\u043f\u0435 (EV: -1.8bb)",
    "\u041f\u0440\u043e\u043f\u0443\u0449\u0435\u043d\u043d\u0430\u044f \u0441\u0442\u0430\u0432\u043a\u0430 \u0446\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u043d\u0430 \u0442\u0451\u0440\u043d\u0435 (EV: -2.1bb)",
  ],
};
