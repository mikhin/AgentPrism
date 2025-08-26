import { type ReactNode } from "react";

import { Switch } from "./Switch";

interface FilterItem {
  label: ReactNode;
  value: string;
  selected: boolean;
}

interface FilterItemProps extends FilterItem {
  onChange: (selected: boolean) => void;
}

export const FilterItem = ({
  label,
  value,
  selected,
  onChange,
}: FilterItemProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>

      <Switch
        checked={selected}
        onChange={onChange}
        valueLabel={`Filter value: ${value}`}
      />
    </div>
  );
};
