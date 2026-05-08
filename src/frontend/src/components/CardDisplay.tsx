import type { Card as BackendCard } from "@/backend";
import { cn } from "@/lib/utils";

// Suit config — uses short suit codes (h/d/c/s) from backend + local Card types
const SUIT_CONFIG: Record<
  string,
  { symbol: string; bgClass: string; label: string }
> = {
  h: { symbol: "♥", bgClass: "bg-red-600", label: "Hearts" },
  d: { symbol: "♦", bgClass: "bg-blue-600", label: "Diamonds" },
  c: { symbol: "♣", bgClass: "bg-emerald-600", label: "Clubs" },
  s: { symbol: "♠", bgClass: "bg-[#111111]", label: "Spades" },
  // Long-form keys for Solver's SelectedCard type
  hearts: { symbol: "♥", bgClass: "bg-red-600", label: "Hearts" },
  diamonds: { symbol: "♦", bgClass: "bg-blue-600", label: "Diamonds" },
  clubs: { symbol: "♣", bgClass: "bg-emerald-600", label: "Clubs" },
  spades: { symbol: "♠", bgClass: "bg-[#111111]", label: "Spades" },
};

interface CardDisplayProps {
  card: { rank: string; suit: string } | null;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  placeholder?: string;
  "data-ocid"?: string;
}

const SIZE_CLASSES = {
  sm: "w-8 h-11 text-xs",
  md: "w-12 h-16 text-sm",
  lg: "w-14 h-20 text-sm",
};

export function CardDisplay({
  card,
  size = "md",
  onClick,
  className,
  placeholder,
  "data-ocid": dataOcid,
}: CardDisplayProps) {
  if (!card) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-ocid={dataOcid}
        className={cn(
          SIZE_CLASSES[size],
          "border-2 border-dashed border-border rounded-md flex items-center justify-center",
          "text-muted-foreground hover:border-accent hover:text-accent transition-smooth cursor-pointer",
          className,
        )}
        aria-label={placeholder ?? "Select card"}
      >
        <span className="text-lg">+</span>
      </button>
    );
  }

  const config = SUIT_CONFIG[card.suit] ?? SUIT_CONFIG.s;

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={dataOcid}
      className={cn(
        SIZE_CLASSES[size],
        config.bgClass,
        "rounded-md flex flex-col items-center justify-between p-1 cursor-pointer",
        "border border-white/20 shadow-md hover:brightness-110 transition-smooth",
        className,
      )}
      aria-label={`${card.rank} of ${config.label}`}
    >
      <span className="text-white font-bold leading-none self-start">
        {card.rank}
      </span>
      <span className="text-white text-lg leading-none">{config.symbol}</span>
      <span className="text-white font-bold leading-none self-end rotate-180">
        {card.rank}
      </span>
    </button>
  );
}

// BoardDisplay — renders backend Card[] (suit: 'h'|'d'|'c'|'s' shorthand)
type BoardCardSize = "xs" | "sm" | "md" | "lg";
const BOARD_SIZE_CLASSES: Record<BoardCardSize, string> = {
  xs: "w-6 h-8 text-[9px]",
  sm: "w-8 h-11 text-xs",
  md: "w-10 h-14 text-sm",
  lg: "w-14 h-20 text-base",
};

export function BoardCardDisplay({
  card,
  size = "sm",
}: { card: BackendCard; size?: BoardCardSize }) {
  const config = SUIT_CONFIG[card.suit] ?? SUIT_CONFIG.s;
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center rounded-sm font-bold text-white border border-white/20 shadow-sm select-none",
        config.bgClass,
        BOARD_SIZE_CLASSES[size],
      )}
    >
      <span className="leading-none">{card.rank}</span>
      <span className="leading-none">{config.symbol}</span>
    </div>
  );
}

export function BoardDisplay({
  cards,
  size = "sm",
}: { cards: BackendCard[]; size?: BoardCardSize }) {
  if (cards.length === 0) {
    return (
      <span className="text-xs text-muted-foreground italic">Префлоп</span>
    );
  }
  return (
    <div className="flex gap-1 items-center">
      {cards.map((card) => (
        <BoardCardDisplay
          key={`${card.rank}${card.suit}`}
          card={card}
          size={size}
        />
      ))}
    </div>
  );
}

// Full deck picker grid — uses short suit codes
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
const SUITS = ["s", "h", "d", "c"] as const;

interface DeckPickerProps {
  onSelect: (card: { rank: string; suit: string }) => void;
  usedCards?: { rank: string; suit: string }[];
}

export function DeckPicker({ onSelect, usedCards = [] }: DeckPickerProps) {
  const isUsed = (rank: string, suit: string) =>
    usedCards.some((c) => c.rank === rank && c.suit === suit);

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${RANKS.length}, minmax(0, 1fr))` }}
    >
      {SUITS.map((suit) =>
        RANKS.map((rank) => {
          const config = SUIT_CONFIG[suit];
          const used = isUsed(rank, suit);
          return (
            <button
              key={`${rank}-${suit}`}
              type="button"
              disabled={used}
              onClick={() => onSelect({ rank, suit })}
              className={cn(
                "w-9 h-12 rounded flex flex-col items-center justify-between p-0.5",
                "border border-white/20 text-white font-bold",
                config.bgClass,
                used
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:brightness-125 cursor-pointer transition-smooth",
              )}
              aria-label={`${rank} of ${config.label}`}
            >
              <span className="text-xs leading-none">{rank}</span>
              <span className="text-base leading-none">{config.symbol}</span>
            </button>
          );
        }),
      )}
    </div>
  );
}
