import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import type { Lang } from "@/lib/i18n";

const ANIM_SPEEDS = ["1x", "2x", "3x"];
const EV_DETAILS = ["LOW", "HIGH"];

export default function SettingsPage() {
  const { t, lang, setLang } = useTranslation();
  const { isAuthenticated, identity } = useAuth();
  const principalId = identity?.getPrincipal()?.toString();

  return (
    <div className="p-6 max-w-xl" data-ocid="settings.page">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">
        {t("settingsTitle")}
      </h1>

      <div className="space-y-4">
        {/* Language */}
        <div
          className="rounded-xl border border-border/60 p-5"
          style={{ background: "#12121a" }}
          data-ocid="settings.language.panel"
        >
          <p className="text-sm font-medium text-foreground mb-3">
            {t("settingsLanguage")}
          </p>
          <div className="flex gap-2">
            {(["ru", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-smooth"
                style={{
                  background: lang === l ? "#00d4aa20" : "transparent",
                  color: lang === l ? "#00d4aa" : undefined,
                  border: `1px solid ${lang === l ? "#00d4aa44" : "#ffffff18"}`,
                }}
                data-ocid={`settings.lang_${l}.toggle`}
              >
                {l === "ru"
                  ? "\u0420\u0443\u0441\u0441\u043a\u0438\u0439"
                  : "English"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {lang === "ru"
              ? "\u041a\u043d\u043e\u043f\u043a\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 (FOLD, CALL, RAISE\u2026) \u0432\u0441\u0435\u0433\u0434\u0430 \u043d\u0430 \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u043c"
              : "Action buttons (FOLD, CALL, RAISE\u2026) always in English"}
          </p>
        </div>

        {/* Animation speed */}
        <div
          className="rounded-xl border border-border/60 p-5"
          style={{ background: "#12121a" }}
        >
          <p className="text-sm font-medium text-foreground mb-3">
            {t("settingsAnimation")}
          </p>
          <div className="flex gap-2">
            {ANIM_SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-smooth"
                data-ocid={`settings.anim_${s.replace("x", "")}.toggle`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        {(
          [
            { key: "settingsSound" as const, ocid: "sound" },
            { key: "settingsHints" as const, ocid: "hints" },
            { key: "settingsEVDisplay" as const, ocid: "ev_display" },
          ] as {
            key: "settingsSound" | "settingsHints" | "settingsEVDisplay";
            ocid: string;
          }[]
        ).map(({ key, ocid }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-border/60 px-5 py-4"
            style={{ background: "#12121a" }}
          >
            <span className="text-sm text-foreground">{t(key)}</span>
            <button
              type="button"
              className="w-10 h-6 rounded-full border border-border/60 bg-secondary transition-smooth relative"
              data-ocid={`settings.${ocid}.switch`}
            >
              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-muted-foreground transition-smooth" />
            </button>
          </div>
        ))}

        {/* EV Detail */}
        <div
          className="rounded-xl border border-border/60 p-5"
          style={{ background: "#12121a" }}
        >
          <p className="text-sm font-medium text-foreground mb-3">
            {t("settingsEVDetail")}
          </p>
          <div className="flex gap-2">
            {EV_DETAILS.map((d) => (
              <button
                key={d}
                type="button"
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-smooth"
                data-ocid={`settings.ev_detail_${d.toLowerCase()}.toggle`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Account */}
        {isAuthenticated && (
          <div
            className="rounded-xl border border-border/60 p-5"
            style={{ background: "#12121a" }}
            data-ocid="settings.account.panel"
          >
            <p className="text-sm font-medium text-foreground mb-3">
              {t("settingsAccount")}
            </p>
            <p className="text-xs text-muted-foreground font-mono break-all mb-3">
              {principalId}
            </p>
            <button
              type="button"
              className="text-xs px-4 py-2 rounded-lg border transition-smooth"
              style={{
                borderColor: "#e54b4b44",
                color: "#e54b4b",
                background: "#e54b4b0d",
              }}
              data-ocid="settings.reset_stats.button"
            >
              {t("settingsReset")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
