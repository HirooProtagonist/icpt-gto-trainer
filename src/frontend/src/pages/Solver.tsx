import { CardDisplay, DeckPicker } from "@/components/CardDisplay";
import { RangeMatrix } from "@/components/RangeMatrix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { SAMPLE_SPOTS } from "@/lib/sampleData";
import type { Position, SelectedCard, SolveResult, Street } from "@/types";
import { Calculator, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const POSITIONS: Position[] = ["UTG", "MP", "CO", "BTN", "SB", "BB"];
const STREETS: { value: Street; label: string }[] = [
  { value: "preflop", label: "Preflop" },
  { value: "flop", label: "Flop" },
  { value: "turn", label: "Turn" },
  { value: "river", label: "River" },
];
const PREV_ACTIONS = [
  "Open",
  "3bet",
  "4bet",
  "Limp",
  "Check",
  "Bet",
  "Raise",
] as const;

function getBoardSlotCount(street: Street): number {
  if (street === "preflop") return 0;
  if (street === "flop") return 3;
  if (street === "turn") return 4;
  return 5;
}

export default function Solver() {
  const { t } = useTranslation();

  const [heroPos, setHeroPos] = useState<Position>("BTN");
  const [villainPos, setVillainPos] = useState<Position>("BB");
  const [stackSize, setStackSize] = useState("100");
  const [prevAction, setPrevAction] = useState("Open");
  const [street, setStreet] = useState<Street>("flop");
  const [potSize, setPotSize] = useState("10");
  const [board, setBoard] = useState<({ rank: string; suit: string } | null)[]>(
    Array(5).fill(null),
  );
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [result, setResult] = useState<SolveResult | null>(null);
  const [resultSpot, setResultSpot] = useState<(typeof SAMPLE_SPOTS)[0] | null>(
    null,
  );

  const slotCount = getBoardSlotCount(street);
  const usedCards = board.filter(
    (c): c is { rank: string; suit: string } => c !== null,
  );

  function handleSelectCard(card: { rank: string; suit: string }) {
    if (pickerSlot === null) return;
    const newBoard = [...board];
    newBoard[pickerSlot] = card;
    setBoard(newBoard);
    setPickerSlot(null);
  }

  function handleClearSlot(idx: number) {
    const newBoard = [...board];
    newBoard[idx] = null;
    setBoard(newBoard);
  }

  function handleSolve() {
    const matched =
      SAMPLE_SPOTS.find(
        (s) => s.heroPosition === heroPos && s.street === street,
      ) ??
      SAMPLE_SPOTS.find((s) => s.street === street) ??
      SAMPLE_SPOTS[0];

    setResultSpot(matched);
    setResult({
      spotTitle: `${matched.heroPosition} vs ${matched.villainPosition} \u2014 ${matched.stackBb}bb`,
      recommendation: "Bet 67%, Check 33%",
      actions: [
        { label: "Bet 75%", pct: 67, color: "bg-emerald-500" },
        { label: "Check", pct: 33, color: "bg-blue-500" },
      ],
    });
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {t("solverTitle")}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-12">
          {t("solverSubtitle")}
        </p>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("heroPosition")}
              </Label>
              <Select
                value={heroPos}
                onValueChange={(v) => setHeroPos(v as Position)}
              >
                <SelectTrigger
                  data-ocid="solver.hero_position.select"
                  className="bg-secondary border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("villainPosition")}
              </Label>
              <Select
                value={villainPos}
                onValueChange={(v) => setVillainPos(v as Position)}
              >
                <SelectTrigger
                  data-ocid="solver.villain_position.select"
                  className="bg-secondary border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("stackSize")}
              </Label>
              <Input
                data-ocid="solver.stack_size.input"
                type="number"
                value={stackSize}
                onChange={(e) => setStackSize(e.target.value)}
                className="bg-secondary border-border"
                min={1}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("prevAction")}
              </Label>
              <Select value={prevAction} onValueChange={setPrevAction}>
                <SelectTrigger
                  data-ocid="solver.prev_action.select"
                  className="bg-secondary border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PREV_ACTIONS.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("street")}
              </Label>
              <Select
                value={street}
                onValueChange={(v) => {
                  setStreet(v as Street);
                  setBoard(Array(5).fill(null));
                }}
              >
                <SelectTrigger
                  data-ocid="solver.street.select"
                  className="bg-secondary border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STREETS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("board")}
              </Label>
              {street === "preflop" ? (
                <p className="text-muted-foreground text-sm italic py-2">
                  No board cards on Preflop
                </p>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: slotCount }).map((_, idx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed board slots
                    // biome-ignore lint/suspicious/noArrayIndexKey: stable slot list
                    <div key={`slot-${idx}`} className="relative group">
                      <CardDisplay
                        card={board[idx]}
                        size="lg"
                        onClick={() => setPickerSlot(idx)}
                        data-ocid={`solver.board_card.${idx + 1}`}
                      />
                      {board[idx] && (
                        <button
                          type="button"
                          onClick={() => handleClearSlot(idx)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                          aria-label="Remove card"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                {t("potSize")}
              </Label>
              <Input
                data-ocid="solver.pot_size.input"
                type="number"
                value={potSize}
                onChange={(e) => setPotSize(e.target.value)}
                className="bg-secondary border-border"
                min={1}
              />
            </div>

            <div className="pt-4">
              <Button
                type="button"
                data-ocid="solver.solve.primary_button"
                onClick={handleSolve}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-3 text-base transition-smooth"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {t("solveBtn")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && resultSpot && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 bg-card border border-accent/30 rounded-xl p-6 space-y-5"
            data-ocid="solver.result.panel"
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-accent" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t("foundSpot")}:
                </span>{" "}
                <Badge
                  variant="outline"
                  className="border-accent/40 text-accent ml-1"
                >
                  {result.spotTitle}
                </Badge>
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-medium text-foreground">
                  {t("strategyLabel")}:
                </span>{" "}
                <span className="text-accent font-semibold">
                  {result.recommendation}
                </span>
              </p>
              <div className="space-y-2">
                {result.actions.map((action) => (
                  <div key={action.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-24 shrink-0">
                      {action.label}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${action.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${action.pct}%` }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.1,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground w-10 text-right shrink-0">
                      {action.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                {t("rangeViz")}
              </p>
              <div className="overflow-x-auto">
                <RangeMatrix
                  ranges={
                    resultSpot.range.map((cell) => ({
                      bet: cell.betFreq,
                      call: cell.callFreq,
                      fold: cell.foldFreq,
                      check: 0,
                      raise: 0,
                    })) as import("@/backend").ActionFrequency[]
                  }
                  compact={false}
                  className="min-w-[360px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-border">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2">
                <p className="text-xs text-muted-foreground">EV</p>
                <p className="text-lg font-bold text-emerald-400">
                  +{resultSpot.potBb.toFixed(1)}bb
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("positionsLabel")}
                </p>
                <p className="font-semibold text-foreground">
                  {resultSpot.heroPosition} vs {resultSpot.villainPosition}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card picker modal */}
      <Dialog
        open={pickerSlot !== null}
        onOpenChange={(open) => {
          if (!open) setPickerSlot(null);
        }}
      >
        <DialogContent
          className="max-w-2xl bg-card border-border"
          data-ocid="solver.card_picker.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {t("selectCard")}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto py-2">
            <DeckPicker onSelect={handleSelectCard} usedCards={usedCards} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
