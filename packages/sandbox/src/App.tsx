import { Layout } from "./components/Layout";
import { Sidebar } from "./components/Sidebar";
import { Routes } from "./pages/Routes";

export function App() {
  return (
    <Layout sidebar={<Sidebar />}>
      <Routes />
    </Layout>
  );
}
