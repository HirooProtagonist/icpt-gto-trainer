import { useTranslation } from "@/hooks/useTranslation";
import { Settings } from "lucide-react";

export default function SettingsShell() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4"
      data-ocid="settings.empty_state"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/50 border border-border">
        <Settings className="size-8 text-muted-foreground" />
      </div>
      <h1 className="font-display text-2xl font-bold">{t("navSettings")}</h1>
      <p className="text-muted-foreground max-w-sm">
        Язык, анимации, звуки и другие настройки приложения.
      </p>
    </div>
  );
}
