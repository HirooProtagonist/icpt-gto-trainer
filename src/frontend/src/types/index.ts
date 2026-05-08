export type Suit = "h" | "d" | "c" | "s";
export type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export type SelectedCard = Card;

export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Position = "UTG" | "MP" | "CO" | "BTN" | "SB" | "BB";
export type Street = "preflop" | "flop" | "turn" | "river";
export type Action = "fold" | "check" | "call" | "raise" | "allin";

export interface RangeCell {
  hand: string;
  betFreq: number;
  callFreq: number;
  foldFreq: number;
  ev: number;
}

export interface SolvedSpot {
  id: string;
  heroPosition: Position;
  villainPosition: Position;
  street: Street;
  board: Card[];
  potBb: number;
  stackBb: number;
  action: string;
  range: RangeCell[];
  description: string;
}

export interface TrainerHand {
  spot: SolvedSpot;
  heroHand: [Card, Card];
  userAction: Action | null;
  gtoAction: Action;
  gtoFreqs: { action: string; freq: number }[];
  evDelta: number;
  explanation: string;
}

export interface SessionResult {
  hands: TrainerHand[];
  accuracy: number;
  totalEvLost: number;
  biggestMistakes: { hand: string; mistake: string; ev: number }[];
}

export type TrainingMode =
  | "single"
  | "random"
  | "session5"
  | "session10"
  | "session20";

export interface HandRow {
  handNumber: string;
  date: string;
  result: number;
  actions: string[];
  street: string;
}

export interface SolveResult {
  spotTitle: string;
  recommendation: string;
  actions: { label: string; pct: number; color: string }[];
}

export type PrevAction =
  | "Open"
  | "3bet"
  | "4bet"
  | "Limp"
  | "Check"
  | "Bet"
  | "Raise";

export type Language = "ru" | "en";

export type RangeMatrix = RangeCell[];

export interface SpotFilters {
  position: string;
  stackSize: string;
  street: string;
  boardTexture: string;
  betSizing: string;
}

export interface AppSettings {
  language: Language;
  animSpeed: 1 | 2 | 3;
  soundEnabled: boolean;
  showHints: boolean;
  showEv: boolean;
  evDetail: "low" | "high";
}
