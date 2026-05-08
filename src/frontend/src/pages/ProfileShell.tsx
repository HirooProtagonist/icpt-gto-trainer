import { useTranslation } from "@/hooks/useTranslation";
import { User } from "lucide-react";

export default function ProfileShell() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4"
      data-ocid="profile.empty_state"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/50 border border-border">
        <User className="size-8 text-muted-foreground" />
      </div>
      <h1 className="font-display text-2xl font-bold">{t("navProfile")}</h1>
      <p className="text-muted-foreground max-w-sm">
        Ваш профиль Internet Identity и статистика.
      </p>
    </div>
  );
}
