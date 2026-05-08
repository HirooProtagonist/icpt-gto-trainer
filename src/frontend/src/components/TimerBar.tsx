import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TimerBarProps {
  decisionSeconds: number; // 20s per decision
  bankSeconds: number; // 90s bank
  active: boolean;
  onTimeout: () => void;
}

export function TimerBar({
  decisionSeconds,
  bankSeconds,
  active,
  onTimeout,
}: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(decisionSeconds);
  const [bankLeft, setBankLeft] = useState(bankSeconds);
  const [usingBank, setUsingBank] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTimeLeft(decisionSeconds);
    setUsingBank(false);
  }, [decisionSeconds]);

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        // Decision time expired, use bank
        setUsingBank(true);
        setBankLeft((bank) => {
          if (bank > 1) return bank - 1;
          // Bank exhausted
          onTimeout();
          return 0;
        });
        return 0;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, onTimeout]);

  const displayTime = usingBank ? bankLeft : timeLeft;
  const maxTime = usingBank ? bankSeconds : decisionSeconds;
  const pct = (displayTime / maxTime) * 100;
  const isCritical = displayTime <= 5;

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
        <span
          className={
            isCritical
              ? "text-red-400 font-bold animate-pulse"
              : "text-foreground/70"
          }
        >
          {usingBank ? "Банк" : "Таймер"}: {displayTime}с
        </span>
      </div>
      <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-colors duration-300 ${isCritical ? "bg-red-500" : usingBank ? "bg-amber-500" : "bg-accent"}`}
          initial={{ width: "100%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </div>
      {bankLeft > 0 && (
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          Банк: {bankLeft}с
        </div>
      )}
    </div>
  );
}

export default TimerBar;
