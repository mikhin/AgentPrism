import * as Popover from "@radix-ui/react-popover";
import { Settings2, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { FilterItem } from "./FilterItem";
import { IconButton, type IconButtonProps } from "./IconButton";

export type FilterItem<T extends string> = {
  value: T;
  label: ReactNode;
  selected: boolean;
};

export interface FiltersProps<T extends string> {
  title: ReactNode;
  items: FilterItem<T>[];
  onChange: (value: T, selected: boolean) => void;
  buttonProps?: Omit<IconButtonProps, "aria-label" | "onClick">;
}

export const Filters = <T extends string>({
  title,
  items,
  onChange,
  buttonProps = {},
}: FiltersProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <IconButton
          size="lg"
          aria-label={open ? "Close filters" : "Open filters"}
          onClick={() => setOpen((prev) => !prev)}
          {...buttonProps}
        >
          <Settings2 className="size-3.5" />
        </IconButton>
      </Popover.Trigger>

      <Popover.Anchor />

      <Popover.Portal>
        <Popover.Content className="relative -top-1 w-48 rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800">
          <Popover.Arrow className="fill-white dark:fill-gray-800" />

          <div className="flex flex-col gap-2">
            <header className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-gray-900 dark:text-gray-300">
                {title}
              </span>

              <Popover.Close asChild>
                <IconButton
                  size="sm"
                  aria-label="Close filters"
                  variant="ghost"
                >
                  <X className="size-3.5" />
                </IconButton>
              </Popover.Close>
            </header>

            <hr className="h-px w-full bg-gray-200 dark:bg-gray-700" />

            {items.map((item) => (
              <FilterItem
                key={item.value}
                label={item.label}
                value={item.value}
                selected={item.selected}
                onChange={(newValue) => onChange(item.value, newValue)}
              />
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
