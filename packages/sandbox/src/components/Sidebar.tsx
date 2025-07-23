import type { ComponentType } from "react";

import { useStore } from "@nanostores/react";
import { openPage } from "@nanostores/router";

import { $router, ROUTES, type RouteKey } from "../stores/router";

interface RouteConfig {
  path: string;
  component: ComponentType;
  label: string;
}

export function Sidebar() {
  const page = useStore($router);
  const currentRoute = page?.route as RouteKey | undefined;

  const getRouteLabel = (routeKey: RouteKey): string => {
    const routeConfig = ROUTES[routeKey] as RouteConfig;
    return routeConfig.label || String(routeKey);
  };

  return (
    <nav className="h-full p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <ul className="space-y-2">
        {Object.entries(ROUTES).map(([key]) => {
          const routeKey = key as RouteKey;
          const isActive = currentRoute === routeKey;

          return (
            <li key={routeKey}>
              <button
                className={`group w-full text-left px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-white text-gray-700 font-medium shadow-sm"
                      : "text-gray-500 hover:bg-white/60 hover:shadow-sm"
                  }`}
                onClick={() => openPage($router, routeKey)}
              >
                <div className="flex items-center">
                  {getRouteLabel(routeKey)}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
