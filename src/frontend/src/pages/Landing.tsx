import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Cpu,
  History,
  Lock,
  Shield,
  Sparkles,
  Swords,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: BookOpen,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    accent: "#10b981",
    titleRu: "Библиотека спотов",
    titleEn: "Spot Library",
    descRu:
      "10 000+ решённых спотов от префлопа до ривера с детальными диапазонами",
    descEn:
      "10,000+ solved spots from preflop to river with detailed range charts",
  },
  {
    icon: Swords,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    accent: "#3b82f6",
    titleRu: "Тренажёр GTO",
    titleEn: "GTO Trainer",
    descRu:
      "Тренируйтесь против оптимальной стратегии и получайте мгновенный фидбек",
    descEn: "Train against optimal strategy and receive instant feedback",
  },
  {
    icon: Cpu,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    accent: "#f59e0b",
    titleRu: "Решатель спотов",
    titleEn: "Spot Solver",
    descRu:
      "Настройте любой спот — позиции, стеки, борд — и получите GTO рекомендацию",
    descEn:
      "Configure any spot — positions, stacks, board — and get a GTO recommendation",
  },
  {
    icon: History,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    accent: "#8b5cf6",
    titleRu: "Анализ истории",
    titleEn: "Hand History",
    descRu:
      "Загружайте руки из PokerStars / GGPoker и находите утечки в своей игре",
    descEn:
      "Upload hands from PokerStars / GGPoker and find leaks in your game",
  },
];

const STATS = [
  { value: "10 000+", labelRu: "решённых спотов", labelEn: "solved spots" },
  { value: "4", labelRu: "режима тренировки", labelEn: "training modes" },
  { value: "100%", labelRu: "данные в блокчейне", labelEn: "on-chain data" },
];

const TRUST = [
  { icon: Shield, text: "Decentralised" },
  { icon: Zap, text: "Internet Computer" },
  { icon: Lock, text: "Internet Identity" },
];

const SUITS = ["\u2665", "\u2666", "\u2663", "\u2660"];
const SUIT_COUNT = 20;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Landing() {
  const { lang, setLang } = useTranslation();
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const suitItems = Array.from({ length: SUIT_COUNT }, (_, i) => ({
    suit: SUITS[i % 4],
    style: {
      fontSize: `${((i * 7 + 16) % 48) + 16}px`,
      top: `${(i * 17 + 5) % 100}%`,
      left: `${(i * 23 + 3) % 100}%`,
      opacity: 0.03,
    } as React.CSSProperties,
  }));

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      data-ocid="landing.page"
    >
      {/* Background floating suits */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {suitItems.map((item, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: stable decorative list
            key={i}
            className="absolute select-none"
            style={{ ...item.style, color: "white" }}
          >
            {item.suit}
          </span>
        ))}
      </div>

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm font-mono"
            style={{ background: "#00d4aa", color: "#0a0a0f" }}
          >
            GTO
          </div>
          <span className="font-display font-semibold tracking-tight">
            ICPT
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border">
            GTO Trainer
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setLang("ru")}
              className={`px-3 py-1.5 transition-colors ${lang === "ru" ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}
              data-ocid="landing.lang_ru_toggle"
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}
              data-ocid="landing.lang_en_toggle"
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-all disabled:opacity-60"
            style={{ background: "#00d4aa", color: "#0a0a0f" }}
            data-ocid="landing.header_login_button"
          >
            {isLoading ? "..." : "Login"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-20"
        data-ocid="landing.hero_section"
      >
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium"
          style={{
            borderColor: "#00d4aa44",
            color: "#00d4aa",
            background: "#00d4aa0d",
          }}
        >
          <Sparkles size={12} />
          On-Chain GTO Training
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl"
        >
          {lang === "ru" ? (
            <>
              Освойте GTO Покер{" "}
              <span style={{ color: "#00d4aa" }}>— В Блокчейне</span>
            </>
          ) : (
            <>
              Master GTO Poker{" "}
              <span style={{ color: "#00d4aa" }}>— On-Chain</span>
            </>
          )}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          {lang === "ru"
            ? "Тренируйтесь на предрешённых GTO-ситуациях, анализируйте руки и совершенствуйте свою стратегию."
            : "Train on pre-solved GTO spots, analyze hands, and sharpen your strategy. Your data lives on the blockchain."}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoading}
            className="group px-7 py-3.5 text-base font-semibold rounded-xl transition-all disabled:opacity-60 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)",
              color: "#0a0a0f",
              boxShadow: "0 0 32px #00d4aa33",
            }}
            data-ocid="landing.login_cta_button"
          >
            <Lock size={16} />
            {lang === "ru"
              ? "Войти через Internet Identity"
              : "Login with Internet Identity"}
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="px-6 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl border border-border/60 hover:border-border transition-all"
            data-ocid="landing.guest_mode_button"
          >
            {lang === "ru" ? "Продолжить как гость" : "Continue as guest"}
          </button>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex items-center gap-6"
        >
          {TRUST.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Icon size={13} className="text-accent" />
              {text}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Stats bar */}
      <section
        className="relative z-10 border-y border-border/50"
        style={{ background: "#12121a" }}
        data-ocid="landing.stats_section"
      >
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4">
          {STATS.map(({ value, labelRu, labelEn }, i) => (
            <motion.div
              key={value}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center text-center gap-2"
              data-ocid={`landing.stat.${i + 1}`}
            >
              <span
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{ color: "#00d4aa" }}
              >
                {value}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {lang === "ru" ? labelRu : labelEn}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        className="relative z-10 py-20 px-6 bg-background"
        data-ocid="landing.features_section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {lang === "ru"
                ? "Всё для GTO-покера"
                : "Everything for GTO Poker"}
            </h2>
            <div
              className="mt-3 mx-auto h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00d4aa, transparent)",
              }}
            />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(
              (
                { icon: Icon, titleRu, titleEn, descRu, descEn, accent, bg },
                i,
              ) => (
                <motion.div
                  key={titleEn}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group p-6 rounded-2xl border border-border/60 transition-all hover:border-border cursor-default"
                  style={{ background: "#12121a" }}
                  data-ocid={`landing.feature.${i + 1}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${bg}`}
                    style={{ border: `1px solid ${accent}33` }}
                  >
                    <Icon size={22} style={{ color: accent }} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {lang === "ru" ? titleRu : titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lang === "ru" ? descRu : descEn}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative z-10 py-20 px-6"
        style={{ background: "#12121a" }}
        data-ocid="landing.cta_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{
              background: "#00d4aa12",
              color: "#00d4aa",
              border: "1px solid #00d4aa33",
            }}
          >
            <Shield size={11} />
            Decentralised &amp; Private
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            {lang === "ru"
              ? "Начните тренировку сегодня"
              : "Start Training Today"}
          </h2>
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoading}
            className="px-8 py-4 text-base font-semibold rounded-xl transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)",
              color: "#0a0a0f",
              boxShadow: "0 0 40px #00d4aa22",
            }}
            data-ocid="landing.cta_login_button"
          >
            {lang === "ru"
              ? "Войти через Internet Identity"
              : "Login with Internet Identity"}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 border-t border-border/50 px-6 py-8 bg-card/60"
        data-ocid="landing.footer"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-mono"
              style={{ background: "#00d4aa", color: "#0a0a0f" }}
            >
              GTO
            </div>
            <span>ICPT &mdash; GTO Trainer</span>
          </div>
          <span>
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              style={{ color: "#00d4aa" }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
