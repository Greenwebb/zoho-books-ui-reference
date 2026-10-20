import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, FileDown, Filter, MoreHorizontal, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from "../data";
import { useWorkspace } from "../state/WorkspaceContext";
import type { DemoRecord, ModuleSpec } from "../types";
import { Button, EmptyState, Modal, Notice, PageHeading, StatusPill } from "../components/Primitives";

export function ListScreen({ spec }: { spec: ModuleSpec }) {
  const { data, deleteRecord, updateRecord } = useWorkspace();
  const location = useLocation();
  const navigate = useNavigate();
  const records = data[spec.key];
  const [search, setSearch] = useState(() => new URLSearchParams(location.search).get("q") ?? "");
  const [status, setStatus] = useState("All");
  const [sortDescending, setSortDescending] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [selected, setSelected] = useState<DemoRecord | null>(null);
  const [editing, setEditing] = useState<DemoRecord | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<DemoRecord | null>(null);
  const [tab, setTab] = useState("Overview");
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("q") ?? "");
  }, [location.search]);

  const filtered = useMemo(() => records.filter((item) => {
    const matchesText = `${item.code} ${item.name} ${item.party} ${item.category ?? ""}`.toLowerCase().includes(search.toLowerCase());
    return matchesText && (status === "All" || item.status === status);
  }).sort((a, b) => {
    const nameFirst = ["items", "customers", "vendors", "projects", "budgets"].includes(spec.key);
    const first = spec.key === "timesheets" ? a.date : nameFirst ? a.name : a.code;
    const second = spec.key === "timesheets" ? b.date : nameFirst ? b.name : b.code;
    return first.localeCompare(second, undefined, { numeric: true }) * (sortDescending ? -1 : 1);
  }), [records, search, status, sortDescending, spec.key]);
  const statuses = ["All", ...new Set(records.map((item) => item.status))];
  const openRecord = (item: DemoRecord) => {
    if (spec.key === "items") navigate(`/items/${item.id}`);
    else { setSelected(item); setTab("Overview"); }
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteRecord(spec.key, confirmDelete.id);
    setConfirmDelete(null);
    setSelected(null);
  };

  return (
    <div className="list-screen">
      <PageHeading
        eyebrow="Books · Demo"
        title={spec.title}
        description={`Browse fictional ${spec.title.toLowerCase()} in this local prototype.`}
        actions={<>
          <Button variant="secondary" onClick={() => setInfoOpen(true)}><FileDown size={15} /> Import</Button>
          {spec.createPath && <Button onClick={() => navigate(spec.createPath!)}><Plus size={16} /> {spec.createLabel ?? `New ${spec.entityLabel}`}</Button>}
        </>}
      />

      <div className="list-toolbar panel">
        <label className="list-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${spec.title.toLowerCase()}...`} /></label>
        <div className="toolbar-right">
          <button className="icon-button" aria-label={`Sort ${sortDescending ? "ascending" : "descending"}`} onClick={() => setSortDescending((current) => !current)}><ArrowUpDown size={15} /></button>
          <label className="filter-select"><Filter size={15} /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
          <button className="icon-button filter-button" aria-label="Additional filters" onClick={() => setInfoOpen(true)}><SlidersHorizontal size={16} /></button>
          <div className="more-wrap">
            <button className="icon-button" aria-label="More list actions" aria-expanded={moreOpen} onClick={() => setMoreOpen((value) => !value)}><MoreHorizontal size={18} /></button>
            {moreOpen && <div className="small-menu"><button onClick={() => { setMoreOpen(false); setInfoOpen(true); }}>Export preview</button><button onClick={() => { setMoreOpen(false); setSearch(""); setStatus("All"); }}>Clear filters</button></div>}
          </div>
        </div>
      </div>

      <div className="list-state-line"><span>{filtered.length} {filtered.length === 1 ? "record" : "records"}</span><span>All figures are fictional</span></div>

      {filtered.length === 0 ? (
        <div className="panel"><EmptyState title={search ? "No matching records" : spec.emptyTitle} description={search ? "Try a different search or clear the status filter." : spec.emptyDescription} action={spec.createPath ? <Button onClick={() => navigate(spec.createPath!)}><Plus size={15} /> {spec.createLabel}</Button> : undefined} /></div>
      ) : (
        <div className="records-panel panel">
          <div className="table-scroll"><table className="records-table">
            <thead><tr>{spec.columns.map((column, index) => <th key={column}>{column}{index === 0 && <ArrowUpDown size={12} />}</th>)}<th aria-label="Row actions" /></tr></thead>
            <tbody>{filtered.map((item) => <tr key={item.id}>
              {renderCells(item, spec, () => openRecord(item))}
              <td className="row-actions-cell"><button className="icon-button row-action" aria-label={`Open ${item.code} details`} onClick={() => openRecord(item)}><MoreHorizontal size={17} /></button></td>
            </tr>)}</tbody>
          </table></div>
          <div className="table-footer"><span>Showing {filtered.length} of {records.length}</span><div><button disabled>‹</button><span>1</span><button disabled>›</button></div></div>
        </div>
      )}

      {records.length > 0 && <div className="mobile-record-list">{filtered.map((item) => <button key={item.id} className="mobile-record-card" onClick={() => openRecord(item)}>
        <span className="mobile-card-head"><strong>{item.code || item.name}</strong><StatusPill status={item.status} /></span>
        <span className="mobile-card-title">{item.name}</span>
        <span className="mobile-card-meta">{item.party} · {item.date}</span>
        <span className="mobile-card-total">{formatMoney(item.amount)}</span>
      </button>)}</div>}

      <Modal open={!!selected} title={selected?.name ?? "Record details"} description={selected ? `${selected.code} · Fictional demo record` : undefined} onClose={() => setSelected(null)} width="lg" footer={selected && <>
        <Button variant="secondary" onClick={() => { setEditing(selected); setSelected(null); }}>Edit local demo</Button>
        <Button variant="danger" onClick={() => setConfirmDelete(selected)}><Trash2 size={15} /> Delete local demo</Button>
        <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
      </>}>
        {selected && <>
          <div className="detail-tabs">{["Overview", "Transactions", "History"].map((value) => <button key={value} className={tab === value ? "detail-tab active" : "detail-tab"} onClick={() => setTab(value)}>{value}</button>)}</div>
          {tab === "Overview" ? <div className="detail-grid">
            <DetailField label={spec.entityLabel} value={selected.name} />
            <DetailField label={spec.partyLabel} value={selected.party} />
            <DetailField label="Reference" value={selected.code} />
            <DetailField label="Date" value={selected.date} />
            <DetailField label="Due date" value={selected.dueDate || "—"} />
            <DetailField label="Amount" value={formatMoney(selected.amount)} />
            <DetailField label="Status" value={<StatusPill status={selected.status} />} />
            <DetailField label="Category" value={selected.category || "—"} />
            {selected.email && <DetailField label="Email" value={selected.email} />}
            {selected.phone && <DetailField label="Phone" value={selected.phone} />}
          </div> : tab === "Transactions" ? <EmptyState title="No linked transactions" description="This local example has no related transactions." /> : <div className="history-entry"><span className="history-dot" /><div><strong>Created in demo workspace</strong><small>{selected.date} · local browser only</small></div></div>}
          <Notice tone="amber">This detail is a fictional UI simulation. No real books or contacts are connected.</Notice>
        </>}
      </Modal>

      {editing && <EditRecordModal record={editing} entityLabel={spec.entityLabel} partyLabel={spec.partyLabel} onClose={() => setEditing(null)} onSave={(changes) => { updateRecord(spec.key, editing.id, changes); setEditing(null); }} />}

      <Modal open={!!confirmDelete} title="Delete local demo record?" description="This only removes a fictional record from this browser." onClose={() => setConfirmDelete(null)} footer={<>
        <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete demo record</Button>
      </>}>
        <Notice tone="amber">No Zoho data is changed. The action affects only the local prototype data.</Notice>
      </Modal>

      <Modal open={infoOpen} title="Not connected to a live service" description="Importing or exporting tenant data is intentionally unavailable in this prototype." onClose={() => setInfoOpen(false)} footer={<Button onClick={() => setInfoOpen(false)}>Understood</Button>}>
        <Notice tone="blue">Search, filters and sorting work against fictional browser-local data. No file is uploaded or downloaded.</Notice>
      </Modal>
    </div>
  );
}

