import { useState } from "react";
import { ArrowLeft, Banknote, BarChart3, BookOpenCheck, BriefcaseBusiness, Building2, Check, ChevronRight, FileText, FolderOpen, LockKeyhole, Search, Settings2, ShieldCheck, Table2, WalletCards } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatMoney } from "../data";
import { useWorkspace } from "../state/WorkspaceContext";
import { Button, EmptyState, Modal, Notice, PageHeading, Panel } from "../components/Primitives";

const reportItems = [
  { title: "Profit and Loss", category: "Business Overview", path: "/reports/profit-and-loss", caption: "Income and expense summary" },
  { title: "Cash Flow Statement", category: "Business Overview", path: "/reports/cash-flow", caption: "Illustrative cash movement" },
  { title: "Balance Sheet", category: "Business Overview", path: "/reports/balance-sheet", caption: "Assets, liabilities and equity" },
  { title: "Sales by Customer", category: "Sales", path: "/reports/sales-by-customer", caption: "Fictional customer totals" },
  { title: "AR Aging Summary", category: "Receivables", path: "/reports/ar-aging-summary", caption: "Sample receivables aging" },
  { title: "Bill Details", category: "Payables", path: "/reports/bill-details", caption: "Fictional bills and due dates" },
  { title: "Expense Details", category: "Purchases and Expenses", path: "/reports/expense-details", caption: "Demo expense entries" },
  { title: "Project Summary", category: "Projects and Timesheet", path: "/reports/project-summary", caption: "Project activity preview" },
];

