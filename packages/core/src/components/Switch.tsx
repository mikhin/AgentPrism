import * as RadixSwitch from "@radix-ui/react-switch";
import cn from "classnames";

interface SwitchProps {
  checked: boolean;
  onChange: (selected: boolean) => void;
  /**
   * The label for the aria-label
   */
  valueLabel: string;
}

export const Switch = ({ checked, onChange, valueLabel }: SwitchProps) => {
  return (
    <RadixSwitch.Root
      checked={checked}
      onCheckedChange={() => onChange(!checked)}
      className={cn(
        "relative h-4 w-8 rounded-full",
        checked && "bg-gray-900 dark:bg-gray-200",
        !checked && "bg-gray-300 dark:bg-gray-900",
        "flex items-center justify-center",
        "transition-colors",
      )}
      aria-label={checked ? `Deselect ${valueLabel}` : `Select ${valueLabel}`}
    >
      <RadixSwitch.Thumb
        className={cn(
          "inline-block size-3 rounded-full",
          "data-[state=checked]:translate-x-2 data-[state=unchecked]:-translate-x-2",
          "transition-all duration-100",
          checked && "bg-white dark:bg-gray-900",
          !checked && "bg-white dark:bg-gray-300",
        )}
      />
    </RadixSwitch.Root>
  );
};
