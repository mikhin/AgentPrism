import { useStore } from "@nanostores/react";
import { openPage } from "@nanostores/router";

import { $router, ROUTES, type RouteKey } from "../stores/router";

type Props = {
  onNavItemClick: (routeKey: RouteKey) => void;
};

export function Sidebar({ onNavItemClick }: Props) {
  const page = useStore($router);
  const currentRoute = page?.route as RouteKey | undefined;

  const getRouteLabel = (routeKey: RouteKey): string => {
    const routeConfig = ROUTES[routeKey];
    return routeConfig.label;
  };

  const handleNavItemClick = (routeKey: RouteKey) => {
    onNavItemClick(routeKey);
    openPage($router, routeKey);
  };

  return (
    <nav
      className="h-full p-4 bg-gradient-to-b from-gray-50 to-gray-100 pt-12 md:pt-4"
      aria-label="Main navigation"
      id="sidebar"
      role="navigation"
    >
      <ul className="space-y-2" role="list">
        {Object.entries(ROUTES).map(([key]) => {
          const routeKey = key as RouteKey;
          const isActive = currentRoute === routeKey;

          return (
            <li key={routeKey} role="listitem">
              <button
                className={`group w-full text-left px-3 py-3 md:py-2 rounded-lg transition-all duration-200 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${
                    isActive
                      ? "bg-white text-gray-700 font-medium shadow-sm"
                      : "text-gray-500 hover:bg-white/60 hover:shadow-sm"
                  }`}
                onClick={() => handleNavItemClick(routeKey)}
                aria-current={isActive ? "page" : undefined}
                type="button"
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
