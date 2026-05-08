import { c as createLucideIcon, u as useTranslation, r as reactExports, j as jsxRuntimeExports, e as ChevronRight } from "./index-Cbhxa_lC.js";
import { B as Button, a as Badge } from "./button-4hsIGPrH.js";
import { a as SAMPLE_HANDS, b as SAMPLE_STATS, c as cn } from "./sampleData-HgH5VJ6N.js";
import { H as History } from "./history-B4R_rcSy.js";
import { T as TrendingUp } from "./trending-up-C8U7Ky8g.js";
import { T as TrendingDown } from "./trending-down-CAn2HnYN.js";
import { C as ChevronDown } from "./chevron-down-D3HnQuL4.js";
import { A as AnimatePresence } from "./index-DgQrPEt6.js";
import { m as motion } from "./proxy-0CUfrAz2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M11 14h10", key: "1w8e9d" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
  ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
];
const ClipboardPaste = createLucideIcon("clipboard-paste", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const STREET_LABELS = {
  Preflop: "Префлоп",
  Flop: "Флоп",
  Turn: "Тёрн",
  River: "Ривер"
};
const STREET_ORDER = ["Preflop", "Flop", "Turn", "River"];
function parseActionsToStreets(actions) {
  const streets = {};
  for (const action of actions) {
    const match = action.match(/^(Preflop|Flop|Turn|River)/);
    if (match) {
      const s = match[1];
      if (!streets[s]) streets[s] = [];
      streets[s].push(action);
    } else {
      const last = Object.keys(streets).at(-1) ?? "Preflop";
      if (!streets[last]) streets[last] = [];
      streets[last].push(action);
    }
  }
  return streets;
}
function StreetSection({ street, actions }) {
  const [open, setOpen] = reactExports.useState(true);
  const label = STREET_LABELS[street] ?? street;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        className: "w-full flex items-center justify-between px-4 py-3 bg-secondary hover:bg-secondary/80 transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: label }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.22, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 space-y-1.5 bg-background", children: actions.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground font-mono leading-relaxed",
            children: action
          },
          i
        )) })
      }
    ) })
  ] });
}
function HandHistory() {
  const { t } = useTranslation();
  const [rows] = reactExports.useState(SAMPLE_HANDS);
  const [selectedRow, setSelectedRow] = reactExports.useState(
    rows[0]
  );
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const streetMap = selectedRow ? parseActionsToStreets(selectedRow.actions) : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: t("handHistoryTitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm ml-12", children: t("handHistorySubtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "hand_history.stats.panel",
        children: [
          {
            label: "VPIP",
            value: `${SAMPLE_STATS.vpip}%`,
            colorClass: "text-accent"
          },
          {
            label: "PFR",
            value: `${SAMPLE_STATS.pfr}%`,
            colorClass: "text-blue-400"
          },
          {
            label: "3bet%",
            value: `${SAMPLE_STATS.threeBetPct}%`,
            colorClass: "text-amber-400"
          },
          {
            label: "Fold to Cbet",
            value: `${SAMPLE_STATS.foldToCbet}%`,
            colorClass: "text-red-400"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl px-4 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-2xl font-bold font-mono", stat.colorClass), children: stat.value })
            ]
          },
          stat.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "hand_history.upload.dropzone",
            onDragOver: (e) => {
              e.preventDefault();
              setIsDragging(true);
            },
            onDragLeave: () => setIsDragging(false),
            onDrop: (e) => {
              e.preventDefault();
              setIsDragging(false);
            },
            className: cn(
              "border-2 border-dashed rounded-xl p-6 text-center transition-smooth",
              isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-card/50"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: t("uploadArea") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    "data-ocid": "hand_history.upload.upload_button",
                    onClick: () => {
                      var _a;
                      return (_a = fileRef.current) == null ? void 0 : _a.click();
                    },
                    className: "border-border text-muted-foreground hover:text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3 mr-1.5" }),
                      "Загрузить файл"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    "data-ocid": "hand_history.paste.button",
                    className: "border-border text-muted-foreground hover:text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardPaste, { className: "w-3 h-3 mr-1.5" }),
                      t("pasteText")
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", className: "hidden", accept: ".txt" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl overflow-hidden",
            "data-ocid": "hand_history.hand_list.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 px-4 py-2 border-b border-border bg-secondary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: t("handNumberLabel") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: t("dateLabel") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium text-right", children: t("resultLabel") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `hand_history.hand_list.item.${idx + 1}`,
                  onClick: () => setSelectedRow(row),
                  className: cn(
                    "w-full grid grid-cols-3 px-4 py-3 text-left transition-smooth hover:bg-secondary/50",
                    (selectedRow == null ? void 0 : selectedRow.handNumber) === row.handNumber && "bg-accent/10 border-l-2 border-l-accent"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: row.handNumber }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: row.date }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: cn(
                          "text-xs font-mono font-bold text-right flex items-center justify-end gap-1",
                          row.result >= 0 ? "text-emerald-400" : "text-red-400"
                        ),
                        children: [
                          row.result >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
                          row.result >= 0 ? "+" : "",
                          row.result,
                          "bb"
                        ]
                      }
                    )
                  ]
                },
                row.handNumber
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 space-y-4", children: selectedRow ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: t("breakdown") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "border-border text-muted-foreground font-mono text-xs",
              children: selectedRow.handNumber
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: cn(
                "font-mono text-xs ml-auto",
                selectedRow.result >= 0 ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"
              ),
              children: [
                selectedRow.result >= 0 ? "+" : "",
                selectedRow.result,
                "bb"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-3",
            "data-ocid": "hand_history.breakdown.panel",
            children: STREET_ORDER.map((s) => {
              const acts = streetMap[s];
              if (!(acts == null ? void 0 : acts.length)) return null;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(StreetSection, { street: s, actions: acts }, s);
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: t("biggestMistakes") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: SAMPLE_STATS.biggestMistakes.map((mistake, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 mt-0.5 shrink-0", children: "▸" }),
                mistake
              ]
            },
            i
          )) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center h-48 text-muted-foreground",
          "data-ocid": "hand_history.breakdown.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-12 h-12 mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("noData") })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  HandHistory as default
};
