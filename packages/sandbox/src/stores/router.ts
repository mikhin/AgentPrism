import { createRouter } from "@nanostores/router";

import { BadgePage } from "../pages/BadgePage";
import { DetailsPage } from "../pages/DetailsPage";
import { HomePage } from "../pages/HomePage";
import { SpanCardPage } from "../pages/SpanCardPage";
import { SpanCardsListPage } from "../pages/SpanCardsListPage";

export type RouteKey = keyof typeof ROUTES;

export const ROUTES = {
  home: {
    path: "/",
    component: HomePage,
    label: "Home",
  },
  badge: {
    path: "/badge",
    component: BadgePage,
    label: "Badge",
  },
  spanCard: {
    path: "/span-card",
    component: SpanCardPage,
    label: "Span Card",
  },
  treeView: {
    path: "/tree-view",
    component: SpanCardsListPage,
    label: "Span Cards List",
  },
  details: {
    path: "/details",
    component: DetailsPage,
    label: "Details",
  },
} as const;

export const routePaths = Object.entries(ROUTES).reduce(
  (paths, [key, config]) => ({ ...paths, [key]: config.path }),
  {},
) as Record<keyof typeof ROUTES, string>;

export const $router = createRouter(routePaths);
