import { c as createLucideIcon, u as useTranslation, b as useNavigate, r as reactExports, j as jsxRuntimeExports, B as BookOpen, e as ChevronRight } from "./index-Cbhxa_lC.js";
import { B as BoardDisplay } from "./CardDisplay-gvQWxUMu.js";
import { I as Input } from "./input-DB3YgYVA.js";
import { S as Skeleton } from "./skeleton-DHH0MucC.js";
import { u as useListSpots } from "./useBackend-nsIRTrYx.js";
import { c as cn } from "./sampleData-HgH5VJ6N.js";
import { S as SlidersHorizontal } from "./sliders-horizontal-B7lMRs8F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const POSITIONS_LIST = ["UTG", "MP", "CO", "BTN", "SB", "BB"];
const STACK_SIZES_LIST = ["20bb", "40bb", "100bb"];
const STREET_COLORS = {
  Preflop: "bg-violet-600/20 text-violet-300 border-violet-600/30",
  Flop: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
  Turn: "bg-amber-600/20 text-amber-300 border-amber-600/30",
  River: "bg-blue-600/20 text-blue-300 border-blue-600/30"
};
const STREET_LABEL_RU = {
  Preflop: "Префлоп",
  Flop: "Флоп",
  Turn: "Тёрн",
  River: "Ривер"
};
function SpotCard({
  spot,
  onClick
}) {
  const isPositiveEV = spot.evData.expectedValue >= 0;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: card is interactive via onClick
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "library.spot.card",
        onClick,
        className: "group relative bg-card border border-border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[11px] font-medium px-2 py-0.5 rounded-full border",
                  STREET_COLORS[spot.street] ?? "bg-muted text-muted-foreground border-border"
                ),
                children: STREET_LABEL_RU[spot.street] ?? spot.street
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: spot.positions.map((pos, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "vs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: pos })
          ] }, pos)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 line-clamp-2", children: spot.description }),
          spot.board.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BoardDisplay, { cards: spot.board, size: "xs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: spot.evData.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "text-xs font-mono font-semibold",
                  isPositiveEV ? "text-emerald-400" : "text-red-400"
                ),
                children: [
                  isPositiveEV ? "+" : "",
                  spot.evData.expectedValue.toFixed(2),
                  " bb"
                ]
              }
            )
          ] })
        ]
      }
    )
  );
}
function SpotCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-6" })
    ] })
  ] });
}
function Library() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [filterPosition, setFilterPosition] = reactExports.useState("all");
  const [filterStack, setFilterStack] = reactExports.useState("all");
  const [filterStreet, setFilterStreet] = reactExports.useState("all");
  const { data: spots = [], isLoading } = useListSpots(null);
  const filtered = reactExports.useMemo(() => {
    return spots.filter((s) => {
      if (filterPosition !== "all" && !s.positions.includes(filterPosition))
        return false;
      if (filterStack !== "all" && s.filters.stackSize !== filterStack)
        return false;
      if (filterStreet !== "all" && s.street !== filterStreet) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return s.description.toLowerCase().includes(q) || s.positions.some((p) => p.toLowerCase().includes(q)) || s.street.toLowerCase().includes(q);
      }
      return true;
    });
  }, [spots, filterPosition, filterStack, filterStreet, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "library.page", className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: t("navLibrary") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isLoading ? t("loading") : `${filtered.length} ${t("libFound")}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "library.search_input",
            className: "pl-9 bg-background/60 border-border/60 focus:border-accent/50",
            placeholder: t("libSearch"),
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: ["all", ...POSITIONS_LIST].map((pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `library.filter.position.${pos}`,
            onClick: () => setFilterPosition(pos),
            className: cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
              filterPosition === pos ? "bg-accent/20 border-accent/40 text-accent" : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
            ),
            children: pos === "all" ? t("libAll") : pos
          },
          pos
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: [
          { val: "all", label: t("libAll") },
          { val: "Preflop", label: t("libPreflop") },
          { val: "Flop", label: t("libFlop") },
          { val: "Turn", label: t("libTurn") },
          { val: "River", label: t("libRiver") }
        ].map(({ val, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `library.filter.street.${val}`,
            onClick: () => setFilterStreet(val),
            className: cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
              filterStreet === val ? "bg-primary/20 border-primary/40 text-primary" : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
            ),
            children: label
          },
          val
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: ["all", ...STACK_SIZES_LIST].map((stack) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `library.filter.stack.${stack}`,
            onClick: () => setFilterStack(stack),
            className: cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
              filterStack === stack ? "bg-secondary/60 border-secondary-foreground/20 text-foreground" : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
            ),
            children: stack === "all" ? t("libAll") : stack
          },
          stack
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "library.loading_state",
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        children: Array.from({ length: 9 }).map((_, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
          // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton list
          /* @__PURE__ */ jsxRuntimeExports.jsx(SpotCardSkeleton, {}, `skeleton-${idx}`)
        ))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "library.empty_state",
        className: "flex flex-col items-center justify-center py-24 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/40 border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: t("libNoSpots") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("libNoSpotsHint") })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "library.spot.list",
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        children: filtered.map((spot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SpotCard,
          {
            spot,
            onClick: () => navigate({
              to: "/library/$spotId",
              params: { spotId: spot.id }
            })
          },
          spot.id
        ))
      }
    ) })
  ] });
}
export {
  Library as default
};