function renderCells(item: DemoRecord, spec: ModuleSpec, onOpen: () => void) {
  if (spec.key === "timesheets") return <>
    <td>{item.date}</td><td>Alex Morgan (demo)</td><td>{item.party}</td><td>{item.category}</td><td><StatusPill status={item.status} /></td>
  </>;
  if (spec.key === "items") return <>
    <td><button className="table-primary-link" onClick={onOpen}><strong>{item.name}</strong><small>{item.code}</small></button></td>
    <td>{item.party}</td><td className="amount-cell">{formatMoney(item.amount)}</td><td><StatusPill status={item.status} /></td>
  </>;
  if (spec.key === "customers" || spec.key === "vendors") return <>
    <td><button className="table-primary-link" onClick={onOpen}><strong>{item.name}</strong><small>{item.code}</small></button></td>
    <td>{item.party}</td><td className="muted-cell">{item.email || "—"}</td><td className="amount-cell">{formatMoney(item.amount)}</td>
  </>;
  if (spec.key === "expenses") return <>
    <td><button className="table-primary-link" onClick={onOpen}><strong>{item.code}</strong><small>{item.name}</small></button></td>
    <td>{item.category}</td><td>{item.date}</td><td><StatusPill status={item.status} /></td><td className="amount-cell">{formatMoney(item.amount)}</td>
  </>;

  const nameFirst = spec.key === "projects" || spec.key === "budgets";
  return <>
    <td><button className="table-primary-link" onClick={onOpen}><strong>{nameFirst ? item.name : item.code}</strong><small>{nameFirst ? item.code : item.name}</small></button></td>
    {spec.columns.slice(1).map((column) => <td key={column} className={/amount|budget|receivable|payable/i.test(column) ? "amount-cell" : ""}>{renderColumn(column, item)}</td>)}
  </>;
}

