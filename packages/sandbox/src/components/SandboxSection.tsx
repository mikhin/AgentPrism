import type { ReactNode } from "react";

interface SandboxSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SandboxSection({
  title,
  description,
  children,
}: SandboxSectionProps) {
  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      <div className="flex flex-wrap gap-6">{children}</div>
    </section>
  );
}

interface SandboxItemProps {
  title?: string;
  children: ReactNode;
  pattern?: "grid" | "dots" | "none";
}

export function SandboxItem({
  title,
  children,
  pattern = "grid",
}: SandboxItemProps) {
  const patternClasses = {
    grid: "bg-[linear-gradient(#00000008_1px,transparent_1px),linear-gradient(90deg,#00000008_1px,transparent_1px)] bg-[size:20px_20px]",
    dots: "bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:15px_15px]",
    none: "",
  };

  return (
    <div className="flex flex-col gap-2">
      {title && <h3 className="text-sm font-medium text-gray-700">{title}</h3>}
      <div
        className={`flex min-h-24 min-w-36 items-center justify-center rounded-md border border-gray-200 bg-white p-6 shadow-sm ${patternClasses[pattern]} `}
      >
        {children}
      </div>
    </div>
  );
}
