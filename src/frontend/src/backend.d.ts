import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface Card {
    rank: string;
    suit: string;
}
export interface SettingsPublic {
    evDisplay: boolean;
    soundEffects: boolean;
    showHints: boolean;
    evDetailLevel: string;
    language: string;
    animationSpeed: bigint;
}
export interface HandHistory {
    id: string;
    hands: Array<ParsedHand>;
    userId: UserId;
    analysis: Analysis;
}
export interface Analysis {
    pfr: number;
    foldToCbet: number;
    threeBetPct: number;
    vpip: number;
    biggestMistakes: Array<string>;
}
export interface StatsPublic {
    sessionsPlayed: bigint;
    evSaved: number;
    accuracy: number;
}
export interface ParsedHand {
    result: number;
    street: string;
    date: string;
    actions: Array<string>;
    handNumber: string;
}
export interface SolvedSpot {
    id: string;
    filters: SpotFilters;
    street: string;
    description: string;
    evData: EvData;
    board: Array<Card>;
    ranges: RangeMatrix;
    positions: Array<string>;
}
export interface UserProfilePublic {
    id: UserId;
    createdAt: Timestamp;
    stats: StatsPublic;
    settings: SettingsPublic;
}
export type UserId = Principal;
export interface SpotFilters {
    street: string;
    betSizing: string;
    boardTexture: string;
    position: string;
    stackSize: string;
}
export interface UserProfileSettings {
    evDisplay: boolean;
    soundEffects: boolean;
    showHints: boolean;
    evDetailLevel: string;
    language: string;
    animationSpeed: bigint;
}
export type RangeMatrix = Array<ActionFrequency>;
export interface EvData {
    action: string;
    expectedValue: number;
}
export interface ActionFrequency {
    bet: number;
    call: number;
    fold: number;
    check: number;
    raise: number;
}
export interface backendInterface {
    addHandHistory(hands: Array<ParsedHand>): Promise<HandHistory>;
    createOrUpdateUser(settings: UserProfileSettings): Promise<UserProfilePublic>;
    getSpotById(id: string): Promise<SolvedSpot | null>;
    getUserHandHistory(): Promise<Array<HandHistory>>;
    getUserProfile(): Promise<UserProfilePublic | null>;
    listSpots(filters: SpotFilters | null): Promise<Array<SolvedSpot>>;
    searchSpots(searchQuery: string): Promise<Array<SolvedSpot>>;
    seedSampleSpots(): Promise<void>;
    updateUserStats(stats: StatsPublic): Promise<void>;
}
