import { useMemo, type ReactNode } from "react";
import { AgentTraceContext } from "./context";
import { defaultConfig } from "../config/default";
import type { AgentTraceConfig } from "../types/config";
import type { AgentTraceContextType } from "./types";

interface AgentTraceProviderProps {
  children: ReactNode;
  config?: AgentTraceConfig;
}

export const AgentTraceProvider = ({
  children,
  config,
}: AgentTraceProviderProps) => {
  const contextValue: AgentTraceContextType = useMemo(
    () => ({ config: config || defaultConfig }),
    [config],
  );

  return (
    <AgentTraceContext.Provider value={contextValue}>
      {children}
    </AgentTraceContext.Provider>
  );
};
