import { j as jsxRuntimeExports } from "./index-Cbhxa_lC.js";
import { c as cn } from "./sampleData-HgH5VJ6N.js";
const SUIT_CONFIG = {
  h: { symbol: "♥", bgClass: "bg-red-600", label: "Hearts" },
  d: { symbol: "♦", bgClass: "bg-blue-600", label: "Diamonds" },
  c: { symbol: "♣", bgClass: "bg-emerald-600", label: "Clubs" },
  s: { symbol: "♠", bgClass: "bg-[#111111]", label: "Spades" },
  // Long-form keys for Solver's SelectedCard type
  hearts: { symbol: "♥", bgClass: "bg-red-600", label: "Hearts" },
  diamonds: { symbol: "♦", bgClass: "bg-blue-600", label: "Diamonds" },
  clubs: { symbol: "♣", bgClass: "bg-emerald-600", label: "Clubs" },
  spades: { symbol: "♠", bgClass: "bg-[#111111]", label: "Spades" }
};
const SIZE_CLASSES = {
  sm: "w-8 h-11 text-xs",
  md: "w-12 h-16 text-sm",
  lg: "w-14 h-20 text-sm"
};
function CardDisplay({
  card,
  size = "md",
  onClick,
  className,
  placeholder,
  "data-ocid": dataOcid
}) {
  if (!card) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick,
        "data-ocid": dataOcid,
        className: cn(
          SIZE_CLASSES[size],
          "border-2 border-dashed border-border rounded-md flex items-center justify-center",
          "text-muted-foreground hover:border-accent hover:text-accent transition-smooth cursor-pointer",
          className
        ),
        "aria-label": placeholder ?? "Select card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "+" })
      }
    );
  }
  const config = SUIT_CONFIG[card.suit] ?? SUIT_CONFIG.s;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": dataOcid,
      className: cn(
        SIZE_CLASSES[size],
        config.bgClass,
        "rounded-md flex flex-col items-center justify-between p-1 cursor-pointer",
        "border border-white/20 shadow-md hover:brightness-110 transition-smooth",
        className
      ),
      "aria-label": `${card.rank} of ${config.label}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold leading-none self-start", children: card.rank }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-lg leading-none", children: config.symbol }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold leading-none self-end rotate-180", children: card.rank })
      ]
    }
  );
}
const BOARD_SIZE_CLASSES = {
  xs: "w-6 h-8 text-[9px]",
  sm: "w-8 h-11 text-xs",
  md: "w-10 h-14 text-sm",
  lg: "w-14 h-20 text-base"
};
function BoardCardDisplay({
  card,
  size = "sm"
}) {
  const config = SUIT_CONFIG[card.suit] ?? SUIT_CONFIG.s;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "inline-flex flex-col items-center justify-center rounded-sm font-bold text-white border border-white/20 shadow-sm select-none",
        config.bgClass,
        BOARD_SIZE_CLASSES[size]
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-none", children: card.rank }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-none", children: config.symbol })
      ]
    }
  );
}
function BoardDisplay({
  cards,
  size = "sm"
}) {
  if (cards.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "Префлоп" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-center", children: cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    BoardCardDisplay,
    {
      card,
      size
    },
    `${card.rank}${card.suit}`
  )) });
}
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
  "2"
];
const SUITS = ["s", "h", "d", "c"];
function DeckPicker({ onSelect, usedCards = [] }) {
  const isUsed = (rank, suit) => usedCards.some((c) => c.rank === rank && c.suit === suit);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid gap-1",
      style: { gridTemplateColumns: `repeat(${RANKS.length}, minmax(0, 1fr))` },
      children: SUITS.map(
        (suit) => RANKS.map((rank) => {
          const config = SUIT_CONFIG[suit];
          const used = isUsed(rank, suit);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              disabled: used,
              onClick: () => onSelect({ rank, suit }),
              className: cn(
                "w-9 h-12 rounded flex flex-col items-center justify-between p-0.5",
                "border border-white/20 text-white font-bold",
                config.bgClass,
                used ? "opacity-30 cursor-not-allowed" : "hover:brightness-125 cursor-pointer transition-smooth"
              ),
              "aria-label": `${rank} of ${config.label}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs leading-none", children: rank }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: config.symbol })
              ]
            },
            `${rank}-${suit}`
          );
        })
      )
    }
  );
}
export {
  BoardDisplay as B,
  CardDisplay as C,
  DeckPicker as D
};
