import type { SessionResult } from "@/types";
import { motion } from "motion/react";

interface SessionSummaryProps {
  result: SessionResult;
  onPlayAgain: () => void;
}

export function SessionSummary({ result, onPlayAgain }: SessionSummaryProps) {
  const accuracyColor =
    result.accuracy >= 70
      ? "text-accent"
      : result.accuracy >= 50
        ? "text-amber-400"
        : "text-red-400";

  return (
    <motion.div
      data-ocid="trainer.session_summary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-md mx-auto p-6 rounded-2xl border border-border bg-card space-y-6"
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
          Сессия завершена
        </p>
        <h2 className="text-2xl font-bold text-foreground">Результаты</h2>
      </div>

      {/* Accuracy big number */}
      <div className="text-center py-4">
        <motion.p
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`text-7xl font-black font-mono ${accuracyColor}`}
        >
          {Math.round(result.accuracy)}%
        </motion.p>
        <p className="text-muted-foreground text-sm mt-1">Точность</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Рук сыграно
          </p>
          <p className="text-xl font-bold text-foreground mt-1">
            {result.hands.length}
          </p>
        </div>
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Суммарный EV-лосс
          </p>
          <p
            className={`text-xl font-bold font-mono mt-1 ${result.totalEvLost <= 0 ? "text-red-400" : "text-accent"}`}
          >
            {result.totalEvLost > 0 ? "+" : ""}
            {result.totalEvLost.toFixed(2)}bb
          </p>
        </div>
      </div>

      {/* Biggest mistakes */}
      {result.biggestMistakes.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Крупнейшие ошибки
          </p>
          <div className="space-y-2">
            {result.biggestMistakes.map((m) => (
              <div
                key={m.hand}
                className="flex items-center justify-between rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2"
              >
                <div>
                  <span className="text-sm font-bold text-foreground">
                    {m.hand}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {m.mistake}
                  </span>
                </div>
                <span className="text-sm font-mono font-bold text-red-400">
                  {m.ev.toFixed(2)}bb
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.button
        type="button"
        data-ocid="trainer.play_again_button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPlayAgain}
        className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold text-base tracking-wide transition-smooth"
      >
        Играть ещё
      </motion.button>
    </motion.div>
  );
}

export default SessionSummary;
