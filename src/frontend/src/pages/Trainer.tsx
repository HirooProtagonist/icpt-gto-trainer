import type { ActionFrequency } from "@/backend";
import { ActionButtons } from "@/components/ActionButtons";
import { BoardDisplay } from "@/components/CardDisplay";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { RangeMatrix } from "@/components/RangeMatrix";
import { SessionSummary } from "@/components/SessionSummary";
import { TimerBar } from "@/components/TimerBar";
import { GTO_EXPLANATIONS, HERO_HANDS, SAMPLE_SPOTS } from "@/lib/sampleData";
import type {
  Action,
  SessionResult,
  SolvedSpot,
  TrainerHand,
  TrainingMode,
} from "@/types";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback as useReactCallback,
  useMemo as useReactMemo,
  useState as useReactState,
} from "react";

// ---- helpers ----------------------------------------------------------------

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function deriveGtoAction(spot: SolvedSpot): Action {
  // Use the range median to infer dominant action
  const rangeSlice = spot.range.slice(0, 20);
  const avgBet =
    rangeSlice.reduce((s, c) => s + c.betFreq, 0) / rangeSlice.length;
  const avgCall =
    rangeSlice.reduce((s, c) => s + c.callFreq, 0) / rangeSlice.length;
  const avgFold =
    rangeSlice.reduce((s, c) => s + c.foldFreq, 0) / rangeSlice.length;
  if (avgBet >= avgCall && avgBet >= avgFold) return "raise";
  if (avgCall >= avgFold) return "call";
  return "fold";
}

function buildGtoFreqs(gtoAction: Action): { action: string; freq: number }[] {
  const map: Record<Action, { action: string; freq: number }[]> = {
    raise: [
      { action: "raise", freq: 0.67 },
      { action: "check", freq: 0.33 },
    ],
    call: [
      { action: "call", freq: 0.58 },
      { action: "fold", freq: 0.42 },
    ],
    check: [
      { action: "check", freq: 0.72 },
      { action: "fold", freq: 0.28 },
    ],
    fold: [
      { action: "fold", freq: 0.85 },
      { action: "call", freq: 0.15 },
    ],
    allin: [{ action: "allin", freq: 1.0 }],
  };
  return map[gtoAction];
}

function buildHand(spot: SolvedSpot): TrainerHand {
  const heroHand = pickRandom(HERO_HANDS);
  const gtoAction = deriveGtoAction(spot);
  return {
    spot,
    heroHand,
    userAction: null,
    gtoAction,
    gtoFreqs: buildGtoFreqs(gtoAction),
    evDelta: 0,
    explanation: GTO_EXPLANATIONS[gtoAction] ?? GTO_EXPLANATIONS.fold,
  };
}

function calcEvDelta(userAction: Action, gtoAction: Action): number {
  if (userAction === gtoAction) return +(Math.random() * 0.4 + 0.1).toFixed(2);
  return -(Math.random() * 2.5 + 0.3).toFixed(2);
}

function buildSessionResult(hands: TrainerHand[]): SessionResult {
  const correct = hands.filter((h) => h.userAction === h.gtoAction).length;
  const accuracy = hands.length ? (correct / hands.length) * 100 : 0;
  const totalEvLost = hands.reduce((s, h) => s + h.evDelta, 0);
  const mistakes = hands
    .filter((h) => h.userAction !== h.gtoAction)
    .slice(0, 3)
    .map((h) => ({
      hand: `${h.heroHand[0].rank}${h.heroHand[0].suit}${h.heroHand[1].rank}${h.heroHand[1].suit}`,
      mistake: `${h.userAction?.toUpperCase() ?? "?"} (GTO: ${h.gtoAction.toUpperCase()})`,
      ev: h.evDelta,
    }));
  return { hands, accuracy, totalEvLost, biggestMistakes: mistakes };
}

function rangeToActionFrequency(spot: SolvedSpot): ActionFrequency[] {
  return spot.range.map((cell) => ({
    bet: cell.betFreq,
    call: cell.callFreq,
    fold: cell.foldFreq,
    check: Math.max(0, 1 - cell.betFreq - cell.callFreq - cell.foldFreq),
    raise: 0,
  }));
}

// ---- mode config ------------------------------------------------------------

