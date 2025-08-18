import type { ColorVariant } from "../types/ui.ts";

import { colorThemeClasses } from "../constants/ui.ts";

export function getBgColorClass(color: ColorVariant): string {
  return colorThemeClasses[color].bg;
}
