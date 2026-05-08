import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUserSettings } from "@/hooks/useBackend";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import type { Language } from "@/lib/i18n";
import {
  CheckCircle2,
  Database,
  Fingerprint,
  Globe,
  SlidersHorizontal,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Per-page translations (self-contained) ─────────────────────────────
const TX = {
  ru: {
    settings: "Настройки",
    language: "Язык",
    languageNote: "Кнопки действий всегда отображаются на английском",
    animationSpeed: "Скорость анимации",
    preferences: "Предпочтения",
    soundEffects: "Звуковые эффекты",
    showHints: "Показывать подсказки",
    evDisplay: "Показывать EV",
    evDetailLevel: "Уровень детализации EV",
    account: "Аккаунт",
    internetIdentity: "Internet Identity",
    guestMode: "Гостевой режим",
    loggedIn: "Авторизован",
    logout: "Выйти",
    data: "Данные",
    resetStats: "Сбросить статистику",
    resetStatsDesc:
      "Это действие удалит все ваши данные о прогрессе и статистике. Отменить невозможно.",
    resetConfirm: "Да, сбросить",
    cancel: "Отмена",
    confirmReset: "Подтвердите сброс",
    saved: "Настройки сохранены",
    errorSave: "Ошибка сохранения",
    low: "НИЗКИЙ",
    high: "ВЫСОКИЙ",
    saving: "Сохранение...",
  },
  en: {
    settings: "Settings",
    language: "Language",
    languageNote: "Action buttons are always displayed in English",
    animationSpeed: "Animation Speed",
    preferences: "Preferences",
    soundEffects: "Sound Effects",
    showHints: "Show Hints",
    evDisplay: "EV Display",
    evDetailLevel: "EV Detail Level",
    account: "Account",
    internetIdentity: "Internet Identity",
    guestMode: "Guest Mode",
    loggedIn: "Logged In",
    logout: "Logout",
    data: "Data",
    resetStats: "Reset Statistics",
    resetStatsDesc:
      "This will permanently delete all your progress data and statistics. This cannot be undone.",
    resetConfirm: "Yes, Reset",
    cancel: "Cancel",
    confirmReset: "Confirm Reset",
    saved: "Settings saved",
    errorSave: "Save error",
    low: "LOW",
    high: "HIGH",
    saving: "Saving...",
  },
} as const;

type TKey = keyof typeof TX.en;
function useTX(lang: Language) {
  return (key: TKey) => TX[lang][key];
}

// ─── Sub-components ───────────────────────────────────────────────────────
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border p-5 space-y-4 bg-card">
      <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest">
        {icon}
        <span>{title}</span>
      </div>
      <div className="border-t border-border/40 pt-4">{children}</div>
    </div>
  );
}

