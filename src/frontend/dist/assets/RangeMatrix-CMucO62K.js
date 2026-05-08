import { r as reactExports, j as jsxRuntimeExports } from "./index-Cbhxa_lC.js";
import { c as cn } from "./sampleData-HgH5VJ6N.js";
const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
function getHandLabel(row, col) {
  const r1 = RANKS[row];
  const r2 = RANKS[col];
  if (row === col) return `${r1}${r2}`;
  if (row < col) return `${r1}${r2}s`;
  return `${r1}${r2}o`;
}
function getCellColor(freq) {
  const aggression = freq.bet + freq.raise;
  const passive = freq.call + freq.check;
  if (aggression > 0.5) return "bg-emerald-600";
  if (aggression > 0.3) return "bg-emerald-800";
  if (passive > 0.6) return "bg-blue-700";
  if (freq.fold > 0.7) return "bg-red-800";
  return "bg-[#6b7280]";
}
function RangeMatrix({
  ranges,
  compact = false,
  mini = false,
  className
}) {
  const [hovered, setHovered] = reactExports.useState(
    null
  );
  const isCompact = compact || mini;
  const cellSize = isCompact ? "w-4 h-4" : "w-6 h-6";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-px",
        style: { gridTemplateColumns: "repeat(13, minmax(0, 1fr))" },
        children: RANKS.map(
          (_, row) => RANKS.map((_2, col) => {
            const idx = row * 13 + col;
            const freq = ranges[idx] ?? {
              bet: 0,
              check: 0,
              call: 0,
              fold: 1,
              raise: 0
            };
            const label = getHandLabel(row, col);
            const isHov = (hovered == null ? void 0 : hovered.row) === row && (hovered == null ? void 0 : hovered.col) === col;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  cellSize,
                  getCellColor(freq),
                  "rounded-sm flex items-center justify-center cursor-pointer transition-smooth",
                  isHov && "ring-1 ring-white scale-110 z-10 relative"
                ),
                onMouseEnter: () => setHovered({ row, col }),
                onMouseLeave: () => setHovered(null),
                title: `${label}: Bet ${Math.round(freq.bet * 100)}%, Call ${Math.round(freq.call * 100)}%, Fold ${Math.round(freq.fold * 100)}%`,
                children: !isCompact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[6px] text-white/70 font-mono leading-none", children: label })
              },
              `cell-${row * 13 + col}`
            );
          })
        )
      }
    ),
    hovered && !isCompact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-12 left-0 bg-popover border border-border rounded-md px-3 py-2 text-xs text-foreground z-20 pointer-events-none shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: getHandLabel(hovered.row, hovered.col) }),
      " — ",
      (() => {
        const idx = hovered.row * 13 + hovered.col;
        const f = ranges[idx] ?? {
          bet: 0,
          call: 0,
          fold: 1
        };
        return `Bet ${Math.round(f.bet * 100)}% / Call ${Math.round(f.call * 100)}% / Fold ${Math.round(f.fold * 100)}%`;
      })()
    ] })
  ] });
}
export {
  RangeMatrix as R
};
