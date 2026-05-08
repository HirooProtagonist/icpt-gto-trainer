import { useTranslation } from "@/hooks/useTranslation";
import { BookOpen } from "lucide-react";

export default function LibraryShell() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4"
      data-ocid="library.empty_state"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
        <BookOpen className="size-8 text-accent" />
      </div>
      <h1 className="font-display text-2xl font-bold">{t("navLibrary")}</h1>
      <p className="text-muted-foreground max-w-sm">
        {t("featureLibraryDesc")}
      </p>
    </div>
  );
}