function renderColumn(column: string, item: DemoRecord) {
  const normalized = column.toLowerCase();
  if (normalized.includes("status")) return <StatusPill status={item.status} />;
  if (normalized.includes("due") || normalized.includes("next date")) return item.dueDate || "—";
  if (normalized.includes("date")) return item.date;
  if (/amount|budget|receivables|payables/.test(normalized)) return formatMoney(item.amount);
  if (normalized.includes("email")) return item.email || "—";
  if (normalized.includes("user")) return "Alex Morgan (demo)";
  if (normalized.includes("vendor")) return item.party || "3 demo vendors";
  if (normalized.includes("customer") || normalized.includes("project") || normalized.includes("company") || normalized.includes("reference")) return item.party;
  if (normalized.includes("mode")) return item.category || "Bank transfer";
  if (normalized.includes("frequency")) return item.category || "Monthly";
  if (normalized.includes("duration")) return item.category || "1.0 hour";
  if (normalized.includes("period")) return item.category || "Current period";
  if (normalized.includes("type") || normalized.includes("category")) return item.category || item.party;
  return item.party || "—";
}

function DetailField({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="detail-field"><small>{label}</small><strong>{value}</strong></div>;
}

function EditRecordModal({ record, entityLabel, partyLabel, onClose, onSave }: {
  record: DemoRecord;
  entityLabel: string;
  partyLabel: string;
  onClose: () => void;
  onSave: (changes: Partial<DemoRecord>) => void;
}) {
  const [name, setName] = useState(record.name);
  const [party, setParty] = useState(record.party);
  const [date, setDate] = useState(record.date);
  const [dueDate, setDueDate] = useState(record.dueDate ?? "");
  const [amount, setAmount] = useState(String(record.amount));
  const [status, setStatus] = useState<DemoRecord["status"]>(record.status);
  const [error, setError] = useState("");
  const save = () => {
    if (!name.trim()) { setError(`${entityLabel} name is required.`); return; }
    onSave({ name: name.trim(), party: party.trim(), date, dueDate: dueDate || undefined, amount: Math.max(0, Number(amount) || 0), status });
  };
  return <Modal open title={`Edit fictional ${entityLabel.toLowerCase()}`} description={`${record.code} · changes stay in this browser only`} onClose={onClose} width="lg" footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button onClick={save}>Save local changes</Button></>}>
    <div className="edit-demo-form">
      <Notice tone="amber">This updates only this fictional browser-local record; no Zoho entry, message or payment is changed.</Notice>
      <div className="form-grid">
        <label className="form-field"><span className="field-label">{entityLabel} name</span><input value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label className="form-field"><span className="field-label">{partyLabel}</span><input value={party} onChange={(event) => setParty(event.target.value)} /></label>
        <label className="form-field"><span className="field-label">Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <label className="form-field"><span className="field-label">Due date</span><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
        <label className="form-field"><span className="field-label">Amount (fictional ZMW)</span><input type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
        <label className="form-field"><span className="field-label">Local demo status</span><select value={status} onChange={(event) => setStatus(event.target.value as DemoRecord["status"])}>{["Draft", "Sent", "Paid", "Overdue", "Open", "Approved", "Active", "Recorded", "Pending"].map((value) => <option key={value}>{value}</option>)}</select></label>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
    </div>
  </Modal>;
}
