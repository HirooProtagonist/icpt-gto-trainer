import { useTranslation } from "@/hooks/useTranslation";
import { History } from "lucide-react";

export default function HandHistoryShell() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4"
      data-ocid="hand-history.empty_state"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
        <History className="size-8 text-purple-400" />
      </div>
      <h1 className="font-display text-2xl font-bold">{t("navHistory")}</h1>
      <p className="text-muted-foreground max-w-sm">
        Загружайте руки из PokerStars / GGPoker и получайте анализ ошибок.
      </p>
    </div>
  );
}