function PillToggle<T extends string>({
  options,
  value,
  onChange,
  ocidPrefix,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ocidPrefix: string;
}) {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-border">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          data-ocid={`${ocidPrefix}.${opt.value}`}
          className={[
            "px-4 py-1.5 text-sm font-semibold transition-smooth",
            value === opt.value
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function SpeedButton({
  speed,
  active,
  onClick,
}: {
  speed: 1 | 2 | 3;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`settings.speed_${speed}`}
      className={[
        "w-14 py-2 rounded-lg text-sm font-bold border transition-smooth",
        active
          ? "border-accent bg-accent/20 text-accent shadow-[0_0_12px_0_oklch(0.62_0.18_142/0.4)]"
          : "border-border bg-secondary text-muted-foreground hover:border-accent/50 hover:text-foreground",
      ].join(" ")}
    >
      {speed}x
    </button>
  );
}

function PrefRow({
  label,
  checked,
  onCheckedChange,
  ocid,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-foreground/80">{label}</span>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        data-ocid={ocid}
        className="data-[state=checked]:bg-accent"
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Settings() {
  const store = useSettingsStore();
  const t = useTX(store.language);
  const { isLoggedIn, principalId, logout } = useAuth();
  const updateSettings = useUpdateUserSettings();
  const [savePending, setSavePending] = useState(false);

  // Sync to backend when logged in (debounced 800ms)
  useEffect(() => {
    if (!isLoggedIn) return;
    const timer = setTimeout(() => {
      setSavePending(true);
      updateSettings.mutate(
        {
          language: store.language,
          animationSpeed: BigInt(store.animationSpeed),
          soundEffects: store.soundEffects,
          showHints: store.showHints,
          evDisplay: store.evDisplay,
          evDetailLevel: store.evDetailLevel,
        },
        {
          onSuccess: () => {
            setSavePending(false);
            toast.success(t("saved"));
          },
          onError: () => {
            setSavePending(false);
            toast.error(t("errorSave"));
          },
        },
      );
    }, 800);
    return () => clearTimeout(timer);
  }, [
    isLoggedIn,
    store.language,
    store.animationSpeed,
    store.soundEffects,
    store.showHints,
    store.evDisplay,
    store.evDetailLevel,
    t,
    updateSettings.mutate,
  ]);

  function handleResetStats() {
    store.resetAll();
    toast.success(t("resetStats"));
  }

  return (
    <div className="min-h-screen bg-background pb-16" data-ocid="settings.page">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">{t("settings")}</h1>
          {savePending && (
            <span
              className="text-xs text-muted-foreground animate-pulse"
              data-ocid="settings.loading_state"
            >
              {t("saving")}
            </span>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* 1 — Language */}
        <Section icon={<Globe size={14} />} title={t("language")}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PillToggle<Language>
              options={[
                { value: "ru", label: "🇷🇺 Русский" },
                { value: "en", label: "🇬🇧 English" },
              ]}
              value={store.language}
              onChange={store.setLanguage}
              ocidPrefix="settings.language"
            />
            <p className="text-xs text-muted-foreground">{t("languageNote")}</p>
          </div>
        </Section>

        {/* 2 — Animation Speed */}
        <Section icon={<Zap size={14} />} title={t("animationSpeed")}>
          <div className="flex gap-3">
            {([1, 2, 3] as const).map((s) => (
              <SpeedButton
                key={s}
                speed={s}
                active={store.animationSpeed === s}
                onClick={() => store.setAnimationSpeed(s)}
              />
            ))}
          </div>
        </Section>

        {/* 3 — Preferences */}
        <Section
          icon={<SlidersHorizontal size={14} />}
          title={t("preferences")}
        >
          <div className="space-y-1 divide-y divide-border/30">
            <PrefRow
              label={t("soundEffects")}
              checked={store.soundEffects}
              onCheckedChange={store.setSoundEffects}
              ocid="settings.sound_effects.switch"
            />
            <PrefRow
              label={t("showHints")}
              checked={store.showHints}
              onCheckedChange={store.setShowHints}
              ocid="settings.show_hints.switch"
            />
            <PrefRow
              label={t("evDisplay")}
              checked={store.evDisplay}
              onCheckedChange={store.setEvDisplay}
              ocid="settings.ev_display.switch"
            />
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground/80">
                {t("evDetailLevel")}
              </span>
              <PillToggle
                options={[
                  { value: "LOW", label: t("low") },
                  { value: "HIGH", label: t("high") },
                ]}
                value={store.evDetailLevel}
                onChange={store.setEvDetailLevel}
                ocidPrefix="settings.ev_detail"
              />
            </div>
          </div>
        </Section>

        {/* 4 — Account */}
        <Section icon={<User size={14} />} title={t("account")}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Fingerprint size={16} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">
                  {t("internetIdentity")}
                </p>
                {isLoggedIn && principalId ? (
                  <p
                    className="text-xs font-mono text-foreground/80 truncate"
                    title={principalId}
                    data-ocid="settings.principal_id"
                  >
                    {principalId}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("guestMode")}
                  </p>
                )}
              </div>
              <Badge
                data-ocid="settings.account_status"
                className={
                  isLoggedIn
                    ? "bg-accent/15 text-accent border-accent/30 shrink-0"
                    : "bg-muted/60 text-muted-foreground border-border shrink-0"
                }
                variant="outline"
              >
                {isLoggedIn ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    {t("loggedIn")}
                  </span>
                ) : (
                  t("guestMode")
                )}
              </Badge>
            </div>

            {isLoggedIn && (
              <button
                type="button"
                onClick={logout}
                data-ocid="settings.logout_button"
                className="w-full py-2 px-4 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/70 transition-smooth"
              >
                {t("logout")}
              </button>
            )}
          </div>
        </Section>

        {/* 5 — Data */}
        <Section icon={<Database size={14} />} title={t("data")}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              {t("resetStatsDesc")}
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  data-ocid="settings.reset_stats.open_modal_button"
                  className="shrink-0 py-2 px-5 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-smooth"
                >
                  {t("resetStats")}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent
                data-ocid="settings.reset_stats.dialog"
                className="bg-card border-border"
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">
                    {t("confirmReset")}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    {t("resetStatsDesc")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    data-ocid="settings.reset_stats.cancel_button"
                    className="border-border bg-secondary text-foreground hover:bg-muted"
                  >
                    {t("cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    data-ocid="settings.reset_stats.confirm_button"
                    onClick={handleResetStats}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t("resetConfirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Section>
      </div>
    </div>
  );
}
