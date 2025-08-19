import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Search } from "lucide-react";

interface SpanCardSearchInputProps {
  onSearch: (value: string) => void;
}

export const SpanCardSearchInput = ({ onSearch }: SpanCardSearchInputProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onSearch(value);
  }, [value, onSearch]);

  return (
    <Input
      value={value}
      onValueChange={setValue}
      startIcon={<Search className="size-4" />}
      placeholder="Filter..."
      onClear={() => setValue("")}
      clearable={!!value}
    />
  );
};
