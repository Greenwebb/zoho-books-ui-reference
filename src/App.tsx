import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { moduleSpecs } from "./data";
import { Dashboard } from "./screens/Dashboard";
import { ListScreen } from "./screens/ListScreen";
import { EntityForm } from "./screens/EntityForm";
import { ItemDetail } from "./screens/ItemDetail";
import { BankingScreen, ChartOfAccountsScreen, DocumentsScreen, ReportsIndex, ReportDetail, SettingsIndex, SettingsGeneral, TransactionLockingScreen } from "./screens/WorkspaceScreens";
import { AutomationScreen, SettingsTemplates } from "./screens/SettingsWorkspace";
import type { ModuleSpec } from "./types";

const formSpecs = [...new Map(moduleSpecs.filter((spec) => spec.createPath).map((spec) => [spec.createPath!, spec])).values()];

function CreateRoute({ spec }: { spec: ModuleSpec }) {
  return <EntityForm key={spec.key} spec={spec} />;
}

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        {moduleSpecs.map((spec) => <Route key={spec.path} path={spec.path} element={<ListScreen key={spec.key} spec={spec} />} />)}
        {formSpecs.map((spec) => <Route key={spec.createPath} path={spec.createPath} element={<CreateRoute spec={spec} />} />)}
        <Route path="/items/:itemId" element={<ItemDetail />} />
        <Route path="/banking" element={<BankingScreen />} />
        <Route path="/chart-of-accounts" element={<ChartOfAccountsScreen />} />
        <Route path="/transaction-locking" element={<TransactionLockingScreen />} />
        <Route path="/reports" element={<ReportsIndex />} />
        <Route path="/reports/:reportSlug" element={<ReportDetail />} />
        <Route path="/documents" element={<DocumentsScreen />} />
        <Route path="/settings" element={<SettingsIndex />} />
        <Route path="/settings/general" element={<SettingsGeneral />} />
        <Route path="/settings/templates" element={<SettingsTemplates />} />
        <Route path="/settings/automation" element={<AutomationScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
