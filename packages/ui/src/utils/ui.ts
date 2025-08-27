import type { TraceSpanCategory } from "@ai-agent-trace-ui/types";
import type { LucideIcon } from "lucide-react";

import type { ColorVariant } from "../types";

import { SPAN_CATEGORY_CONFIG } from "../constants";

export function getSpanCategoryTheme(
  category: TraceSpanCategory,
): ColorVariant {
  return SPAN_CATEGORY_CONFIG[category].theme;
}

export function getSpanCategoryLabel(category: TraceSpanCategory): string {
  return SPAN_CATEGORY_CONFIG[category].label;
}

export function getSpanCategoryIcon(category: TraceSpanCategory): LucideIcon {
  return SPAN_CATEGORY_CONFIG[category].icon;
}
