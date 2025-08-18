import { Coins } from "lucide-react";
import type { SpanCardType } from "../types/span";
import { Badge } from "./Badge";
import { useAgentTraceContext } from "../context/useAgentTraceContext";

interface SpanCardContentProps {
  data: SpanCardType;
}

export const SpanCardContent = ({ data }: SpanCardContentProps) => {
  const { config } = useAgentTraceContext();

  const Icon = config.badges[data.type].icon;
  const theme = config.badges[data.type].theme;
  const label = config.badges[data.type].label;

  return (
    <div className="flex items-center">
      <h3 className="mr-3 max-w-32 truncate text-sm leading-5 text-gray-900 dark:text-gray-200">
        {data.title}
      </h3>

      <div className="flex items-center justify-start space-x-1">
        <Badge
          iconStart={<Icon className="size-2.5" />}
          theme={theme}
          size="xs"
        >
          {label}
        </Badge>

        <Badge
          iconStart={<Coins className="size-2.5" />}
          theme="gray"
          size="xs"
        >
          {data.tokensCount}
        </Badge>

        <Badge theme="gray" size="xs">
          $ {data.cost}
        </Badge>
      </div>
    </div>
  );
};