const MODES: { id: TrainingMode; label: string; count: number | null }[] = [
  { id: "single", label: "1 рука", count: 1 },
  { id: "random", label: "Случайная", count: 1 },
  { id: "session5", label: "5 рук", count: 5 },
  { id: "session10", label: "10 рук", count: 10 },
  { id: "session20", label: "20 рук", count: 20 },
];

type Phase = "setup" | "play" | "feedback" | "summary";

// ---- component --------------------------------------------------------------

export default function Trainer() {
  const [mode, setMode] = useReactState<TrainingMode>("session5");
  const [phase, setPhase] = useReactState<Phase>("setup");
  const [queue, setQueue] = useReactState<TrainerHand[]>([]);
  const [current, setCurrent] = useReactState<TrainerHand | null>(null);
  const [played, setPlayed] = useReactState<TrainerHand[]>([]);
  const [timerActive, setTimerActive] = useReactState(false);
  const [sessionResult, setSessionResult] = useReactState<SessionResult | null>(
    null,
  );

  const modeConfig = useReactMemo(
    () => MODES.find((m) => m.id === mode) ?? MODES[0],
    [mode],
  );

  const startSession = useReactCallback(() => {
    const count = modeConfig.count ?? 1;
    const spots = Array.from({ length: count }, () => pickRandom(SAMPLE_SPOTS));
    const hands = spots.map(buildHand);
    setQueue(hands.slice(1));
    setCurrent(hands[0]);
    setPlayed([]);
    setSessionResult(null);
    setPhase("play");
    setTimerActive(true);
  }, [modeConfig]);

  const handleAction = useReactCallback(
    (action: Action) => {
      if (!current) return;
      setTimerActive(false);
      const evDelta = calcEvDelta(action, current.gtoAction);
      const updated: TrainerHand = {
        ...current,
        userAction: action,
        evDelta,
      };
      setCurrent(updated);
      setPhase("feedback");
    },
    [current],
  );

  const handleTimeout = useReactCallback(() => {
    handleAction("fold");
  }, [handleAction]);

  const handleNext = useReactCallback(() => {
    if (!current) return;
    const newPlayed = [...played, current];
    setPlayed(newPlayed);

    if (queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(queue.slice(1));
      setPhase("play");
      setTimerActive(true);
    } else {
      const result = buildSessionResult(newPlayed);
      setSessionResult(result);
      setPhase("summary");
    }
  }, [current, played, queue]);

  const handlePlayAgain = useReactCallback(() => {
    setPhase("setup");
    setQueue([]);
    setCurrent(null);
    setPlayed([]);
    setSessionResult(null);
  }, []);

  const totalHands = modeConfig.count ?? 1;
  const handNum = played.length + 1;

  // ---- render setup screen ----
  if (phase === "setup") {
    return (
      <div className="p-6 max-w-2xl mx-auto" data-ocid="trainer.page">
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">
          Тренажёр
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Отрабатывайте GTO-решения в режиме реального времени
        </p>

        {/* Mode selector */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
            Режим тренировки
          </p>
          <div className="flex flex-wrap gap-2" data-ocid="trainer.mode_select">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                data-ocid={`trainer.mode_${m.id}`}
                onClick={() => setMode(m.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-smooth ${
                  mode === m.id
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          type="button"
          data-ocid="trainer.start_button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={startSession}
          className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg tracking-wide shadow-lg transition-smooth"
        >
          Начать сессию
        </motion.button>

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: "⏱", title: "20 секунд", desc: "на каждое решение" },
            {
              icon: "🏦",
              title: "Тайм-банк 90с",
              desc: "автоматически при таймауте",
            },
            {
              icon: "📊",
              title: "GTO анализ",
              desc: "мгновенная обратная связь",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <div className="text-2xl mb-1">{tip.icon}</div>
              <p className="text-sm font-semibold text-foreground">
                {tip.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---- render summary ----
  if (phase === "summary" && sessionResult) {
    return (
      <div className="p-6" data-ocid="trainer.page">
        <SessionSummary result={sessionResult} onPlayAgain={handlePlayAgain} />
      </div>
    );
  }

  // ---- render play / feedback ----
  if (!current) return null;

  const afFreqs = rangeToActionFrequency(current.spot);

  return (
    <div className="flex flex-col h-full" data-ocid="trainer.page">
      {/* Top bar — timer + progress */}
      <div
        className="flex items-center gap-4 px-4 py-2 border-b border-border bg-card/80 backdrop-blur"
        data-ocid="trainer.top_bar"
      >
        <div className="text-xs text-muted-foreground whitespace-nowrap font-mono">
          Рука {handNum}/{totalHands}
        </div>
        <div className="flex-1">
          <TimerBar
            key={handNum}
            decisionSeconds={20}
            bankSeconds={90}
            active={phase === "play" && timerActive}
            onTimeout={handleTimeout}
          />
        </div>
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {current.spot.heroPosition} vs {current.spot.villainPosition}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-auto gap-0">
        {/* Poker table area */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 gap-4 min-w-0">
          {/* Table oval */}
          <div
            className="relative w-full max-w-lg"
            data-ocid="trainer.poker_table"
          >
            <div
              className="relative rounded-[50%] border-4 border-[#1a4a2e] shadow-2xl overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse at center, #1a3d2a 0%, #0f2a1d 60%, #0a1f15 100%)",
                paddingTop: "52%",
              }}
            >
              {/* Felt texture ring */}
              <div className="absolute inset-2 rounded-[50%] border border-[#22593a]/40" />

              {/* Positions */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Villain position label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    {current.spot.villainPosition}
                  </span>
                </div>

                {/* Pot + board */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-center">
                    <BoardDisplay cards={current.spot.board} size="sm" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">
                      Банк
                    </span>
                    <span className="text-sm font-bold font-mono text-[#f5c842]">
                      {current.spot.potBb}bb
                    </span>
                  </div>
                </div>

                {/* Hero position label */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    {current.spot.heroPosition} (Вы)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero hand */}
          <div
            className="flex flex-col items-center gap-2"
            data-ocid="trainer.hero_hand"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Ваша рука
            </p>
            <div className="flex gap-2">
              {current.heroHand.map((card, i) => {
                const suitColors: Record<string, string> = {
                  h: "bg-red-600",
                  d: "bg-blue-600",
                  c: "bg-emerald-600",
                  s: "bg-[#111111]",
                };
                return (
                  <motion.div
                    key={`${card.rank}-${card.suit}-${i}`}
                    initial={{ y: 30, opacity: 0, rotate: i === 0 ? -8 : 8 }}
                    animate={{ y: 0, opacity: 1, rotate: i === 0 ? -3 : 3 }}
                    transition={{
                      delay: i * 0.12,
                      type: "spring",
                      stiffness: 280,
                    }}
                    className={`w-14 h-20 rounded-lg flex flex-col items-center justify-between p-1.5 border border-white/20 shadow-xl ${
                      suitColors[card.suit] ?? "bg-[#111111]"
                    }`}
                  >
                    <span className="text-white font-black text-sm leading-none self-start">
                      {card.rank}
                    </span>
                    <span className="text-white text-2xl leading-none">
                      {card.suit === "h"
                        ? "♥"
                        : card.suit === "d"
                          ? "♦"
                          : card.suit === "c"
                            ? "♣"
                            : "♠"}
                    </span>
                    <span className="text-white font-black text-sm leading-none self-end rotate-180">
                      {card.rank}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stack info */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest mb-0.5">
                Стек
              </p>
              <p className="font-mono font-bold text-foreground/80">
                {current.spot.stackBb}bb
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest mb-0.5">
                Стрит
              </p>
              <p className="font-mono font-bold text-foreground/80 capitalize">
                {current.spot.street}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest mb-0.5">
                Действие
              </p>
              <p className="font-mono font-bold text-foreground/80 text-[10px] max-w-[100px] truncate">
                {current.spot.action}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <AnimatePresence mode="wait">
            {phase === "play" && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                data-ocid="trainer.action_buttons"
              >
                <ActionButtons onAction={handleAction} size="lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right panel — feedback or range matrix */}
        <div
          className="w-80 shrink-0 border-l border-border bg-card/50 p-4 overflow-auto flex flex-col gap-4"
          data-ocid="trainer.side_panel"
        >
          <AnimatePresence mode="wait">
            {phase === "feedback" && current.userAction && (
              <FeedbackPanel
                key="feedback"
                hand={current}
                onNext={handleNext}
                isLastHand={queue.length === 0}
              />
            )}
          </AnimatePresence>

          {/* Range matrix always visible */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
              Диапазон позиции
            </p>
            <RangeMatrix ranges={afFreqs} compact />
          </div>

          {/* Spot description */}
          <div className="mt-auto rounded-lg bg-muted/30 border border-border p-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
              Сценарий
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {current.spot.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
