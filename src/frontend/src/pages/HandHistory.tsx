import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { SAMPLE_HANDS, SAMPLE_STATS } from "@/lib/sampleData";
import type { HandHistoryRow } from "@/lib/sampleData";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  ClipboardPaste,
  History,
  TrendingDown,
  TrendingUp,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const STREET_LABELS: Record<string, string> = {
  Preflop: "Префлоп",
  Flop: "Флоп",
  Turn: "Тёрн",
  River: "Ривер",
};

const STREET_ORDER = ["Preflop", "Flop", "Turn", "River"];

function parseActionsToStreets(actions: string[]): Record<string, string[]> {
  const streets: Record<string, string[]> = {};
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

interface StreetSectionProps {
  street: string;
  actions: string[];
}

function StreetSection({ street, actions }: StreetSectionProps) {
  const [open, setOpen] = useState(true);
  const label = STREET_LABELS[street] ?? street;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary hover:bg-secondary/80 transition-smooth"
      >
        <span className="font-medium text-foreground text-sm">{label}</span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1.5 bg-background">
              {actions.map((action, i) => (
                <p
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable text list
                  key={i}
                  className="text-sm text-muted-foreground font-mono leading-relaxed"
                >
                  {action}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HandHistory() {
  const { t } = useTranslation();
  const [rows] = useState<HandHistoryRow[]>(SAMPLE_HANDS);
  const [selectedRow, setSelectedRow] = useState<HandHistoryRow | null>(
    rows[0],
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const streetMap = selectedRow
    ? parseActionsToStreets(selectedRow.actions)
    : {};

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
            <History className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {t("handHistoryTitle")}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-12">
          {t("handHistorySubtitle")}
        </p>
      </div>

      {/* Stats summary */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="hand_history.stats.panel"
      >
        {[
          {
            label: "VPIP",
            value: `${SAMPLE_STATS.vpip}%`,
            colorClass: "text-accent",
          },
          {
            label: "PFR",
            value: `${SAMPLE_STATS.pfr}%`,
            colorClass: "text-blue-400",
          },
          {
            label: "3bet%",
            value: `${SAMPLE_STATS.threeBetPct}%`,
            colorClass: "text-amber-400",
          },
          {
            label: "Fold to Cbet",
            value: `${SAMPLE_STATS.foldToCbet}%`,
            colorClass: "text-red-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl px-4 py-3"
          >
            <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
            <p className={cn("text-2xl font-bold font-mono", stat.colorClass)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Upload + hand table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Upload area */}
          <div
            data-ocid="hand_history.upload.dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            className={cn(
              "border-2 border-dashed rounded-xl p-6 text-center transition-smooth",
              isDragging
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/50 hover:bg-card/50",
            )}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              {t("uploadArea")}
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="hand_history.upload.upload_button"
                onClick={() => fileRef.current?.click()}
                className="border-border text-muted-foreground hover:text-foreground"
              >
                <Upload className="w-3 h-3 mr-1.5" />
                Загрузить файл
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="hand_history.paste.button"
                className="border-border text-muted-foreground hover:text-foreground"
              >
                <ClipboardPaste className="w-3 h-3 mr-1.5" />
                {t("pasteText")}
              </Button>
            </div>
            <input ref={fileRef} type="file" className="hidden" accept=".txt" />
          </div>

          {/* Hand list table */}
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="hand_history.hand_list.table"
          >
            <div className="grid grid-cols-3 px-4 py-2 border-b border-border bg-secondary">
              <span className="text-xs text-muted-foreground font-medium">
                {t("handNumberLabel")}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {t("dateLabel")}
              </span>
              <span className="text-xs text-muted-foreground font-medium text-right">
                {t("resultLabel")}
              </span>
            </div>
            <div className="divide-y divide-border">
              {rows.map((row, idx) => (
                <button
                  key={row.handNumber}
                  type="button"
                  data-ocid={`hand_history.hand_list.item.${idx + 1}`}
                  onClick={() => setSelectedRow(row)}
                  className={cn(
                    "w-full grid grid-cols-3 px-4 py-3 text-left transition-smooth hover:bg-secondary/50",
                    selectedRow?.handNumber === row.handNumber &&
                      "bg-accent/10 border-l-2 border-l-accent",
                  )}
                >
                  <span className="text-xs font-mono text-foreground">
                    {row.handNumber}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {row.date}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-mono font-bold text-right flex items-center justify-end gap-1",
                      row.result >= 0 ? "text-emerald-400" : "text-red-400",
                    )}
                  >
                    {row.result >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {row.result >= 0 ? "+" : ""}
                    {row.result}bb
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Selected hand breakdown */}
        <div className="lg:col-span-3 space-y-4">
          {selectedRow ? (
            <>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {t("breakdown")}
                </h2>
                <Badge
                  variant="outline"
                  className="border-border text-muted-foreground font-mono text-xs"
                >
                  {selectedRow.handNumber}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-mono text-xs ml-auto",
                    selectedRow.result >= 0
                      ? "border-emerald-500/30 text-emerald-400"
                      : "border-red-500/30 text-red-400",
                  )}
                >
                  {selectedRow.result >= 0 ? "+" : ""}
                  {selectedRow.result}bb
                </Badge>
              </div>

              <div
                className="space-y-3"
                data-ocid="hand_history.breakdown.panel"
              >
                {STREET_ORDER.map((s) => {
                  const acts = streetMap[s];
                  if (!acts?.length) return null;
                  return <StreetSection key={s} street={s} actions={acts} />;
                })}
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-foreground mb-3">
                  {t("biggestMistakes")}
                </p>
                <ul className="space-y-2">
                  {SAMPLE_STATS.biggestMistakes.map((mistake, i) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable static list
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">▸</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-48 text-muted-foreground"
              data-ocid="hand_history.breakdown.empty_state"
            >
              <History className="w-12 h-12 mb-3 opacity-30" />
              <p>{t("noData")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
