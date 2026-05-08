import type { TrainerHand } from "@/types";
import { motion } from "motion/react";

const ACTION_LABELS: Record<string, string> = {
  fold: "FOLD",
  check: "CHECK",
  call: "CALL",
  raise: "RAISE",
  allin: "ALL-IN",
};

const ACTION_COLORS: Record<string, string> = {
  fold: "text-red-400",
  check: "text-slate-300",
  call: "text-blue-400",
  raise: "text-amber-400",
  allin: "text-yellow-400",
};

interface FeedbackPanelProps {
  hand: TrainerHand;
  onNext: () => void;
  isLastHand?: boolean;
}

export function FeedbackPanel({
  hand,
  onNext,
  isLastHand = false,
}: FeedbackPanelProps) {
  const isCorrect = hand.userAction === hand.gtoAction;
  const evDelta = hand.evDelta;
  const evPositive = evDelta >= 0;

  return (
    <motion.div
      data-ocid="trainer.feedback_panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-xl border border-border bg-card/90 backdrop-blur p-4 space-y-4"
    >
      {/* Result banner */}
      <div
        className={`rounded-lg p-3 flex items-center gap-3 ${isCorrect ? "bg-accent/15 border border-accent/30" : "bg-destructive/15 border border-destructive/30"}`}
      >
        <span
          className={`text-2xl ${isCorrect ? "text-accent" : "text-destructive"}`}
        >
          {isCorrect ? "✓" : "✗"}
        </span>
        <div>
          <p
            className={`font-bold text-sm ${isCorrect ? "text-accent" : "text-destructive"}`}
          >
            {isCorrect ? "Правильно!" : "Ошибка"}
          </p>
          <p className="text-xs text-muted-foreground">
            Ваш выбор:{" "}
            <span
              className={`font-bold ${ACTION_COLORS[hand.userAction ?? "fold"]}`}
            >
              {ACTION_LABELS[hand.userAction ?? "fold"]}
            </span>
          </p>
        </div>
        {/* EV indicator */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="ml-auto text-right"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            EV
          </p>
          <p
            className={`text-lg font-bold font-mono ${evPositive ? "text-accent" : "text-red-400"}`}
          >
            {evPositive ? "+" : ""}
            {evDelta.toFixed(2)}bb
          </p>
        </motion.div>
      </div>

      {/* GTO recommendation */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          GTO Рекомендация
        </p>
        <div className="flex flex-wrap gap-2">
          {hand.gtoFreqs.map(({ action, freq }) => (
            <div
              key={action}
              className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs font-bold bg-card border border-border ${ACTION_COLORS[action]}`}
            >
              <span className="tracking-widest">{ACTION_LABELS[action]}</span>
              <span className="text-foreground/60">
                {Math.round(freq * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Range + Explanation row */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
            Пояснение
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {hand.explanation}
          </p>
        </div>
      </div>

      {/* Next button */}
      <motion.button
        type="button"
        data-ocid="trainer.next_hand_button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-bold tracking-wide transition-smooth hover:opacity-90 active:opacity-80"
      >
        {isLastHand ? "Завершить сессию" : "Следующая рука →"}
      </motion.button>
    </motion.div>
  );
}

export default FeedbackPanel;
