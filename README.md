# Zoho Books UI Reference & Prototype

A separate, unpublished React + TypeScript + Tailwind reference/prototype for the user-selected Zoho Books Global organization. It is not Zoho Procurement and does not modify the Procurement website or repositories.

## Current state

The Webdev project is initialized and the frontend prototype is implemented. Server/database capabilities and auto-publish remain off. The user confirmed the Books dashboard was ready before authenticated inspection. Read-only navigation covered the dashboard, module lists, selected detail tabs and blank forms, transaction-preference and bulk-item dialogs, Reports Center and Profit and Loss, Settings/General, invoice templates, Workflow Rules and Email Alerts, Banking setup, Documents Inbox, Accountant and Items. See `docs/verified-screen-patterns.md` and `docs/reference-manifest.json`; these describe partial evidence, not exhaustive coverage.

The React app runs on the project Preview and its production build/typecheck passed. It uses fictional seed records and local browser storage only. The app includes reusable dashboard, module-list/detail, form, report, Settings Templates/Automation, Banking and Documents families. All mutations in the prototype affect synthetic browser-local data. The site has not been published.

Browser screenshots were rendered in task results, but the tool returned blank local screenshot paths; the Workflow Rules result explicitly reported a screenshot upload failure. No raw screenshot binaries are archived under `reference-private/screenshots/`. The screen map and private action index document observed structure and this limitation; they are not a screenshot-file archive. A report Favorite toggle was temporarily activated by a mis-targeted click, then reversed and verified empty. Viewing Profit and Loss updated its system “Last Visited” metadata.

## Scope and boundaries

Only the same user-selected Books Global organization is in scope. No organization setup submission or “Get Started” action was performed. No tenant accounting record was created, edited, deleted, sent, imported/exported, paid, approved or otherwise changed. No bank/feed/integration connection or accounting/security setting was saved. Tenant buttons that could perform consequential actions were not activated. Uninspected workflows and final submission steps remain unverified or blocked.

The prototype is frontend-only: no backend, managed database, authentication, Zoho API, gateway or accounting service. Fictional records use a project-namespaced localStorage key. Email, export, upload, pay, approve, connect, lock and automation operations cannot reach real services. Do not publish this site.

## References and project organization

`plan.md` records implementation and design. `TODO.md` tracks outcomes. `docs/books-coverage-plan.md` and `docs/domains/` contain public-document candidate research, not tenant proof. `docs/verified-screen-patterns.md` and `docs/reference-manifest.json` distinguish observed screens, prototype families and unverified states. `docs/capture-protocol.md` and `docs/interaction-coverage-plan.md` document privacy and action boundaries. `reference-private/` is Git-ignored; do not copy its contents into application source, website assets or repositories.

## Repositories and publication

The Books managed repository remains canonical. `Greenwebb/zoho-books-ui-reference` is a separate private backup only, not a canonical switch. Exclude raw tenant references and secrets. Do not publish or enable auto-publish.

## Remaining work

Further read-only tenant coverage is still needed for unvisited workflows, detail/edit states, tax and import mapping, allocations, approvals, reconciliation and automation/integration configuration. Screenshot files could not be archived through the available browser results; retain that limitation unless a supported private screenshot-export route becomes available.
