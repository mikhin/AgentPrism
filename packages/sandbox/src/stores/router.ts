import { createRouter } from "@nanostores/router";

import { DetailsPage } from "../pages/DetailsPage";
import { HomePage } from "../pages/HomePage";
import { SpanCardPage } from "../pages/SpanCardPage";
import { TreeViewPage } from "../pages/TreeViewPage";

export type RouteKey = keyof typeof ROUTES;

export const ROUTES = {
  home: {
    path: "/",
    component: HomePage,
    label: "Home",
  },
  spanCard: {
    path: "/span-card",
    component: SpanCardPage,
    label: "Span Card",
  },
  treeView: {
    path: "/tree-view",
    component: TreeViewPage,
    label: "Tree View",
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
