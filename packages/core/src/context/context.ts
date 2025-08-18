import { createContext } from "react";
import { defaultConfig } from "../config/default";
import type { AgentTraceContextType } from "./types";

const defaultValue: AgentTraceContextType = {
  config: defaultConfig,
};

export const AgentTraceContext =
  createContext<AgentTraceContextType>(defaultValue);
