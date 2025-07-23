import type { ReactNode } from "react";

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      <div className="w-80 relative shadow-sm z-10">
        <div className="absolute inset-0 bg-white rounded-tr-lg rounded-br-2xl shadow-sm"></div>
        <div className="relative h-full">{sidebar}</div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm min-h-[calc(100%-1rem)] p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
