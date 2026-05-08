import type { SolvedSpot } from "@/backend";
import { BoardDisplay } from "@/components/CardDisplay";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useListSpots } from "@/hooks/useBackend";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";

const POSITIONS_LIST = ["UTG", "MP", "CO", "BTN", "SB", "BB"];
const STACK_SIZES_LIST = ["20bb", "40bb", "100bb"];

const STREET_COLORS: Record<string, string> = {
  Preflop: "bg-violet-600/20 text-violet-300 border-violet-600/30",
  Flop: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
  Turn: "bg-amber-600/20 text-amber-300 border-amber-600/30",
  River: "bg-blue-600/20 text-blue-300 border-blue-600/30",
};

const STREET_LABEL_RU: Record<string, string> = {
  Preflop: "Префлоп",
  Flop: "Флоп",
  Turn: "Тёрн",
  River: "Ривер",
};

function SpotCard({
  spot,
  onClick,
}: { spot: SolvedSpot; onClick: () => void }) {
  const isPositiveEV = spot.evData.expectedValue >= 0;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: card is interactive via onClick
    <div
      data-ocid="library.spot.card"
      onClick={onClick}
      className="group relative bg-card border border-border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "text-[11px] font-medium px-2 py-0.5 rounded-full border",
            STREET_COLORS[spot.street] ??
              "bg-muted text-muted-foreground border-border",
          )}
        >
          {STREET_LABEL_RU[spot.street] ?? spot.street}
        </span>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        {spot.positions.map((pos, i) => (
          <span key={pos} className="flex items-center gap-1">
            {i > 0 && <span className="text-muted-foreground text-xs">vs</span>}
            <span className="text-sm font-bold text-foreground">{pos}</span>
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {spot.description}
      </p>
      {spot.board.length > 0 && (
        <div className="mb-3">
          <BoardDisplay cards={spot.board} size="xs" />
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground">
          {spot.evData.action}
        </span>
        <span
          className={cn(
            "text-xs font-mono font-semibold",
            isPositiveEV ? "text-emerald-400" : "text-red-400",
          )}
        >
          {isPositiveEV ? "+" : ""}
          {spot.evData.expectedValue.toFixed(2)} bb
        </span>
      </div>
    </div>
  );
}

function SpotCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex gap-1">
        <Skeleton className="h-8 w-6" />
        <Skeleton className="h-8 w-6" />
        <Skeleton className="h-8 w-6" />
      </div>
    </div>
  );
}

// removed

// removed
// removed

function _unused() {
  return null;
}

export default function Library() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterPosition, setFilterPosition] = useState<string>("all");
  const [filterStack, setFilterStack] = useState<string>("all");
  const [filterStreet, setFilterStreet] = useState<string>("all");
  const { data: spots = [], isLoading } = useListSpots(null);

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      if (filterPosition !== "all" && !s.positions.includes(filterPosition))
        return false;
      if (filterStack !== "all" && s.filters.stackSize !== filterStack)
        return false;
      if (filterStreet !== "all" && s.street !== filterStreet) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          s.description.toLowerCase().includes(q) ||
          s.positions.some((p) => p.toLowerCase().includes(q)) ||
          s.street.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [spots, filterPosition, filterStack, filterStreet, search]);

  return (
    <div data-ocid="library.page" className="min-h-screen bg-background">
      <div className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {t("navLibrary")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isLoading
                  ? t("loading")
                  : `${filtered.length} ${t("libFound")}`}
              </p>
            </div>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="library.search_input"
              className="pl-9 bg-background/60 border-border/60 focus:border-accent/50"
              placeholder={t("libSearch")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div className="flex gap-1 flex-wrap">
              {["all", ...POSITIONS_LIST].map((pos) => (
                <button
                  key={pos}
                  type="button"
                  data-ocid={`library.filter.position.${pos}`}
                  onClick={() => setFilterPosition(pos)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                    filterPosition === pos
                      ? "bg-accent/20 border-accent/40 text-accent"
                      : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {pos === "all" ? t("libAll") : pos}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-border/60" />
            <div className="flex gap-1 flex-wrap">
              {[
                { val: "all", label: t("libAll") },
                { val: "Preflop", label: t("libPreflop") },
                { val: "Flop", label: t("libFlop") },
                { val: "Turn", label: t("libTurn") },
                { val: "River", label: t("libRiver") },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  data-ocid={`library.filter.street.${val}`}
                  onClick={() => setFilterStreet(val)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                    filterStreet === val
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-border/60" />
            <div className="flex gap-1 flex-wrap">
              {["all", ...STACK_SIZES_LIST].map((stack) => (
                <button
                  key={stack}
                  type="button"
                  data-ocid={`library.filter.stack.${stack}`}
                  onClick={() => setFilterStack(stack)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                    filterStack === stack
                      ? "bg-secondary/60 border-secondary-foreground/20 text-foreground"
                      : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {stack === "all" ? t("libAll") : stack}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {isLoading ? (
          <div
            data-ocid="library.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {Array.from({ length: 9 }).map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton list
              <SpotCardSkeleton key={`skeleton-${idx}`} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="library.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/40 border border-border flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {t("libNoSpots")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("libNoSpotsHint")}
            </p>
          </div>
        ) : (
          <div
            data-ocid="library.spot.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                onClick={() =>
                  navigate({
                    to: "/library/$spotId",
                    params: { spotId: spot.id },
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
