# Items, inventory, projects and time

> Authorization update: this source note was researched under the original read-only instruction. The later user message permits button-level testing and low-impact synthetic record creation where safe after the explicit dashboard-ready signal. Current action boundaries are in [interaction coverage](../interaction-coverage-plan.md); that guidance supersedes older blanket read-only wording below. No tenant exploration or creation has occurred.

Planning note only. This is based on public Zoho Books help, not on the selected Global organization. No authenticated Zoho pages or tenant records were accessed. Do not treat these sources as screenshots or verification of the Global tenant. Prototype and Books-matched UI work remain gated on an explicit dashboard-ready signal.

## Source-supported candidate workflows

- **Create an item:** Items module → Items → **+ New**; item type, name, sales and purchase information; optional inventory information and reporting tags; save. The documented item form offers an inventory-tracking checkbox plus account, opening stock, opening-stock unit rate, reorder point and preferred vendor fields. Candidate read-only capture: list, create/edit form, and item details; exact Global layout remains unverified. [1]
- **Inventory effects:** opening stock can be set on an item, and item quantities are adjusted automatically by sales and purchase transactions (the help gives invoices and bills as examples). Candidate capture can document displayed stock and item/transaction associations only. Creating or editing items, transactions, stock adjustments, or preferences is out of bounds. Any standalone inventory-adjustment workflow is an **unverified candidate** in this research. [1]
- **Projects and time-based billing:** Zoho describes using Time Tracking to manage projects, log time by task or employee using timesheets, and raise invoices. The Projects help contents list enabling time tracking, creating projects, billing method, budget type, tasks, importing projects, and project management with filters, sorting, and card/list views. Specific project fields and click-by-click screens were not read; treat them as **unverified candidates**, not confirmed UI. [2]
- **Timesheets:** the public overview describes creating task time entries and billing customers from them. Its contents list manual entries, starting a timer, importing, filtering/sorting, calendar view, and other entry actions. These are candidate workflows only; detailed fields, invoice-generation steps, and availability in Global were not verified. [3]

## Shared screen families and capture boundary

Likely reusable screen families supported at a high level by the help contents are **record list/management views**, **create/edit forms**, **record details**, and **import selection/mapping/preview**. Project list/card views and timesheet calendar views are specifically listed; the item help describes a new-item form and multi-step import flow. These are workflow-planning labels, not claims that pages share identical UI or that public documentation establishes exact Global screens. [1] [2] [3]

Any later capture should be read-only: observe visible navigation, lists, details, forms without saving, and view/filter/calendar states without changing values. Do not import, create, edit, delete, start a timer, or issue invoices. The current organization is still at Organization Setup, so candidate access and menu visibility are not established; wait for the explicit dashboard-ready signal before prototype or tenant-matched UI work.

## Dependencies and uncertainty

Inventory capture depends on inventory tracking being enabled for the item and on stock being represented through opening stock and sales/purchase transactions. Project/time capture depends on Time Tracking and linked project/task/customer/employee context; the help indexes time-tracking enablement and billing methods, but their exact prerequisites and plan/edition availability were not checked. The Items page shows Free, Standard, Professional, Premium, Elite and Ultimate plans, but that does not establish feature entitlement for this tenant. [1] [2] [3]

All three fetched help pages identify themselves as **US-EN**, show “Global” as one of the available editions/languages, and resolve or link to `/us/books/` paths (the starting Items URL likewise presents US help). Thus the material is US-edition documentation, not demonstrated Global-specific documentation. The page’s edition selector does not verify what applies to the Global tenant. Public docs do not verify tenant state, actual navigation, plan access, or screenshots.

## References

[1]: https://www.zoho.com/books/help/items/ "Items | Help | Zoho Books"
[2]: https://www.zoho.com/us/books/help/projects/ "Projects | Help | Zoho Books"
[3]: https://www.zoho.com/books/help/timesheet/ "Timesheets | Help | Zoho Books"
