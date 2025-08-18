import { AgentTraceProvider } from "ai-agent-trace-ui-core";
import { Layout } from "./components/Layout";
import { Routes } from "./pages/Routes";

export function App() {
  return (
    <AgentTraceProvider>
      <Layout>
        <Routes />
      </Layout>
    </AgentTraceProvider>
  );
}
