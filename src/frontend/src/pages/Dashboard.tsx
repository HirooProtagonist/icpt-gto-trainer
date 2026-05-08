import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Cpu, Target, TrendingUp, Zap } from "lucide-react";

const MODULE_CARDS = [
  {
    href: "/library",
    icon: BookOpen,
    titleKey: "navLibrary" as const,
    descKey: "featureLibraryDesc" as const,
    accent: "#00d4aa",
  },
  {
    href: "/trainer",
    icon: Target,
    titleKey: "navTrainer" as const,
    descKey: "featureTrainerDesc" as const,
    accent: "#f5c842",
  },
  {
    href: "/solver",
    icon: Cpu,
    titleKey: "navSolver" as const,
    descKey: "featureSolverDesc" as const,
    accent: "#a78bfa",
  },
  {
    href: "/hand-history",
    icon: Clock,
    titleKey: "navHistory" as const,
    descKey: "featureHistoryDesc" as const,
    accent: "#e54b4b",
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, identity } = useAuth();

  const userId = identity?.getPrincipal()?.toString()?.slice(0, 8);

  return (
    <div className="p-6 space-y-8" data-ocid="dashboard.page">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t("dashWelcome")}
            {isAuthenticated && userId ? `, ${userId}\u2026` : ""}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("dashQuickStart")}
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: isAuthenticated ? "#00d4aa18" : "#f5c84218",
            color: isAuthenticated ? "#00d4aa" : "#f5c842",
            border: `1px solid ${isAuthenticated ? "#00d4aa33" : "#f5c84233"}`,
          }}
        >
          <Zap size={11} />
          {isAuthenticated ? "On-Chain" : "Guest"}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: t("dashSessions"),
            value: "0",
            icon: Target,
            color: "#00d4aa",
          },
          {
            label: t("dashAccuracy"),
            value: "\u2014%",
            icon: TrendingUp,
            color: "#f5c842",
          },
          {
            label: t("dashEVSaved"),
            value: "0 bb",
            icon: Zap,
            color: "#a78bfa",
          },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: stable stat list
            key={i}
            className="rounded-xl p-4 border border-border/60"
            style={{ background: "#12121a" }}
            data-ocid={`dashboard.stat.${i + 1}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} style={{ color }} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className="font-display text-xl font-bold text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div>
        <h2 className="font-display text-base font-semibold mb-4 text-foreground">
          {t("dashQuickStart")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODULE_CARDS.map(
            ({ href, icon: Icon, titleKey, descKey, accent }) => (
              <Link
                key={href}
                to={href}
                className="flex items-start gap-4 p-5 rounded-xl border border-border/60 transition-smooth hover:border-border"
                style={{ background: "#12121a" }}
                data-ocid={`dashboard.module_${titleKey.replace("nav", "").toLowerCase()}.card`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${accent}18`,
                    border: `1px solid ${accent}33`,
                  }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground mb-1">
                    {t(titleKey)}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(descKey)}
                  </p>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="font-display text-base font-semibold mb-4 text-foreground">
          {t("dashRecentActivity")}
        </h2>
        <div
          className="rounded-xl border border-border/60 p-8 text-center"
          style={{ background: "#12121a" }}
          data-ocid="dashboard.activity.empty_state"
        >
          <Clock size={28} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t("dashNoActivity")}</p>
        </div>
      </div>
    </div>
  );
}
