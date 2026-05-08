import { u as useTranslation, a as useAuth, j as jsxRuntimeExports, T as Target, B as BookOpen, C as Cpu, d as Clock, L as Link } from "./index-Cbhxa_lC.js";
import { Z as Zap } from "./zap-Buzp0MjV.js";
import { T as TrendingUp } from "./trending-up-C8U7Ky8g.js";
const MODULE_CARDS = [
  {
    href: "/library",
    icon: BookOpen,
    titleKey: "navLibrary",
    descKey: "featureLibraryDesc",
    accent: "#00d4aa"
  },
  {
    href: "/trainer",
    icon: Target,
    titleKey: "navTrainer",
    descKey: "featureTrainerDesc",
    accent: "#f5c842"
  },
  {
    href: "/solver",
    icon: Cpu,
    titleKey: "navSolver",
    descKey: "featureSolverDesc",
    accent: "#a78bfa"
  },
  {
    href: "/hand-history",
    icon: Clock,
    titleKey: "navHistory",
    descKey: "featureHistoryDesc",
    accent: "#e54b4b"
  }
];
function Dashboard() {
  var _a, _b;
  const { t } = useTranslation();
  const { isAuthenticated, identity } = useAuth();
  const userId = (_b = (_a = identity == null ? void 0 : identity.getPrincipal()) == null ? void 0 : _a.toString()) == null ? void 0 : _b.slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground", children: [
          t("dashWelcome"),
          isAuthenticated && userId ? `, ${userId}…` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: t("dashQuickStart") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
          style: {
            background: isAuthenticated ? "#00d4aa18" : "#f5c84218",
            color: isAuthenticated ? "#00d4aa" : "#f5c842",
            border: `1px solid ${isAuthenticated ? "#00d4aa33" : "#f5c84233"}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11 }),
            isAuthenticated ? "On-Chain" : "Guest"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      {
        label: t("dashSessions"),
        value: "0",
        icon: Target,
        color: "#00d4aa"
      },
      {
        label: t("dashAccuracy"),
        value: "—%",
        icon: TrendingUp,
        color: "#f5c842"
      },
      {
        label: t("dashEVSaved"),
        value: "0 bb",
        icon: Zap,
        color: "#a78bfa"
      }
    ].map(({ label, value, icon: Icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4 border border-border/60",
        style: { background: "#12121a" },
        "data-ocid": `dashboard.stat.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, style: { color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground", children: value })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold mb-4 text-foreground", children: t("dashQuickStart") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: MODULE_CARDS.map(
        ({ href, icon: Icon, titleKey, descKey, accent }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: href,
            className: "flex items-start gap-4 p-5 rounded-xl border border-border/60 transition-smooth hover:border-border",
            style: { background: "#12121a" },
            "data-ocid": `dashboard.module_${titleKey.replace("nav", "").toLowerCase()}.card`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  style: {
                    background: `${accent}18`,
                    border: `1px solid ${accent}33`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, style: { color: accent } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground mb-1", children: t(titleKey) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: t(descKey) })
              ] })
            ]
          },
          href
        )
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold mb-4 text-foreground", children: t("dashRecentActivity") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border/60 p-8 text-center",
          style: { background: "#12121a" },
          "data-ocid": "dashboard.activity.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 28, className: "mx-auto mb-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("dashNoActivity") })
          ]
        }
      )
    ] })
  ] });
}
export {
  Dashboard as default
};
