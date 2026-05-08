import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Cpu,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Swords,
  User,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          role="presentation"
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl">&#9824;</span>
            <span className="font-display font-bold text-lg tracking-tight text-accent">
              ICPT
            </span>
            <span className="text-xs text-muted-foreground font-mono mt-0.5">
              GTO
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {(
            [
              {
                to: "/dashboard",
                icon: LayoutDashboard,
                label: "Dashboard",
                ocid: "nav.dashboard.link",
                match: (p: string) => p === "/dashboard",
              },
              {
                to: "/library",
                icon: BookOpen,
                label: t("navLibrary"),
                ocid: "nav.library.link",
                match: (p: string) => p.startsWith("/library"),
              },
              {
                to: "/trainer",
                icon: Swords,
                label: t("navTrainer"),
                ocid: "nav.trainer.link",
                match: (p: string) => p.startsWith("/trainer"),
              },
              {
                to: "/solver",
                icon: Cpu,
                label: t("navSolver"),
                ocid: "nav.solver.link",
                match: (p: string) => p.startsWith("/solver"),
              },
              {
                to: "/hand-history",
                icon: History,
                label: t("navHistory"),
                ocid: "nav.hand-history.link",
                match: (p: string) => p.startsWith("/hand-history"),
              },
            ] as {
              to: string;
              icon: React.ElementType;
              label: string;
              ocid: string;
              match: (p: string) => boolean;
            }[]
          ).map(({ to, icon: Icon, label, ocid, match }) => (
            <Link
              key={to}
              to={
                to as
                  | "/"
                  | "/dashboard"
                  | "/library"
                  | "/library/$spotId"
                  | "/trainer"
                  | "/solver"
                  | "/hand-history"
                  | "/settings"
              }
              data-ocid={ocid}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                match(currentPath)
                  ? "bg-sidebar-accent text-accent border border-accent/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
          <Separator className="my-2 bg-sidebar-border" />
          <Link
            to="/settings"
            data-ocid="nav.settings.link"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
              currentPath.startsWith("/settings")
                ? "bg-sidebar-accent text-accent border border-accent/20"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Settings className="size-4 shrink-0" />
            <span>{t("navSettings")}</span>
          </Link>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
            data-ocid="nav.logout.button"
          >
            <LogOut className="size-4 mr-2" />
            {t("close")}
          </Button>
        </div>
      </aside>
    </>
  );
}
