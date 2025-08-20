import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  className = "",
  triggerClassName = "",
  contentClassName = "",
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={`rounded-lg ${className}`}
    >
      <Collapsible.Trigger
        className={`flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 ${triggerClassName}`}
      >
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
        <span>{title}</span>
      </Collapsible.Trigger>

      <Collapsible.Content
        className={`data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown ${contentClassName}`}
      >
        <div className="px-4 pb-3 pt-0 text-sm text-gray-600">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
