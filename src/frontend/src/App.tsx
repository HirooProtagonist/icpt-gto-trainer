import { Layout } from "@/components/Layout";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Landing = lazy(() => import("@/pages/Landing"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Library = lazy(() => import("@/pages/Library"));
const SpotDetail = lazy(() => import("@/pages/SpotDetail"));
const Trainer = lazy(() => import("@/pages/Trainer"));
const Solver = lazy(() => import("@/pages/Solver"));
const HandHistory = lazy(() => import("@/pages/HandHistory"));
const Settings = lazy(() => import("@/pages/Settings"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-muted-foreground text-sm">
      Loading...
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

const libraryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/library",
  component: Library,
});

const spotDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/library/$spotId",
  component: SpotDetail,
});

const trainerRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/trainer",
  component: Trainer,
});

const solverRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/solver",
  component: Solver,
});

const handHistoryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/hand-history",
  component: HandHistory,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    libraryRoute,
    spotDetailRoute,
    trainerRoute,
    solverRoute,
    handHistoryRoute,
    settingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
