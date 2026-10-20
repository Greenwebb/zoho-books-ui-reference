# Accountant and tax

> Authorization update: this source note was researched under the original read-only instruction. The later user message permits button-level testing and low-impact synthetic record creation where safe after the explicit dashboard-ready signal. Current action boundaries are in [interaction coverage](../interaction-coverage-plan.md); that guidance supersedes older blanket read-only wording below. No tenant exploration or creation has occurred.

**Planning note only.** The selected Global organization is still at Organization Setup. Do not access authenticated Zoho pages or inspect or change tenant records. Wait for an explicit dashboard-ready signal before any prototype or Books-matched UI work. Public documentation does not verify the Global tenant or its screens.

## Candidate workflows and screens

- **Manual journals — source-supported candidate.** The US help page documents Accountant → Manual Journals, a new-journal form with date, journal number, notes, reporting method, currency, and account/contact/transaction-type/tax/debit-credit lines; debit and credit totals must balance. Save as Draft or Save and Publish. Drafts do not affect accounts until published. The source also documents a journal list, Details/PDF views, and an Activity Logs tab. [1]
- **Journal import — source-supported candidate.** The documented path is Manual Journals → More → Import → Import Journals, followed by file selection, encoding/delimiter and number options, field mapping, preview, then Import. This is a documented path, not authorization to import or change tenant data. [1]
- **Generic screen families supported by the journal documentation:** module list; create/edit form; record details with Details, PDF, Activity Logs and (where applicable) Related List views; import/file-selection; field mapping; import preview; confirmation/modal or settings dialog. Treat these as candidate families, not verified Global UI. [1]
- **Other in-scope workflows—unverified candidates:** chart-of-accounts review/edit, opening balances, transaction lock date, multicurrency setup, and edition-specific tax/VAT/GST setup. The source used here does not establish their screens or steps. Although manual-journal documentation includes Currency and Tax fields, that alone does not verify organization-wide currency setup or regional tax behavior. [1]

## Capture boundary and dependencies

For a future approved, dashboard-ready capture, keep the work observational and read-only: inspect only visible screens and labels; do not create, edit, publish, import, delete, configure, or confirm changes. Do not use MCP/API or authenticated pages to inspect tenant records. Stop if the required dashboard-ready signal is absent. Any account, opening-balance, lock, currency, or tax workflow remains contingent on confirming that it exists in the Global edition and is visible for this organization and plan.

The cited page identifies itself as **US-EN** and lists plans from Free through Ultimate; its header offers edition/language navigation including Global, but this US-localized page is not proof that the same behavior or UI applies to Global. Regional VAT/GST details and plan-specific availability should therefore be treated as unresolved. [1]

## References

[1]: https://www.zoho.com/us/books/help/accountant/manual-journal.html "Manual Journals | Zoho Books Help"
