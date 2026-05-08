import type { ActionFrequency } from "@/backend";
import { BoardDisplay } from "@/components/CardDisplay";
import { RangeMatrix } from "@/components/RangeMatrix";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSpot } from "@/hooks/useBackend";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, TrendingDown, TrendingUp } from "lucide-react";

const STREET_LABEL_RU: Record<string, string> = {
  Preflop: "Префлоп",
  Flop: "Флоп",
  Turn: "Тёрн",
  River: "Ривер",
};

function ActionBar({
  label,
  value,
  colorClass,
}: { label: string; value: number; colorClass: string }) {
  const pct = Math.round(value * 100);
  if (pct < 1) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-xs text-muted-foreground shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2.5 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            colorClass,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={cn(
          "text-xs font-mono font-semibold w-9 text-right",
          colorClass.replace("bg-", "text-"),
        )}
      >
        {pct}%
      </span>
    </div>
  );
}

function aggregateFrequencies(ranges: ActionFrequency[]): ActionFrequency {
  if (ranges.length === 0)
    return { bet: 0, call: 0, fold: 0, check: 0, raise: 0 };
  const sum = ranges.reduce(
    (acc, r) => ({
      bet: acc.bet + r.bet,
      call: acc.call + r.call,
      fold: acc.fold + r.fold,
      check: acc.check + r.check,
      raise: acc.raise + r.raise,
    }),
    { bet: 0, call: 0, fold: 0, check: 0, raise: 0 },
  );
  const n = ranges.length;
  return {
    bet: sum.bet / n,
    call: sum.call / n,
    fold: sum.fold / n,
    check: sum.check / n,
    raise: sum.raise / n,
  };
}

function computeEquity(ranges: ActionFrequency[]): {
  hero: number;
  villain: number;
} {
  if (ranges.length === 0) return { hero: 50, villain: 50 };
  const agg = aggregateFrequencies(ranges);
  const heroEquity =
    40 + (agg.bet + agg.raise) * 30 - (agg.call + agg.check) * 10;
  const clamped = Math.max(20, Math.min(80, heroEquity));
  return { hero: Math.round(clamped), villain: Math.round(100 - clamped) };
}

function EquityBar({ hero, villain }: { hero: number; villain: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-emerald-400 font-semibold">Герой {hero}%</span>
        <span className="text-red-400 font-semibold">Виллан {villain}%</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex">
        <div
          className="bg-emerald-600 transition-all duration-700"
          style={{ width: `${hero}%` }}
        />
        <div
          className="bg-red-700 transition-all duration-700"
          style={{ width: `${villain}%` }}
        />
      </div>
    </div>
  );
}

export default function SpotDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { spotId?: string };
  const spotId = params.spotId ?? "";
  const { data: spot, isLoading } = useGetSpot(spotId);
  const equity = spot ? computeEquity(spot.ranges) : { hero: 50, villain: 50 };
  const agg = spot ? aggregateFrequencies(spot.ranges) : null;
  const isPositiveEV = spot ? spot.evData.expectedValue >= 0 : false;

  return (
    <div data-ocid="spot_detail.page" className="min-h-screen bg-background">
      <div className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="spot_detail.back_button"
              onClick={() => navigate({ to: "/library" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("libBackToLibrary")}
            </button>
            {!isLoading && spot && (
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2">
                  {spot.positions.map((pos, i) => (
                    <span key={pos} className="flex items-center gap-1.5">
                      {i > 0 && (
                        <span className="text-muted-foreground text-sm">
                          vs
                        </span>
                      )}
                      <span className="text-base font-bold text-foreground">
                        {pos}
                      </span>
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">&middot;</span>
                <span className="text-sm text-muted-foreground">
                  {STREET_LABEL_RU[spot.street] ?? spot.street}
                </span>
                {spot.board.length > 0 && (
                  <>
                    <span className="text-muted-foreground">&middot;</span>
                    <BoardDisplay cards={spot.board} size="xs" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {isLoading ? (
          <div data-ocid="spot_detail.loading_state" className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-[420px] w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : !spot ? (
          <div
            data-ocid="spot_detail.error_state"
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="text-5xl mb-4">🃏</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ситуация не найдена
            </h3>
            <p className="text-muted-foreground">
              <button
                type="button"
                className="text-accent underline"
                onClick={() => navigate({ to: "/library" })}
              >
                {t("libBackToLibrary")}
              </button>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-muted-foreground text-sm">
                {spot.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 bg-card border border-border rounded-xl p-4 sm:p-5">
                <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  {t("libRangeMatrix")}
                </h2>
                <RangeMatrix ranges={spot.ranges} />
              </div>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-4">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    {t("libEvData")}
                  </h2>
                  <div className="flex items-center gap-3">
                    {isPositiveEV ? (
                      <TrendingUp className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    )}
                    <div>
                      <div
                        className={cn(
                          "text-2xl font-bold font-mono",
                          isPositiveEV ? "text-emerald-400" : "text-red-400",
                        )}
                      >
                        {isPositiveEV ? "+" : ""}
                        {spot.evData.expectedValue.toFixed(2)} bb
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {t("libRecommendedAction")}:{" "}
                        <span className="text-foreground font-medium">
                          {spot.evData.action}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    {t("libEquityBars")}
                  </h2>
                  <EquityBar hero={equity.hero} villain={equity.villain} />
                </div>
                {agg && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                      {t("libActionFreq")}
                    </h2>
                    <div className="space-y-2.5">
                      <ActionBar
                        label={t("libBet")}
                        value={agg.bet}
                        colorClass="bg-emerald-500"
                      />
                      <ActionBar
                        label={t("libRaise")}
                        value={agg.raise}
                        colorClass="bg-emerald-700"
                      />
                      <ActionBar
                        label={t("libCall")}
                        value={agg.call}
                        colorClass="bg-blue-500"
                      />
                      <ActionBar
                        label={t("libCheck")}
                        value={agg.check}
                        colorClass="bg-blue-700"
                      />
                      <ActionBar
                        label={t("libFold")}
                        value={agg.fold}
                        colorClass="bg-red-600"
                      />
                    </div>
                  </div>
                )}
                <div className="bg-card border border-border rounded-xl p-4">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Параметры
                  </h2>
                  <dl className="space-y-1.5 text-xs">
                    {[
                      ["Позиция", spot.filters.position],
                      ["Стек", spot.filters.stackSize],
                      [
                        "Улица",
                        STREET_LABEL_RU[spot.filters.street] ??
                          spot.filters.street,
                      ],
                      ["Поставка", spot.filters.betSizing || "—"],
                      ["Текстура", spot.filters.boardTexture || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="text-foreground font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
