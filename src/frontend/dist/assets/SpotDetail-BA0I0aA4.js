import { c as createLucideIcon, u as useTranslation, b as useNavigate, f as useParams, j as jsxRuntimeExports } from "./index-Cbhxa_lC.js";
import { B as BoardDisplay } from "./CardDisplay-gvQWxUMu.js";
import { R as RangeMatrix } from "./RangeMatrix-CMucO62K.js";
import { S as Skeleton } from "./skeleton-DHH0MucC.js";
import { a as useGetSpot } from "./useBackend-nsIRTrYx.js";
import { c as cn } from "./sampleData-HgH5VJ6N.js";
import { T as TrendingUp } from "./trending-up-C8U7Ky8g.js";
import { T as TrendingDown } from "./trending-down-CAn2HnYN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
const STREET_LABEL_RU = {
  Preflop: "Префлоп",
  Flop: "Флоп",
  Turn: "Тёрн",
  River: "Ривер"
};
function ActionBar({
  label,
  value,
  colorClass
}) {
  const pct = Math.round(value * 100);
  if (pct < 1) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 text-xs text-muted-foreground shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2.5 bg-muted/50 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-full rounded-full transition-all duration-500",
          colorClass
        ),
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          "text-xs font-mono font-semibold w-9 text-right",
          colorClass.replace("bg-", "text-")
        ),
        children: [
          pct,
          "%"
        ]
      }
    )
  ] });
}
function aggregateFrequencies(ranges) {
  if (ranges.length === 0)
    return { bet: 0, call: 0, fold: 0, check: 0, raise: 0 };
  const sum = ranges.reduce(
    (acc, r) => ({
      bet: acc.bet + r.bet,
      call: acc.call + r.call,
      fold: acc.fold + r.fold,
      check: acc.check + r.check,
      raise: acc.raise + r.raise
    }),
    { bet: 0, call: 0, fold: 0, check: 0, raise: 0 }
  );
  const n = ranges.length;
  return {
    bet: sum.bet / n,
    call: sum.call / n,
    fold: sum.fold / n,
    check: sum.check / n,
    raise: sum.raise / n
  };
}
function computeEquity(ranges) {
  if (ranges.length === 0) return { hero: 50, villain: 50 };
  const agg = aggregateFrequencies(ranges);
  const heroEquity = 40 + (agg.bet + agg.raise) * 30 - (agg.call + agg.check) * 10;
  const clamped = Math.max(20, Math.min(80, heroEquity));
  return { hero: Math.round(clamped), villain: Math.round(100 - clamped) };
}
function EquityBar({ hero, villain }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-semibold", children: [
        "Герой ",
        hero,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-semibold", children: [
        "Виллан ",
        villain,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-3 rounded-full overflow-hidden flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-emerald-600 transition-all duration-700",
          style: { width: `${hero}%` }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-red-700 transition-all duration-700",
          style: { width: `${villain}%` }
        }
      )
    ] })
  ] });
}
function SpotDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const spotId = params.spotId ?? "";
  const { data: spot, isLoading } = useGetSpot(spotId);
  const equity = spot ? computeEquity(spot.ranges) : { hero: 50, villain: 50 };
  const agg = spot ? aggregateFrequencies(spot.ranges) : null;
  const isPositiveEV = spot ? spot.evData.expectedValue >= 0 : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "spot_detail.page", className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "spot_detail.back_button",
          onClick: () => navigate({ to: "/library" }),
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            t("libBackToLibrary")
          ]
        }
      ),
      !isLoading && spot && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: spot.positions.map((pos, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "vs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground", children: pos })
        ] }, pos)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: STREET_LABEL_RU[spot.street] ?? spot.street }),
        spot.board.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BoardDisplay, { cards: spot.board, size: "xs" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "spot_detail.loading_state", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[420px] w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" })
    ] }) : !spot ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "spot_detail.error_state",
        className: "flex flex-col items-center justify-center py-32 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🃏" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "Ситуация не найдена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-accent underline",
              onClick: () => navigate({ to: "/library" }),
              children: t("libBackToLibrary")
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: spot.description }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 xl:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 bg-card border border-border rounded-xl p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-accent" }),
            t("libRangeMatrix")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RangeMatrix, { ranges: spot.ranges })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: t("libEvData") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              isPositiveEV ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-8 h-8 text-red-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "text-2xl font-bold font-mono",
                      isPositiveEV ? "text-emerald-400" : "text-red-400"
                    ),
                    children: [
                      isPositiveEV ? "+" : "",
                      spot.evData.expectedValue.toFixed(2),
                      " bb"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  t("libRecommendedAction"),
                  ":",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: spot.evData.action })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: t("libEquityBars") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EquityBar, { hero: equity.hero, villain: equity.villain })
          ] }),
          agg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: t("libActionFreq") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionBar,
                {
                  label: t("libBet"),
                  value: agg.bet,
                  colorClass: "bg-emerald-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionBar,
                {
                  label: t("libRaise"),
                  value: agg.raise,
                  colorClass: "bg-emerald-700"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionBar,
                {
                  label: t("libCall"),
                  value: agg.call,
                  colorClass: "bg-blue-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionBar,
                {
                  label: t("libCheck"),
                  value: agg.check,
                  colorClass: "bg-blue-700"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionBar,
                {
                  label: t("libFold"),
                  value: agg.fold,
                  colorClass: "bg-red-600"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Параметры" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "space-y-1.5 text-xs", children: [
              ["Позиция", spot.filters.position],
              ["Стек", spot.filters.stackSize],
              [
                "Улица",
                STREET_LABEL_RU[spot.filters.street] ?? spot.filters.street
              ],
              ["Поставка", spot.filters.betSizing || "—"],
              ["Текстура", spot.filters.boardTexture || "—"]
            ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: k }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium", children: v })
            ] }, k)) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SpotDetail as default
};
