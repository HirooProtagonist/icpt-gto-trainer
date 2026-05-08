import { useTranslation } from "@/hooks/useTranslation";
import { Cpu } from "lucide-react";

export default function SolverShell() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4"
      data-ocid="solver.empty_state"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <Cpu className="size-8 text-amber-400" />
      </div>
      <h1 className="font-display text-2xl font-bold">{t("navSolver")}</h1>
      <p className="text-muted-foreground max-w-sm">
        Настройте спот и получите рекомендацию из базы решённых спотов.
      </p>
    </div>
  );
}
