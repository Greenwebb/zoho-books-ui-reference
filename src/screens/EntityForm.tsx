import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, CirclePlus, Minus, Paperclip, ShieldCheck, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../data";
import { useWorkspace } from "../state/WorkspaceContext";
import type { DemoRecord, ModuleSpec } from "../types";
import { Button, Modal, Notice, PageHeading } from "../components/Primitives";

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

export function EntityForm({ spec }: { spec: ModuleSpec }) {
  const navigate = useNavigate();
  const { createRecord, data } = useWorkspace();
  const isContact = spec.key === "customers" || spec.key === "vendors";
  const isRecurring = spec.key === "recurringInvoices" || spec.key === "recurringBills";
  const isInvoice = spec.key === "invoices" || spec.key === "quotes" || spec.key === "bills" || spec.key === "purchaseOrders" || isRecurring;
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [date, setDate] = useState("2026-10-20");
  const [dueDate, setDueDate] = useState("2026-11-19");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("0");
  const [customerType, setCustomerType] = useState("Business");
  const [frequency, setFrequency] = useState("Monthly");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [lines, setLines] = useState<LineItem[]>([{ id: 1, description: "", quantity: 1, rate: 0 }]);
  const [error, setError] = useState("");
  const [sendPrompt, setSendPrompt] = useState(false);
  const [recurringPrompt, setRecurringPrompt] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [selectedBulkItems, setSelectedBulkItems] = useState<string[]>([]);

  const lineTotal = useMemo(() => lines.reduce((sum, line) => sum + Math.max(0, line.quantity) * Math.max(0, line.rate), 0), [lines]);
  const total = isContact ? Number(amount) || 0 : lines.some((line) => line.description || line.rate > 0) ? lineTotal : Number(amount) || 0;
  const partyFieldLabel = spec.partyLabel;
  const sendAvailable = spec.key === "invoices" || spec.key === "quotes";
  const recurringAvailable = spec.key === "invoices" || spec.key === "bills";
  const saveStatus: DemoRecord["status"] = isContact || spec.key === "items" || spec.key === "projects" || isRecurring ? "Active" : spec.key === "bills" || spec.key === "purchaseOrders" ? "Open" : spec.key === "expenses" || spec.key === "timesheets" ? "Recorded" : "Draft";

  const buildDraft = (finalStatus: DemoRecord["status"]) => {
    if (!name.trim()) {
      setError(`${isContact ? "Name" : spec.entityLabel} is required.`);
      return;
    }
    if (isInvoice && !party.trim()) {
      setError(`${partyFieldLabel} is required for this demo record.`);
      return;
    }
    setError("");
    const created = createRecord(spec.key, {
      name: name.trim(),
      party: party.trim() || (isContact ? name.trim() : "Demo reference"),
      date,
      dueDate: dueDate || undefined,
      status: finalStatus,
      amount: Math.max(0, total),
      category: isRecurring ? frequency : isContact ? customerType : note.trim() || "Demo entry",
      description: note.trim() || undefined,
      email: isContact ? email.trim() || undefined : undefined,
      phone: isContact ? phone.trim() || undefined : undefined,
    });
    navigate(spec.path, { replace: true, state: { createdId: created.id } });
  };

  const addBulkItems = () => {
    const additions = data.items.filter((item) => selectedBulkItems.includes(item.id)).map((item, index) => ({ id: Date.now() + index, description: item.name, quantity: 1, rate: item.amount }));
    if (additions.length) setLines((current) => [...current, ...additions]);
    setSelectedBulkItems([]);
    setBulkOpen(false);
  };

  const formTitle = `New ${spec.entityLabel}`;
  const currentAction = isRecurring ? "Save Recurring Profile" : spec.key === "bills" ? "Save as Open" : spec.key === "expenses" ? "Save Expense" : spec.key === "timesheets" ? "Log Time" : isContact || spec.key === "items" || spec.key === "projects" ? "Save" : "Save as Draft";

  return (
    <div className="form-screen">
      <div className="form-breadcrumb"><Link to={spec.path}><ArrowLeft size={15} /> {spec.title}</Link><span>New</span></div>
      <PageHeading title={formTitle} description={`Create a fictional ${spec.entityLabel.toLowerCase()} in this browser-only workspace.`} />
      <Notice tone="amber"><ShieldCheck size={16} /> This form is a local prototype. Saving creates only fictional browser data; nothing is posted to Zoho.</Notice>

      <form className="transaction-form" onSubmit={(event) => { event.preventDefault(); buildDraft(saveStatus); }}>
        <div className="form-section">
          <div className="form-section-title"><div><h2>Basic details</h2><p>Fields are modeled on the observed Books layout.</p></div><span className="required-note">* Required</span></div>
          {isContact && <div className="form-field full-width"><span className="field-label">Contact type</span><div className="segmented-control">{["Business", "Individual"].map((value) => <button type="button" key={value} className={customerType === value ? "segment-active" : ""} onClick={() => setCustomerType(value)}>{value}</button>)}</div></div>}
          <div className="form-grid">
            <label className="form-field"><span className="field-label">{isContact ? (spec.key === "vendors" ? "Vendor name" : "Customer name") : `${spec.entityLabel} name`} <b>*</b></span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder={isContact ? "Enter a fictional business or contact" : `e.g. ${spec.entityLabel} for studio services`} /></label>
            {!isContact && <label className="form-field"><span className="field-label">{partyFieldLabel} {isInvoice && <b>*</b>}</span><input required={isInvoice} value={party} onChange={(event) => setParty(event.target.value)} placeholder={spec.key === "bills" || spec.key === "purchaseOrders" || spec.key === "recurringBills" || spec.key === "vendorCredits" ? "Select or type a demo vendor" : spec.key === "batchPayments" ? "Enter fictional vendors" : spec.key === "timesheets" ? "Select a fictional project" : spec.key === "expenses" ? "e.g. Office supplies" : spec.key === "items" ? "e.g. Service" : "Select or type a demo customer"} /></label>}
            {isContact && <label className="form-field"><span className="field-label">Company name</span><input value={party} onChange={(event) => setParty(event.target.value)} placeholder="Optional fictional company" /></label>}
            {isContact && <label className="form-field"><span className="field-label">Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.test" /></label>}
            {isContact && <label className="form-field"><span className="field-label">Phone</span><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Use fictional contact details only" /></label>}
            {isContact && <label className="form-field"><span className="field-label">Opening balance (demo only)</span><input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder="0.00" /></label>}
            {!isContact && !isInvoice && <label className="form-field"><span className="field-label">Amount (ZMW)</span><input type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" /></label>}
            {!isContact && <>
              <label className="form-field"><span className="field-label">{spec.entityLabel} date</span><span className="input-with-icon"><CalendarDays size={15} /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></span></label>
              <label className="form-field"><span className="field-label">Due / expiry date</span><span className="input-with-icon"><CalendarDays size={15} /><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></span></label>
            </>}
            <label className="form-field"><span className="field-label">{isContact ? "Customer language" : "Currency"}</span><select defaultValue={isContact ? "English" : "ZMW"}>{(isContact ? ["English", "French", "Swahili"] : ["ZMW"]).map((value) => <option key={value}>{value}</option>)}</select></label>
            {isInvoice && <label className="form-field"><span className="field-label">Payment terms</span><select defaultValue="Due on Receipt"><option>Due on Receipt</option><option>Net 15</option><option>Net 30</option></select></label>}
            {isRecurring && <label className="form-field"><span className="field-label">Repeat every</span><select value={frequency} onChange={(event) => setFrequency(event.target.value)}>{["Weekly", "Monthly", "Quarterly", "Yearly"].map((value) => <option key={value}>{value}</option>)}</select></label>}
          </div>
        </div>

        {isInvoice && <div className="form-section">
          <div className="form-section-title"><div><h2>Item table</h2><p>Add fictional line items to preview totals.</p></div><label className="toggle-label"><input type="checkbox" checked={taxInclusive} onChange={(event) => setTaxInclusive(event.target.checked)} /> Tax inclusive</label></div>
          <div className="line-table-wrap"><table className="line-table"><thead><tr><th>Item details</th><th>Quantity</th><th>Rate (ZMW)</th><th>Amount</th><th /></tr></thead><tbody>{lines.map((line) => <tr key={line.id}>
            <td><input value={line.description} onChange={(event) => setLines((current) => current.map((entry) => entry.id === line.id ? { ...entry, description: event.target.value } : entry))} placeholder="Type a fictional item or service" /></td>
            <td><input type="number" min="0" step="0.1" value={line.quantity} onChange={(event) => setLines((current) => current.map((entry) => entry.id === line.id ? { ...entry, quantity: Number(event.target.value) } : entry))} /></td>
            <td><input type="number" min="0" step="0.01" value={line.rate} onChange={(event) => setLines((current) => current.map((entry) => entry.id === line.id ? { ...entry, rate: Number(event.target.value) } : entry))} /></td>
            <td className="amount-cell">{formatMoney(line.quantity * line.rate)}</td>
            <td><button type="button" className="icon-button" aria-label="Remove line item" onClick={() => setLines((current) => current.length > 1 ? current.filter((entry) => entry.id !== line.id) : current)}><Trash2 size={14} /></button></td>
          </tr>)}</tbody></table></div>
          <Button type="button" variant="ghost" size="sm" onClick={() => setLines((current) => [...current, { id: Date.now(), description: "", quantity: 1, rate: 0 }])}><CirclePlus size={15} /> Add New Row</Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setBulkOpen(true)}><CirclePlus size={15} /> Add Items in Bulk</Button>
          <div className="form-total-row"><span>Subtotal</span><strong>{formatMoney(total)}</strong></div>
          <div className="form-total-row total-emphasis"><span>Total (ZMW)</span><strong>{formatMoney(total)}</strong></div>
        </div>}

        <div className="form-section">
          <div className="form-section-title"><div><h2>{isContact ? "Additional details" : "Notes & attachments"}</h2><p>Use only made-up details in this prototype.</p></div></div>
          <label className="form-field full-width"><span className="field-label">{isContact ? "Remarks" : "Notes"}</span><textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder={isContact ? "Optional note for the local demo" : "Notes shown only in this local preview"} /></label>
          {!isContact && <button type="button" className="upload-placeholder" onClick={() => setRecurringPrompt(true)}><Paperclip size={15} /> Add attachment <small>Uploads are disabled</small></button>}
        </div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="form-footer">
        <div className="form-footer-actions">
            <Button type="submit">{currentAction}</Button>
            {sendAvailable && <Button type="button" variant="secondary" onClick={() => setSendPrompt(true)}>Save and Send</Button>}
            <Button type="button" variant="ghost" onClick={() => navigate(spec.path)}>Cancel</Button>
          </div>
          {recurringAvailable && <Button type="button" variant="ghost" onClick={() => setRecurringPrompt(true)}><CirclePlus size={15} /> Make Recurring</Button>}
        </div>
      </form>

      <Modal open={sendPrompt} title="Sending is disabled" description="External communication is not available in the Books demo." onClose={() => setSendPrompt(false)} footer={<>
        <Button variant="secondary" onClick={() => setSendPrompt(false)}>Cancel</Button>
        <Button onClick={() => { setSendPrompt(false); buildDraft("Draft"); }}>Save as a local draft</Button>
      </>}>
        <Notice tone="amber">Nothing will be emailed or shared. You can keep the fictional record as a draft in this browser only.</Notice>
      </Modal>
      <Modal open={recurringPrompt} title="Action preview only" description="This prototype does not send files or create real schedules." onClose={() => setRecurringPrompt(false)} footer={<Button onClick={() => setRecurringPrompt(false)}>Close</Button>}>
        <Notice tone="blue"><Minus size={15} /> Uploads, recurring schedules and external services are disconnected. This is a UI-only placeholder.</Notice>
      </Modal>
      <Modal open={bulkOpen} title="Add Items in Bulk" description="Choose from fictional catalog items stored in this browser." onClose={() => { setBulkOpen(false); setSelectedBulkItems([]); }} footer={<><Button variant="secondary" onClick={() => { setBulkOpen(false); setSelectedBulkItems([]); }}>Cancel</Button><Button onClick={addBulkItems}>Add selected ({selectedBulkItems.length})</Button></>}>
        <Notice tone="amber">Selections add only fictional line items to this unsaved demo form. No tenant items or records are accessed.</Notice>
        <div className="bulk-item-list">{data.items.length ? data.items.map((item) => <label key={item.id} className="bulk-item-option"><input type="checkbox" checked={selectedBulkItems.includes(item.id)} onChange={(event) => setSelectedBulkItems((current) => event.target.checked ? [...current, item.id] : current.filter((id) => id !== item.id))} /><span><strong>{item.name}</strong><small>{item.code} · {item.category}</small></span><b>{formatMoney(item.amount)}</b></label>) : <p className="settings-help">No fictional catalog items are available. Add a demo item first.</p>}</div>
      </Modal>
    </div>
  );
}
