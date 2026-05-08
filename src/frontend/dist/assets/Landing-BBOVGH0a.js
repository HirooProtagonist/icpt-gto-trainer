import { c as createLucideIcon, u as useTranslation, a as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, B as BookOpen, C as Cpu } from "./index-Cbhxa_lC.js";
import { m as motion } from "./proxy-0CUfrAz2.js";
import { Z as Zap } from "./zap-Buzp0MjV.js";
import { H as History } from "./history-B4R_rcSy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5", key: "1hfsw2" }],
  ["line", { x1: "13", x2: "19", y1: "19", y2: "13", key: "1vrmhu" }],
  ["line", { x1: "16", x2: "20", y1: "16", y2: "20", key: "1bron3" }],
  ["line", { x1: "19", x2: "21", y1: "21", y2: "19", key: "13pww6" }],
  ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5", key: "hbey2j" }],
  ["line", { x1: "5", x2: "9", y1: "14", y2: "18", key: "1hf58s" }],
  ["line", { x1: "7", x2: "4", y1: "17", y2: "20", key: "pidxm4" }],
  ["line", { x1: "3", x2: "5", y1: "19", y2: "21", key: "1pehsh" }]
];
const Swords = createLucideIcon("swords", __iconNode);
const FEATURES = [
  {
    icon: BookOpen,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    accent: "#10b981",
    titleRu: "Библиотека спотов",
    titleEn: "Spot Library",
    descRu: "10 000+ решённых спотов от префлопа до ривера с детальными диапазонами",
    descEn: "10,000+ solved spots from preflop to river with detailed range charts"
  },
  {
    icon: Swords,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    accent: "#3b82f6",
    titleRu: "Тренажёр GTO",
    titleEn: "GTO Trainer",
    descRu: "Тренируйтесь против оптимальной стратегии и получайте мгновенный фидбек",
    descEn: "Train against optimal strategy and receive instant feedback"
  },
  {
    icon: Cpu,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    accent: "#f59e0b",
    titleRu: "Решатель спотов",
    titleEn: "Spot Solver",
    descRu: "Настройте любой спот — позиции, стеки, борд — и получите GTO рекомендацию",
    descEn: "Configure any spot — positions, stacks, board — and get a GTO recommendation"
  },
  {
    icon: History,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    accent: "#8b5cf6",
    titleRu: "Анализ истории",
    titleEn: "Hand History",
    descRu: "Загружайте руки из PokerStars / GGPoker и находите утечки в своей игре",
    descEn: "Upload hands from PokerStars / GGPoker and find leaks in your game"
  }
];
const STATS = [
  { value: "10 000+", labelRu: "решённых спотов", labelEn: "solved spots" },
  { value: "4", labelRu: "режима тренировки", labelEn: "training modes" },
  { value: "100%", labelRu: "данные в блокчейне", labelEn: "on-chain data" }
];
const TRUST = [
  { icon: Shield, text: "Decentralised" },
  { icon: Zap, text: "Internet Computer" },
  { icon: Lock, text: "Internet Identity" }
];
const SUITS = ["♥", "♦", "♣", "♠"];
const SUIT_COUNT = 20;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
  })
};
function Landing() {
  const { lang, setLang } = useTranslation();
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  const suitItems = Array.from({ length: SUIT_COUNT }, (_, i) => ({
    suit: SUITS[i % 4],
    style: {
      fontSize: `${(i * 7 + 16) % 48 + 16}px`,
      top: `${(i * 17 + 5) % 100}%`,
      left: `${(i * 23 + 3) % 100}%`,
      opacity: 0.03
    }
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background text-foreground overflow-x-hidden",
      "data-ocid": "landing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 overflow-hidden pointer-events-none z-0", children: suitItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute select-none",
            style: { ...item.style, color: "white" },
            children: item.suit
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-20 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm font-mono",
                style: { background: "#00d4aa", color: "#0a0a0f" },
                children: "GTO"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold tracking-tight", children: "ICPT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border", children: "GTO Trainer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-lg border border-border overflow-hidden text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLang("ru"),
                  className: `px-3 py-1.5 transition-colors ${lang === "ru" ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": "landing.lang_ru_toggle",
                  children: "RU"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLang("en"),
                  className: `px-3 py-1.5 transition-colors ${lang === "en" ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": "landing.lang_en_toggle",
                  children: "EN"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => login(),
                disabled: isLoading,
                className: "px-4 py-2 text-sm font-semibold rounded-lg transition-all disabled:opacity-60",
                style: { background: "#00d4aa", color: "#0a0a0f" },
                "data-ocid": "landing.header_login_button",
                children: isLoading ? "..." : "Login"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-20",
            "data-ocid": "landing.hero_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  custom: 0,
                  initial: "hidden",
                  animate: "visible",
                  variants: fadeUp,
                  className: "mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium",
                  style: {
                    borderColor: "#00d4aa44",
                    color: "#00d4aa",
                    background: "#00d4aa0d"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
                    "On-Chain GTO Training"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.h1,
                {
                  custom: 1,
                  initial: "hidden",
                  animate: "visible",
                  variants: fadeUp,
                  className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl",
                  children: lang === "ru" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "Освойте GTO Покер",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00d4aa" }, children: "— В Блокчейне" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "Master GTO Poker",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00d4aa" }, children: "— On-Chain" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  custom: 2,
                  initial: "hidden",
                  animate: "visible",
                  variants: fadeUp,
                  className: "mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed",
                  children: lang === "ru" ? "Тренируйтесь на предрешённых GTO-ситуациях, анализируйте руки и совершенствуйте свою стратегию." : "Train on pre-solved GTO spots, analyze hands, and sharpen your strategy. Your data lives on the blockchain."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  custom: 3,
                  initial: "hidden",
                  animate: "visible",
                  variants: fadeUp,
                  className: "mt-8 flex flex-col sm:flex-row items-center gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => login(),
                        disabled: isLoading,
                        className: "group px-7 py-3.5 text-base font-semibold rounded-xl transition-all disabled:opacity-60 flex items-center gap-2",
                        style: {
                          background: "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)",
                          color: "#0a0a0f",
                          boxShadow: "0 0 32px #00d4aa33"
                        },
                        "data-ocid": "landing.login_cta_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16 }),
                          lang === "ru" ? "Войти через Internet Identity" : "Login with Internet Identity"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => navigate({ to: "/dashboard" }),
                        className: "px-6 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl border border-border/60 hover:border-border transition-all",
                        "data-ocid": "landing.guest_mode_button",
                        children: lang === "ru" ? "Продолжить как гость" : "Continue as guest"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  custom: 4,
                  initial: "hidden",
                  animate: "visible",
                  variants: fadeUp,
                  className: "mt-8 flex items-center gap-6",
                  children: TRUST.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, className: "text-accent" }),
                        text
                      ]
                    },
                    text
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "relative z-10 border-y border-border/50",
            style: { background: "#12121a" },
            "data-ocid": "landing.stats_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4", children: STATS.map(({ value, labelRu, labelEn }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                custom: i,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true },
                variants: fadeUp,
                className: "flex flex-col items-center text-center gap-2",
                "data-ocid": `landing.stat.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display text-2xl sm:text-3xl font-bold",
                      style: { color: "#00d4aa" },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm text-muted-foreground", children: lang === "ru" ? labelRu : labelEn })
                ]
              },
              value
            )) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "relative z-10 py-20 px-6 bg-background",
            "data-ocid": "landing.features_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5 },
                  className: "text-center mb-12",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold tracking-tight", children: lang === "ru" ? "Всё для GTO-покера" : "Everything for GTO Poker" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mt-3 mx-auto h-px w-16",
                        style: {
                          background: "linear-gradient(90deg, transparent, #00d4aa, transparent)"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: FEATURES.map(
                ({ icon: Icon, titleRu, titleEn, descRu, descEn, accent, bg }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    custom: i,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true },
                    variants: fadeUp,
                    className: "group p-6 rounded-2xl border border-border/60 transition-all hover:border-border cursor-default",
                    style: { background: "#12121a" },
                    "data-ocid": `landing.feature.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${bg}`,
                          style: { border: `1px solid ${accent}33` },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22, style: { color: accent } })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: lang === "ru" ? titleRu : titleEn }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: lang === "ru" ? descRu : descEn })
                    ]
                  },
                  titleEn
                )
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "relative z-10 py-20 px-6",
            style: { background: "#12121a" },
            "data-ocid": "landing.cta_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6 },
                className: "max-w-xl mx-auto text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs",
                      style: {
                        background: "#00d4aa12",
                        color: "#00d4aa",
                        border: "1px solid #00d4aa33"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 11 }),
                        "Decentralised & Private"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold mb-4", children: lang === "ru" ? "Начните тренировку сегодня" : "Start Training Today" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => login(),
                      disabled: isLoading,
                      className: "px-8 py-4 text-base font-semibold rounded-xl transition-all disabled:opacity-60",
                      style: {
                        background: "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)",
                        color: "#0a0a0f",
                        boxShadow: "0 0 40px #00d4aa22"
                      },
                      "data-ocid": "landing.cta_login_button",
                      children: lang === "ru" ? "Войти через Internet Identity" : "Login with Internet Identity"
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "relative z-10 border-t border-border/50 px-6 py-8 bg-card/60",
            "data-ocid": "landing.footer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-mono",
                    style: { background: "#00d4aa", color: "#0a0a0f" },
                    children: "GTO"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ICPT — GTO Trainer" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ". Built with love using",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:text-foreground transition-colors",
                    style: { color: "#00d4aa" },
                    children: "caffeine.ai"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  Landing as default
};
