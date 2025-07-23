import { useStore } from "@nanostores/react";
import { type ReactElement } from "react";

import { $router, ROUTES, type RouteKey } from "../stores/router";
import { PageNotFound } from "./PageNotFound";

export const Routes = (): ReactElement => {
  const page = useStore($router);

  if (!page) {
    return <PageNotFound />;
  }

  const currentRoute = page.route as RouteKey;

  if (!ROUTES[currentRoute]) {
    return <PageNotFound />;
  }

  const RouteComponent = ROUTES[currentRoute].component;

  return <RouteComponent />;
};
