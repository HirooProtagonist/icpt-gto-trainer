import type { ActionFrequency } from "@/backend";
import { cn } from "@/lib/utils";
import { useState } from "react";

const RANKS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

function getHandLabel(row: number, col: number): string {
  const r1 = RANKS[row];
  const r2 = RANKS[col];
  if (row === col) return `${r1}${r2}`;
  if (row < col) return `${r1}${r2}s`;
  return `${r1}${r2}o`;
}

function getCellColor(freq: ActionFrequency): string {
  const aggression = freq.bet + freq.raise;
  const passive = freq.call + freq.check;
  if (aggression > 0.5) return "bg-emerald-600";
  if (aggression > 0.3) return "bg-emerald-800";
  if (passive > 0.6) return "bg-blue-700";
  if (freq.fold > 0.7) return "bg-red-800";
  return "bg-[#6b7280]";
}

export interface RangeMatrixProps {
  ranges: ActionFrequency[];
  compact?: boolean;
  mini?: boolean;
  className?: string;
}

export function RangeMatrix({
  ranges,
  compact = false,
  mini = false,
  className,
}: RangeMatrixProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null,
  );
  const isCompact = compact || mini;
  const cellSize = isCompact ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className={cn("relative", className)}>
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
      >
        {RANKS.map((_, row) =>
          RANKS.map((_, col) => {
            const idx = row * 13 + col;
            const freq = ranges[idx] ?? {
              bet: 0,
              check: 0,
              call: 0,
              fold: 1,
              raise: 0,
            };
            const label = getHandLabel(row, col);
            const isHov = hovered?.row === row && hovered?.col === col;

            return (
              <div
                key={`cell-${row * 13 + col}`}
                className={cn(
                  cellSize,
                  getCellColor(freq),
                  "rounded-sm flex items-center justify-center cursor-pointer transition-smooth",
                  isHov && "ring-1 ring-white scale-110 z-10 relative",
                )}
                onMouseEnter={() => setHovered({ row, col })}
                onMouseLeave={() => setHovered(null)}
                title={`${label}: Bet ${Math.round(freq.bet * 100)}%, Call ${Math.round(freq.call * 100)}%, Fold ${Math.round(freq.fold * 100)}%`}
              >
                {!isCompact && (
                  <span className="text-[6px] text-white/70 font-mono leading-none">
                    {label}
                  </span>
                )}
              </div>
            );
          }),
        )}
      </div>

      {hovered && !isCompact && (
        <div className="absolute -bottom-12 left-0 bg-popover border border-border rounded-md px-3 py-2 text-xs text-foreground z-20 pointer-events-none shadow-lg">
          <span className="font-bold">
            {getHandLabel(hovered.row, hovered.col)}
          </span>
          {" \u2014 "}
          {(() => {
            const idx = hovered.row * 13 + hovered.col;
            const f = ranges[idx] ?? {
              bet: 0,
              call: 0,
              fold: 1,
              check: 0,
              raise: 0,
            };
            return `Bet ${Math.round(f.bet * 100)}% / Call ${Math.round(f.call * 100)}% / Fold ${Math.round(f.fold * 100)}%`;
          })()}
        </div>
      )}
    </div>
  );
}
