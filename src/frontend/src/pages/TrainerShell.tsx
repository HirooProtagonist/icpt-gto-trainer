import { useTranslation } from "@/hooks/useTranslation";
import { Swords } from "lucide-react";

export default function TrainerShell() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4"
      data-ocid="trainer.empty_state"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">
        <Swords className="size-8 text-blue-400" />
      </div>
      <h1 className="font-display text-2xl font-bold">{t("navTrainer")}</h1>
      <p className="text-muted-foreground max-w-sm">
        Тренажёр GTO — тренируйте принятие решений против оптимальной стратегии.
      </p>
    </div>
  );
}
