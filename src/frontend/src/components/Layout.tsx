import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Cpu,
  LayoutDashboard,
  LogOut,
  Settings,
  Target,
  User,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const { isAuthenticated, logout, identity } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      key: "dashboard",
    },
    {
      href: "/library",
      icon: BookOpen,
      label: t("navLibrary"),
      key: "library",
    },
    { href: "/trainer", icon: Target, label: t("navTrainer"), key: "trainer" },
    { href: "/solver", icon: Cpu, label: t("navSolver"), key: "solver" },
    {
      href: "/hand-history",
      icon: Clock,
      label: t("navHistory"),
      key: "history",
    },
    {
      href: "/settings",
      icon: Settings,
      label: t("navSettings"),
      key: "settings",
    },
  ];

  const userId = identity?.getPrincipal()?.toString()?.slice(0, 8);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-56" : "w-16"
        }`}
        data-ocid="sidebar"
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <span className="text-accent-foreground font-bold text-sm font-mono">
              GTO
            </span>
          </div>
          {sidebarOpen && (
            <span className="font-display font-semibold text-foreground tracking-tight">
              ICPT
            </span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((p) => !p)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle sidebar"
            data-ocid="sidebar.toggle"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.key}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                  active
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                data-ocid={`sidebar.${item.key}.link`}
              >
                <item.icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <User size={14} className="text-accent" />
              </div>
              {sidebarOpen && (
                <>
                  <span className="text-xs text-muted-foreground font-mono truncate flex-1">
                    {userId}\u2026
                  </span>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Logout"
                    data-ocid="sidebar.logout_button"
                  >
                    <LogOut size={14} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User size={14} className="text-muted-foreground" />
              </div>
              {sidebarOpen && (
                <span className="text-xs text-muted-foreground">
                  \u0413\u043e\u0441\u0442\u044c
                </span>
              )}
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
