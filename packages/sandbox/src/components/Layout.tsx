import type { ReactNode } from "react";

import { useState, useEffect } from "react";

import { Sidebar } from "./Sidebar.tsx";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative w-80 h-full z-30 md:z-10 shadow-sm
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
        aria-label="Navigation menu"
        aria-hidden={!sidebarOpen ? "true" : undefined}
      >
        <div className="absolute inset-0 bg-white rounded-tr-lg rounded-br-2xl shadow-sm"></div>
        <div className="relative h-full">
          {/* Mobile close button */}
          <button
            className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-10"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <Sidebar onNavItemClick={closeSidebar} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-3 md:p-6">
        {/* Mobile menu button */}
        <button
          className="mb-4 md:hidden bg-white rounded-lg shadow-sm px-3 py-2 text-gray-600 hover:text-gray-900"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
        >
          <span aria-hidden="true">☰</span> Menu
        </button>

        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm min-h-[calc(100%-1rem)] p-3 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
