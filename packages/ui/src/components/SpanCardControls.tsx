import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";

import { IconButton } from "./IconButton";

interface SpanCardExpandAllButtonProps {
  onExpandAll: () => void;
}

interface SpanCardCollapseAllButtonProps {
  onCollapseAll: () => void;
}

export const SpanCardExpandAllButton = ({
  onExpandAll,
}: SpanCardExpandAllButtonProps) => {
  return (
    <IconButton onClick={onExpandAll} aria-label="Expand all">
      <ChevronsUpDown className="size-3.5" />
    </IconButton>
  );
};

export const SpanCardCollapseAllButton = ({
  onCollapseAll,
}: SpanCardCollapseAllButtonProps) => {
  return (
    <IconButton onClick={onCollapseAll} aria-label="Collapse all">
      <ChevronsDownUp className="size-3.5" />
    </IconButton>
  );
};
