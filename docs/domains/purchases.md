# Purchases and payables

> Authorization update: this source note was researched under the original read-only instruction. The later user message permits button-level testing and low-impact synthetic record creation where safe after the explicit dashboard-ready signal. Current action boundaries are in [interaction coverage](../interaction-coverage-plan.md); that guidance supersedes older blanket read-only wording below. No tenant exploration or creation has occurred.

**Planning note only.** The selected Global organization is still at Organization Setup. Do not access authenticated Zoho pages or capture tenant records. Wait for an explicit dashboard-ready signal before prototyping or matching Books UI. Public help pages describe product workflows; they do not verify this Global tenant or its screens.

## Candidate capture scope

- **Bills:** Candidate read-only sequence: Bills overview/list → bill detail → journal view or recorded-payment detail. The public overview also names Create Bill, Record Payment, Import Bills, Apply Credits to Bill, and Create Vendor Credits; these are documented workflow entry points, not permission to perform them. For capture planning, inspect only already-existing, non-sensitive records and visible navigation after readiness; do not create, edit, import, pay, apply credits, approve, or otherwise change state. [1]
- **Purchase approvals:** The help page documents Settings → Organization → Approvals → Purchase Approvals, with choices for no approval, all permitted approvers, or multi-level approvers. Treat settings/configuration and approval actions as out of bounds for read-only capture. It lists Bills, Vendor Credits, and Purchase Orders as covered transactions and notes up to 10 approvers. This page is explicitly for the **old** approvals version and links to a newer flow. [2]
- **Unverified candidates:** Vendors, expenses, purchase-order create/detail lifecycle, vendor-credit lifecycle beyond the names above, payments-made screens beyond bill payment references, and Documents Inbox are in the requested candidate domain but are not substantiated as screen flows by the fetched sources. Keep them out of a confirmed workflow map until supported by public documentation or a dashboard-ready, authorized observation.

## Shared screen families to plan for

The sources support planning for a transaction overview/list, transaction detail with related actions or journal/payment references, and an organization-level purchase-approval settings page. A create form is a candidate for Bills because Create Bill is named, but its fields and exact layout are not documented by the overview page. Do not assume other modules share these screens or labels.

## Dependencies and uncertainty

The Bills help page is headed **US-EN** and its links resolve under `/us/books/`; it also exposes a Global-English edition selector. That is not evidence that its details are Global-specific. The page lists combined expense-and-bill record limits for Professional, Premium, Elite, and Ultimate, so limits are plan-dependent; this does not establish the selected organization’s plan or entitlements. [1] The approvals page also displays US-EN and a Global selector, and warns that it covers the old approvals version. Availability, exact labels, approval setup, role access, and candidate modules in the selected Global organization remain unverified. No public-doc screenshots were used or treated as proof of tenant state.

## References

[1]: https://www.zoho.com/books/help/bills/ "Overview - Bills"
[2]: https://www.zoho.com/books/help/transaction-approval/enable-transaction-approval.html "Enable Transaction Approval"
