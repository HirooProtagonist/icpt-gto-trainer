import { j as jsxRuntimeExports, r as reactExports } from "./index-Cbhxa_lC.js";
import { B as BoardDisplay } from "./CardDisplay-gvQWxUMu.js";
import { m as motion } from "./proxy-0CUfrAz2.js";
import { R as RangeMatrix } from "./RangeMatrix-CMucO62K.js";
import { S as SAMPLE_SPOTS, H as HERO_HANDS, G as GTO_EXPLANATIONS } from "./sampleData-HgH5VJ6N.js";
import { A as AnimatePresence } from "./index-DgQrPEt6.js";
const ACTIONS = [
  {
    action: "fold",
    label: "FOLD",
    className: "bg-red-600 hover:bg-red-500 active:bg-red-700 border border-red-400/50 text-white shadow-lg shadow-red-900/40"
  },
  {
    action: "check",
    label: "CHECK",
    className: "bg-slate-600 hover:bg-slate-500 active:bg-slate-700 border border-slate-400/50 text-white shadow-lg shadow-slate-900/40"
  },
  {
    action: "call",
    label: "CALL",
    className: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 border border-blue-400/50 text-white shadow-lg shadow-blue-900/40"
  },
  {
    action: "raise",
    label: "RAISE",
    className: "bg-amber-600 hover:bg-amber-500 active:bg-amber-700 border border-amber-400/50 text-white shadow-lg shadow-amber-900/40"
  },
  {
    action: "allin",
    label: "ALL-IN",
    className: "bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-400 hover:to-red-500 active:from-yellow-600 active:to-red-700 border border-yellow-400/50 text-white shadow-lg shadow-red-900/40"
  }
];
const SIZE_CLASSES = {
  sm: "text-xs font-bold px-2 py-1.5 rounded",
  md: "text-sm font-bold px-3 py-2 rounded-md",
  lg: "text-base font-bold px-5 py-3 rounded-lg"
};
function ActionButtons({
  onAction,
  availableActions,
  disabled = false,
  size = "md"
}) {
  const actions = ACTIONS.filter(
    (a) => !availableActions || availableActions.includes(a.action)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: actions.map(({ action, label, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": `trainer.action_${action}_button`,
      disabled,
      onClick: () => onAction(action),
      className: `${SIZE_CLASSES[size]} ${className} transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed tracking-widest uppercase`,
      children: label
    },
    action
  )) });
}
const ACTION_LABELS = {
  fold: "FOLD",
  check: "CHECK",
  call: "CALL",
  raise: "RAISE",
  allin: "ALL-IN"
};
const ACTION_COLORS = {
  fold: "text-red-400",
  check: "text-slate-300",
  call: "text-blue-400",
  raise: "text-amber-400",
  allin: "text-yellow-400"
};
function FeedbackPanel({
  hand,
  onNext,
  isLastHand = false
}) {
  const isCorrect = hand.userAction === hand.gtoAction;
  const evDelta = hand.evDelta;
  const evPositive = evDelta >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "trainer.feedback_panel",
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, ease: "easeOut" },
      className: "rounded-xl border border-border bg-card/90 backdrop-blur p-4 space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-lg p-3 flex items-center gap-3 ${isCorrect ? "bg-accent/15 border border-accent/30" : "bg-destructive/15 border border-destructive/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-2xl ${isCorrect ? "text-accent" : "text-destructive"}`,
                  children: isCorrect ? "✓" : "✗"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-bold text-sm ${isCorrect ? "text-accent" : "text-destructive"}`,
                    children: isCorrect ? "Правильно!" : "Ошибка"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Ваш выбор:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-bold ${ACTION_COLORS[hand.userAction ?? "fold"]}`,
                      children: ACTION_LABELS[hand.userAction ?? "fold"]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { scale: 0.5, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.2, type: "spring" },
                  className: "ml-auto text-right",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "EV" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: `text-lg font-bold font-mono ${evPositive ? "text-accent" : "text-red-400"}`,
                        children: [
                          evPositive ? "+" : "",
                          evDelta.toFixed(2),
                          "bb"
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-2", children: "GTO Рекомендация" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: hand.gtoFreqs.map(({ action, freq }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-1.5 rounded px-2 py-1 text-xs font-bold bg-card border border-border ${ACTION_COLORS[action]}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-widest", children: ACTION_LABELS[action] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60", children: [
                  Math.round(freq * 100),
                  "%"
                ] })
              ]
            },
            action
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1.5", children: "Пояснение" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: hand.explanation })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "data-ocid": "trainer.next_hand_button",
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: onNext,
            className: "w-full py-3 rounded-lg bg-accent text-accent-foreground font-bold tracking-wide transition-smooth hover:opacity-90 active:opacity-80",
            children: isLastHand ? "Завершить сессию" : "Следующая рука →"
          }
        )
      ]
    }
  );
}
function SessionSummary({ result, onPlayAgain }) {
  const accuracyColor = result.accuracy >= 70 ? "text-accent" : result.accuracy >= 50 ? "text-amber-400" : "text-red-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "trainer.session_summary",
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "max-w-md mx-auto p-6 rounded-2xl border border-border bg-card space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground uppercase tracking-widest mb-1", children: "Сессия завершена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Результаты" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { scale: 0.3, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: 0.2, type: "spring", stiffness: 200 },
              className: `text-7xl font-black font-mono ${accuracyColor}`,
              children: [
                Math.round(result.accuracy),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Точность" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Рук сыграно" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground mt-1", children: result.hands.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Суммарный EV-лосс" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-xl font-bold font-mono mt-1 ${result.totalEvLost <= 0 ? "text-red-400" : "text-accent"}`,
                children: [
                  result.totalEvLost > 0 ? "+" : "",
                  result.totalEvLost.toFixed(2),
                  "bb"
                ]
              }
            )
          ] })
        ] }),
        result.biggestMistakes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-2", children: "Крупнейшие ошибки" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: result.biggestMistakes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: m.hand }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: m.mistake })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono font-bold text-red-400", children: [
                  m.ev.toFixed(2),
                  "bb"
                ] })
              ]
            },
            m.hand
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "data-ocid": "trainer.play_again_button",
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: onPlayAgain,
            className: "w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold text-base tracking-wide transition-smooth",
            children: "Играть ещё"
          }
        )
      ]
    }
  );
}
function TimerBar({
  decisionSeconds,
  bankSeconds,
  active,
  onTimeout
}) {
  const [timeLeft, setTimeLeft] = reactExports.useState(decisionSeconds);
  const [bankLeft, setBankLeft] = reactExports.useState(bankSeconds);
  const [usingBank, setUsingBank] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setTimeLeft(decisionSeconds);
    setUsingBank(false);
  }, [decisionSeconds]);
  reactExports.useEffect(() => {
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        setUsingBank(true);
        setBankLeft((bank) => {
          if (bank > 1) return bank - 1;
          onTimeout();
          return 0;
        });
        return 0;
      });
    }, 1e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, onTimeout]);
  const displayTime = usingBank ? bankLeft : timeLeft;
  const maxTime = usingBank ? bankSeconds : decisionSeconds;
  const pct = displayTime / maxTime * 100;
  const isCritical = displayTime <= 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: isCritical ? "text-red-400 font-bold animate-pulse" : "text-foreground/70",
        children: [
          usingBank ? "Банк" : "Таймер",
          ": ",
          displayTime,
          "с"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `h-full rounded-full transition-colors duration-300 ${isCritical ? "bg-red-500" : usingBank ? "bg-amber-500" : "bg-accent"}`,
        initial: { width: "100%" },
        animate: { width: `${pct}%` },
        transition: { duration: 0.9, ease: "linear" }
      }
    ) }),
    bankLeft > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
      "Банк: ",
      bankLeft,
      "с"
    ] })
  ] });
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function deriveGtoAction(spot) {
  const rangeSlice = spot.range.slice(0, 20);
  const avgBet = rangeSlice.reduce((s, c) => s + c.betFreq, 0) / rangeSlice.length;
  const avgCall = rangeSlice.reduce((s, c) => s + c.callFreq, 0) / rangeSlice.length;
  const avgFold = rangeSlice.reduce((s, c) => s + c.foldFreq, 0) / rangeSlice.length;
  if (avgBet >= avgCall && avgBet >= avgFold) return "raise";
  if (avgCall >= avgFold) return "call";
  return "fold";
}
function buildGtoFreqs(gtoAction) {
  const map = {
    raise: [
      { action: "raise", freq: 0.67 },
      { action: "check", freq: 0.33 }
    ],
    call: [
      { action: "call", freq: 0.58 },
      { action: "fold", freq: 0.42 }
    ],
    check: [
      { action: "check", freq: 0.72 },
      { action: "fold", freq: 0.28 }
    ],
    fold: [
      { action: "fold", freq: 0.85 },
      { action: "call", freq: 0.15 }
    ],
    allin: [{ action: "allin", freq: 1 }]
  };
  return map[gtoAction];
}
function buildHand(spot) {
  const heroHand = pickRandom(HERO_HANDS);
  const gtoAction = deriveGtoAction(spot);
  return {
    spot,
    heroHand,
    userAction: null,
    gtoAction,
    gtoFreqs: buildGtoFreqs(gtoAction),
    evDelta: 0,
    explanation: GTO_EXPLANATIONS[gtoAction] ?? GTO_EXPLANATIONS.fold
  };
}
function calcEvDelta(userAction, gtoAction) {
  if (userAction === gtoAction) return +(Math.random() * 0.4 + 0.1).toFixed(2);
  return -(Math.random() * 2.5 + 0.3).toFixed(2);
}
function buildSessionResult(hands) {
  const correct = hands.filter((h) => h.userAction === h.gtoAction).length;
  const accuracy = hands.length ? correct / hands.length * 100 : 0;
  const totalEvLost = hands.reduce((s, h) => s + h.evDelta, 0);
  const mistakes = hands.filter((h) => h.userAction !== h.gtoAction).slice(0, 3).map((h) => {
    var _a;
    return {
      hand: `${h.heroHand[0].rank}${h.heroHand[0].suit}${h.heroHand[1].rank}${h.heroHand[1].suit}`,
      mistake: `${((_a = h.userAction) == null ? void 0 : _a.toUpperCase()) ?? "?"} (GTO: ${h.gtoAction.toUpperCase()})`,
      ev: h.evDelta
    };
  });
  return { hands, accuracy, totalEvLost, biggestMistakes: mistakes };
}
function rangeToActionFrequency(spot) {
  return spot.range.map((cell) => ({
    bet: cell.betFreq,
    call: cell.callFreq,
    fold: cell.foldFreq,
    check: Math.max(0, 1 - cell.betFreq - cell.callFreq - cell.foldFreq),
    raise: 0
  }));
}
const MODES = [
  { id: "single", label: "1 рука", count: 1 },
  { id: "random", label: "Случайная", count: 1 },
  { id: "session5", label: "5 рук", count: 5 },
  { id: "session10", label: "10 рук", count: 10 },
  { id: "session20", label: "20 рук", count: 20 }
];
function Trainer() {
  const [mode, setMode] = reactExports.useState("session5");
  const [phase, setPhase] = reactExports.useState("setup");
  const [queue, setQueue] = reactExports.useState([]);
  const [current, setCurrent] = reactExports.useState(null);
  const [played, setPlayed] = reactExports.useState([]);
  const [timerActive, setTimerActive] = reactExports.useState(false);
  const [sessionResult, setSessionResult] = reactExports.useState(
    null
  );
  const modeConfig = reactExports.useMemo(
    () => MODES.find((m) => m.id === mode) ?? MODES[0],
    [mode]
  );
  const startSession = reactExports.useCallback(() => {
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
  const handleAction = reactExports.useCallback(
    (action) => {
      if (!current) return;
      setTimerActive(false);
      const evDelta = calcEvDelta(action, current.gtoAction);
      const updated = {
        ...current,
        userAction: action,
        evDelta
      };
      setCurrent(updated);
      setPhase("feedback");
    },
    [current]
  );
  const handleTimeout = reactExports.useCallback(() => {
    handleAction("fold");
  }, [handleAction]);
  const handleNext = reactExports.useCallback(() => {
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
  const handlePlayAgain = reactExports.useCallback(() => {
    setPhase("setup");
    setQueue([]);
    setCurrent(null);
    setPlayed([]);
    setSessionResult(null);
  }, []);
  const totalHands = modeConfig.count ?? 1;
  const handNum = played.length + 1;
  if (phase === "setup") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto", "data-ocid": "trainer.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-1", children: "Тренажёр" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Отрабатывайте GTO-решения в режиме реального времени" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-3", children: "Режим тренировки" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "trainer.mode_select", children: MODES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `trainer.mode_${m.id}`,
            onClick: () => setMode(m.id),
            className: `px-4 py-2 rounded-lg text-sm font-semibold border transition-smooth ${mode === m.id ? "border-accent bg-accent/15 text-accent" : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"}`,
            children: m.label
          },
          m.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          "data-ocid": "trainer.start_button",
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97 },
          onClick: startSession,
          className: "w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg tracking-wide shadow-lg transition-smooth",
          children: "Начать сессию"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
        { icon: "⏱", title: "20 секунд", desc: "на каждое решение" },
        {
          icon: "🏦",
          title: "Тайм-банк 90с",
          desc: "автоматически при таймауте"
        },
        {
          icon: "📊",
          title: "GTO анализ",
          desc: "мгновенная обратная связь"
        }
      ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-4 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: tip.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: tip.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: tip.desc })
          ]
        },
        tip.title
      )) })
    ] });
  }
  if (phase === "summary" && sessionResult) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", "data-ocid": "trainer.page", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionSummary, { result: sessionResult, onPlayAgain: handlePlayAgain }) });
  }
  if (!current) return null;
  const afFreqs = rangeToActionFrequency(current.spot);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "trainer.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 px-4 py-2 border-b border-border bg-card/80 backdrop-blur",
        "data-ocid": "trainer.top_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground whitespace-nowrap font-mono", children: [
            "Рука ",
            handNum,
            "/",
            totalHands
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TimerBar,
            {
              decisionSeconds: 20,
              bankSeconds: 90,
              active: phase === "play" && timerActive,
              onTimeout: handleTimeout
            },
            handNum
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
            current.spot.heroPosition,
            " vs ",
            current.spot.villainPosition
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-auto gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-start p-4 gap-4 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative w-full max-w-lg",
            "data-ocid": "trainer.poker_table",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative rounded-[50%] border-4 border-[#1a4a2e] shadow-2xl overflow-hidden",
                style: {
                  background: "radial-gradient(ellipse at center, #1a3d2a 0%, #0f2a1d 60%, #0a1f15 100%)",
                  paddingTop: "52%"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-[50%] border border-[#22593a]/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-1/2 -translate-x-1/2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 uppercase tracking-widest", children: current.spot.villainPosition }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BoardDisplay, { cards: current.spot.board, size: "sm" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 uppercase tracking-widest", children: "Банк" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold font-mono text-[#f5c842]", children: [
                          current.spot.potBb,
                          "bb"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-1/2 -translate-x-1/2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/40 uppercase tracking-widest", children: [
                      current.spot.heroPosition,
                      " (Вы)"
                    ] }) })
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2",
            "data-ocid": "trainer.hero_hand",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Ваша рука" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: current.heroHand.map((card, i) => {
                const suitColors = {
                  h: "bg-red-600",
                  d: "bg-blue-600",
                  c: "bg-emerald-600",
                  s: "bg-[#111111]"
                };
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { y: 30, opacity: 0, rotate: i === 0 ? -8 : 8 },
                    animate: { y: 0, opacity: 1, rotate: i === 0 ? -3 : 3 },
                    transition: {
                      delay: i * 0.12,
                      type: "spring",
                      stiffness: 280
                    },
                    className: `w-14 h-20 rounded-lg flex flex-col items-center justify-between p-1.5 border border-white/20 shadow-xl ${suitColors[card.suit] ?? "bg-[#111111]"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black text-sm leading-none self-start", children: card.rank }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-2xl leading-none", children: card.suit === "h" ? "♥" : card.suit === "d" ? "♦" : card.suit === "c" ? "♣" : "♠" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black text-sm leading-none self-end rotate-180", children: card.rank })
                    ]
                  },
                  `${card.rank}-${card.suit}-${i}`
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest mb-0.5", children: "Стек" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-foreground/80", children: [
              current.spot.stackBb,
              "bb"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest mb-0.5", children: "Стрит" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-foreground/80 capitalize", children: current.spot.street })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest mb-0.5", children: "Действие" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-foreground/80 text-[10px] max-w-[100px] truncate", children: current.spot.action })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: phase === "play" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.25 },
            "data-ocid": "trainer.action_buttons",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButtons, { onAction: handleAction, size: "lg" })
          },
          "actions"
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-80 shrink-0 border-l border-border bg-card/50 p-4 overflow-auto flex flex-col gap-4",
          "data-ocid": "trainer.side_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: phase === "feedback" && current.userAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeedbackPanel,
              {
                hand: current,
                onNext: handleNext,
                isLastHand: queue.length === 0
              },
              "feedback"
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mb-2", children: "Диапазон позиции" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RangeMatrix, { ranges: afFreqs, compact: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto rounded-lg bg-muted/30 border border-border p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mb-1", children: "Сценарий" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed", children: current.spot.description })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Trainer as default
};