export function ReportsIndex() {
  const [search, setSearch] = useState("");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const filtered = reportItems.filter((report) => `${report.title} ${report.category}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="workspace-screen">
    <PageHeading eyebrow="Books · Demo" title="Reports Center" description="Explore report layouts with fictional sample figures." actions={<Button variant="secondary" onClick={() => setNoticeOpen(true)}>Create New Report</Button>} />
    <div className="report-layout">
      <aside className="report-sidebar panel">
        <strong>Reports</strong>
        {["Home", "Favorites", "Shared Reports", "My Reports", "Scheduled Reports", "Business Overview", "Sales", "Receivables", "Payables", "Banking", "Accountant"].map((item) => <button key={item} className={item === "Home" ? "report-nav-item active" : "report-nav-item"} onClick={() => setNoticeOpen(true)}>{item}</button>)}
      </aside>
      <Panel title="All Reports" action={<span className="count-badge">{filtered.length}</span>} className="report-index-panel">
        <label className="list-search report-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search reports" /></label>
        <div className="report-list-head"><span>Report name</span><span>Category</span><span>View</span></div>
        {filtered.map((report) => <Link className="report-row" to={report.path} key={report.title}>
          <span className="report-name"><span className="report-icon"><FileText size={16} /></span><span><strong>{report.title}</strong><small>{report.caption}</small></span></span>
          <span className="report-category">{report.category}</span><span className="report-open">Open <ChevronRight size={15} /></span>
        </Link>)}
      </Panel>
    </div>
    <Notice tone="amber">Report scheduling, sharing and export are not connected. Views use fictional values only.</Notice>
    <Modal open={noticeOpen} title="Report management is demo-only" description="Saved reports, sharing and schedules are not connected to any account." onClose={() => setNoticeOpen(false)} footer={<Button onClick={() => setNoticeOpen(false)}>Close</Button>}>
      <Notice tone="blue">This prototype demonstrates the report index and local navigation only.</Notice>
    </Modal>
  </div>;
}

const reportConfigs = {
  "profit-and-loss": { title: "Profit and Loss", column: "Account", rows: [["Operating Income", 18420], ["Cost of Goods Sold", 2180], ["Gross Profit", 16240], ["Operating Expenses", 7420], ["Operating Profit", 8820], ["Other Income", 325], ["Net Profit/Loss", 9145]] },
  "cash-flow": { title: "Cash Flow Statement", column: "Cash Flow", rows: [["Opening balance", 22140], ["Cash received", 12580], ["Cash paid", 6260], ["Closing balance", 28460]] },
  "balance-sheet": { title: "Balance Sheet", column: "Account", rows: [["Operating cash", 28460], ["Accounts receivable", 8340], ["Total assets", 36800], ["Accounts payable", 1920], ["Owner equity", 24800], ["Retained earnings", 10080]] },
  "sales-by-customer": { title: "Sales by Customer", column: "Customer", rows: [["Aster & Oak Studio", 6350], ["Northwind Learning", 5400], ["Juniper Table Co.", 1640]] },
  "ar-aging-summary": { title: "AR Aging Summary", column: "Age range", rows: [["Current", 6350], ["1–30 days", 2880], ["31–60 days", 0], ["61+ days", 0]] },
  "bill-details": { title: "Bill Details", column: "Vendor", rows: [["Cedarline Printworks", 1240], ["Blue Harbor Utilities", 320], ["Demo Office Supply", 185]] },
  "expense-details": { title: "Expense Details", column: "Category", rows: [["Software subscriptions", 186], ["Studio supplies", 243], ["Travel", 410]] },
  "project-summary": { title: "Project Summary", column: "Project", rows: [["Website refresh · Budget", 7200], ["Website refresh · Billed", 3900], ["Website refresh · Unbilled", 530]] },
} as const;

export function ReportDetail() {
  const { reportSlug = "profit-and-loss" } = useParams();
  const report = reportConfigs[reportSlug as keyof typeof reportConfigs] ?? reportConfigs["profit-and-loss"];
  const [view, setView] = useState<"table" | "chart">("table");
  const [basis, setBasis] = useState("Accrual");
  const [range, setRange] = useState("This Month");
  const [message, setMessage] = useState<{ title: string; description: string } | null>(null);
  const period = range === "This Month" ? "01 Oct 2026 to 31 Oct 2026" : range === "This Quarter" ? "01 Oct 2026 to 31 Dec 2026" : "01 Jan 2026 to 31 Dec 2026";
  const maxValue = Math.max(...report.rows.map(([, amount]) => amount), 1);
  return <div className="workspace-screen">
    <Link className="back-link" to="/reports"><ArrowLeft size={15} /> Reports Center</Link>
    <PageHeading eyebrow="Business Overview · Demo report" title={report.title} description={`From ${period} · ${basis} basis`} actions={<Button variant="secondary" onClick={() => setMessage({ title: "Export is disabled", description: "This prototype does not create files or export tenant data." })}>Export</Button>} />
    <Panel className="report-controls">
      <div className="report-control-group"><label>Date range<select value={range} onChange={(event) => setRange(event.target.value)}><option>This Month</option><option>This Quarter</option><option>This Fiscal Year</option></select></label><label>Report basis<select value={basis} onChange={(event) => setBasis(event.target.value)}><option>Accrual</option><option>Cash</option></select></label><Button onClick={() => window.dispatchEvent(new CustomEvent("books-demo-toast", { detail: `${report.title} refreshed with fictional demo figures.` }))}>Run Report</Button></div>
      <div className="report-control-bottom"><button className="text-action" onClick={() => setMessage({ title: "More filters · Preview", description: "This report family’s additional filter controls are not implemented in the local demo." })}>More Filters <ChevronRight size={14} /></button><div className="view-toggle"><button className={view === "table" ? "active" : ""} onClick={() => setView("table")}><Table2 size={15} /> Table View</button><button className={view === "chart" ? "active" : ""} onClick={() => setView("chart")}><BarChart3 size={15} /> Chart View</button></div></div>
    </Panel>
    <Panel className="report-output" title={`Northstar Goods · ${report.title}`} action={<span className="subtle-tag">Fictional figures</span>}>
      <div className="report-output-meta">Basis: {basis} <span>·</span> Period: {range}</div>
      {view === "table" ? <div className="table-scroll"><table className="records-table report-table"><thead><tr><th>{report.column}</th><th className="align-right">Total (ZMW)</th></tr></thead><tbody>{report.rows.map(([label, value]) => <tr className={/total|profit|closing|unbilled/i.test(label) ? "summary-row" : ""} key={label}><td>{label}</td><td className="amount-cell">{formatMoney(value)}</td></tr>)}</tbody></table></div> : <div className="report-chart">
        {report.rows.slice(0, 5).map(([label, value]) => <div className="report-chart-row" key={label}><span>{label}</span><div><i style={{ width: `${Math.max(8, (value / maxValue) * 90)}%` }} /></div><strong>{formatMoney(value)}</strong></div>)}
      </div>}
      <div className="report-footnote">Amount is displayed in fictional base currency ZMW.</div>
    </Panel>
    <Modal open={!!message} title={message?.title ?? "Report action"} description={message?.description} onClose={() => setMessage(null)} footer={<Button onClick={() => setMessage(null)}>Close</Button>}>
      <Notice tone="amber">Filters and view changes are local demonstrations. No file is exported or shared.</Notice>
    </Modal>
  </div>;
}

const settingGroups = [
  { title: "Organization", icon: Building2, items: ["Profile", "Branding", "Locations"] },
  { title: "Users & Roles", icon: BriefcaseBusiness, items: ["Users", "Roles", "User Preferences"] },
  { title: "Taxes & Compliance", icon: ShieldCheck, items: ["Taxes", "TDS"] },
  { title: "Setup & Configurations", icon: Settings2, items: ["General", "Currencies", "Payment Terms", "Opening Balances", "Reminders", "Customer Portal", "Vendor Portal"] },
  { title: "Customization", icon: FileText, items: ["Transaction Number Series", "PDF Templates", "Email Notifications", "Reporting Tags"] },
  { title: "Automation", icon: BookOpenCheck, items: ["Workflow Rules", "Workflow Actions", "Workflow Logs", "Schedules"] },
  { title: "Module Settings", icon: WalletCards, items: ["Customers and Vendors", "Items", "Banking", "Projects", "Invoices", "Bills", "Payments Received"] },
];

export function SettingsIndex() {
  const [selected, setSelected] = useState("");
  const settingsRoutes: Record<string, string> = { "PDF Templates": "/settings/templates", "Workflow Rules": "/settings/automation", "Workflow Actions": "/settings/automation", "Workflow Logs": "/settings/automation", Schedules: "/settings/automation" };
  return <div className="workspace-screen">
    <PageHeading eyebrow="Books · Demo" title="Settings" description="Browse reusable organization and module settings patterns." />
    <div className="settings-grid">{settingGroups.map(({ title, icon: Icon, items }) => <Panel key={title} title={title} className="settings-card"><div className="settings-links">{items.map((item) => item === "General" ? <Link key={item} to="/settings/general">{item}<ChevronRight size={14} /></Link> : settingsRoutes[item] ? <Link key={item} to={settingsRoutes[item]}>{item}<ChevronRight size={14} /></Link> : <button key={item} onClick={() => setSelected(item)}>{item}<ChevronRight size={14} /></button>)}</div><Icon className="settings-card-icon" size={18} /></Panel>)}</div>
    <Notice tone="amber">Settings shown here are fictional. Saving, user management, payment gateways and integrations are not connected.</Notice>
    <Modal open={!!selected} title={`${selected} · Preview`} description="This setting is shown as a local UI prototype only." onClose={() => setSelected("")} footer={<Button onClick={() => setSelected("")}>Close</Button>}>
      <Notice tone="blue">No organization, permission or integration setting can be changed from this demo.</Notice>
    </Modal>
  </div>;
}

export function SettingsGeneral() {
  const [saved, setSaved] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const { resetDemo } = useWorkspace();
  const modules = ["Quotes", "Sales Orders", "Sales Receipts", "Purchase Orders", "Time Tracking", "Recurring Invoice", "Recurring Expense", "Recurring Bills", "Credit Note", "Payment Links"];
  return <div className="workspace-screen">
    <Link className="back-link" to="/settings"><ArrowLeft size={15} /> All Settings</Link>
    <PageHeading eyebrow="Setup & Configurations" title="General" description="A fictional preference panel modeled on the observed Books settings layout." actions={<><Button variant="secondary" onClick={() => setResetOpen(true)}>Reset demo data</Button><Button onClick={() => setSaved(true)}><Check size={15} /> Save Demo Preferences</Button></>} />
    <Notice tone="amber">Saving below affects this screen’s local demo state only. It will not change any real Books settings.</Notice>
    <Panel title="Modules" className="settings-form-panel"><p className="settings-help">Select the modules to display in the demo navigation.</p><div className="settings-checkbox-grid">{modules.map((item, index) => <label key={item}><input type="checkbox" defaultChecked={index < 7} />{item}</label>)}</div></Panel>
    <Panel title="Transaction preferences" className="settings-form-panel"><div className="settings-options"><fieldset><legend>Do you give discounts?</legend><label><input type="radio" name="discount" defaultChecked /> I don't give discounts</label><label><input type="radio" name="discount" /> At line item level</label><label><input type="radio" name="discount" /> At transaction level</label></fieldset><fieldset><legend>Tax display</legend><label><input type="radio" name="tax" defaultChecked /> Tax exclusive</label><label><input type="radio" name="tax" /> Tax inclusive</label></fieldset><fieldset><legend>Rounding</legend><label><input type="radio" name="rounding" defaultChecked /> No rounding</label><label><input type="radio" name="rounding" /> At transaction level</label></fieldset></div></Panel>
    <Panel title="Security & public links" className="settings-form-panel"><label className="settings-toggle"><input type="checkbox" /> Require identity verification in this fictional preview</label><p className="settings-help">Actual security changes are intentionally unavailable.</p></Panel>
    <Modal open={saved} title="Preferences saved locally" description="The displayed preferences are still only a browser-local prototype." onClose={() => setSaved(false)} footer={<Button onClick={() => setSaved(false)}>Done</Button>}><Notice tone="green">No live organization setting was changed.</Notice></Modal>
    <Modal open={resetOpen} title="Reset fictional demo data?" description="This restores the sample records stored in this browser." onClose={() => setResetOpen(false)} footer={<><Button variant="secondary" onClick={() => setResetOpen(false)}>Cancel</Button><Button variant="danger" onClick={() => { resetDemo(); setResetOpen(false); }}>Reset demo data</Button></>}><Notice tone="amber">Only the prototype’s localStorage is reset. No Zoho Books data is affected.</Notice></Modal>
  </div>;
}

export function BankingScreen() {
  const [open, setOpen] = useState(false);
  return <div className="workspace-screen">
    <PageHeading eyebrow="Books · Demo" title="Banking" description="A safe preview of the bank-account setup entry point." />
    <div className="banking-hero panel"><div className="banking-illustration"><Banknote size={36} /></div><h2>Stay on top of your money</h2><p>Connect a bank account to match sample transactions with your books. In this prototype, no bank connection is available.</p><div className="banking-actions"><Button onClick={() => setOpen(true)}>Connect Bank / Credit Card</Button><Button variant="secondary" onClick={() => setOpen(true)}>Add Manually</Button></div><button className="text-action" onClick={() => setOpen(true)}>Skip for now</button></div>
    <Panel title="Bank and credit cards"><EmptyState icon={<WalletCards size={20} />} title="No demo bank accounts" description="A sample account can be explored after adding fictional details in a future prototype pass." /></Panel>
    <Modal open={open} title="Bank connection disabled" description="This UI prototype cannot connect to a bank or create a live account." onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Close</Button>}><Notice tone="amber">No credentials, account numbers or transactions are requested or transmitted.</Notice></Modal>
  </div>;
}

export function ChartOfAccountsScreen() {
  const [search, setSearch] = useState("");
  const accounts = [
    ["Accounts Receivable", "1100", "Accounts Receivable", "Asset"], ["Operating Bank", "1010", "Cash", "Asset"],
    ["Prepaid Expenses", "1200", "Other Current Asset", "Asset"], ["Accounts Payable", "2100", "Accounts Payable", "Liability"],
    ["Sales", "4000", "Income", "Income"], ["Consulting Revenue", "4100", "Income", "Income"],
    ["Office Supplies", "6100", "Expense", "Expense"], ["Travel Expense", "6200", "Expense", "Expense"],
  ];
  const filtered = accounts.filter((account) => account.join(" ").toLowerCase().includes(search.toLowerCase()));
  return <div className="workspace-screen"><PageHeading eyebrow="Accountant · Demo" title="Chart of Accounts" description="A small, fictional chart for layout reference." actions={<Button variant="secondary" onClick={() => window.dispatchEvent(new CustomEvent("books-demo-toast", { detail: "Account creation is disabled in this preview." }))}>New Account</Button>} />
    <Panel className="list-toolbar"><label className="list-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search accounts" /></label><span className="subtle-tag">Active Accounts</span></Panel>
    <div className="panel records-panel"><div className="table-scroll"><table className="records-table"><thead><tr><th>Account name</th><th>Account code</th><th>Account type</th><th>Classification</th></tr></thead><tbody>{filtered.map(([name, code, type, group]) => <tr key={code}><td><strong>{name}</strong></td><td>{code}</td><td>{type}</td><td><span className="subtle-tag">{group}</span></td></tr>)}</tbody></table></div></div>
    <Notice tone="amber">Account names and balances are fictional. No chart-of-account settings are connected.</Notice>
  </div>;
}

export function TransactionLockingScreen() {
  const [open, setOpen] = useState(false);
  return <div className="workspace-screen"><PageHeading eyebrow="Accountant · Demo" title="Transaction Locking" description="A preview of the lock-status cards and configuration affordances." actions={<Button variant="secondary" onClick={() => setOpen(true)}>Configure</Button>} />
    <Notice tone="amber">No transaction can be locked, frozen or changed from this prototype.</Notice>
    <div className="lock-grid">{["Sales", "Purchases", "Banking", "Accountant"].map((item) => <Panel key={item} title={item} className="lock-card"><p>You have not locked transactions in this demo module.</p><Button variant="secondary" onClick={() => setOpen(true)}><LockKeyhole size={15} /> Lock</Button></Panel>)}</div>
    <Panel title="Lock all transactions at once"><p className="settings-help">Global transaction locking is shown for reference only.</p><Button variant="secondary" onClick={() => setOpen(true)}>Preview lock all</Button></Panel>
    <Modal open={open} title="Locking is disabled" description="A real transaction lock can affect accounting records." onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Close</Button>}><Notice tone="amber">The prototype records no lock state and cannot change live Books settings.</Notice></Modal>
  </div>;
}

export function DocumentsScreen() {
  const [section, setSection] = useState("Inbox");
  const [open, setOpen] = useState(false);
  return <div className="workspace-screen"><PageHeading eyebrow="Books · Demo" title="Documents" description="A local document-inbox layout. Uploads and autoscan are disconnected." actions={<Button variant="secondary" onClick={() => setOpen(true)}>Enable Autoscan</Button>} />
    <div className="documents-layout"><aside className="panel document-nav"><strong>Documents</strong>{["Inbox", "Files", "Bank Statements", "Folders", "Trash"].map((value) => <button key={value} className={section === value ? "active" : ""} onClick={() => setSection(value)}>{value}<ChevronRight size={14} /></button>)}</aside>
      <Panel title={section} action={<Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Create New Folder</Button>} className="documents-content"><EmptyState icon={<FolderOpen size={22} />} title={section === "Inbox" ? "Your inbox is clear" : `No ${section.toLowerCase()} yet`} description="Files and statements cannot be uploaded or processed in this prototype." action={<Button variant="secondary" onClick={() => setOpen(true)}>Add file (disabled)</Button>} /></Panel>
    </div>
    <Modal open={open} title="Documents are disconnected" description="Autoscan, uploads and folder creation are disabled in this UI-only demo." onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Close</Button>}><Notice tone="amber">No document is uploaded, scanned, imported or stored by this app.</Notice></Modal>
  </div>;
}
