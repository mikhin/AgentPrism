import { useContext } from "react";
import { AgentTraceContext } from "./context";

export const useAgentTraceContext = () => {
  const context = useContext(AgentTraceContext);

  if (!context) {
    throw new Error(
      "useAgentTraceContext must be used within an AgentTraceProvider",
    );
  }

  return context;
};
