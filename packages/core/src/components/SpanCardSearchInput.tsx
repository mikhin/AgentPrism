import { Search } from "lucide-react";

import { Input, type InputProps } from "./Input";

export const SpanCardSearchInput = ({ ...props }: InputProps) => {
  return (
    <Input
      startIcon={<Search className="size-4" />}
      placeholder="Filter..."
      {...props}
    />
  );
};
