import { Input, type InputProps } from "./Input";
import { Search } from "lucide-react";

export const SpanCardSearchInput = ({ ...props }: InputProps) => {
  return (
    <Input
      startIcon={<Search className="size-4" />}
      placeholder="Filter..."
      {...props}
    />
  );
};
