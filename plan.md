# Zoho Books UI reference and prototype plan

## Scope and current state

This is a separate Webdev project for the same user-selected Zoho Books **Global** organization, not a modification of Zoho Procurement or `/home/ubuntu/procureui`. The user confirmed the Books dashboard is ready. Authenticated observation used **My Browser**, and the dashboard, org header and ZMW/Global context were visible. The initial Organization Setup form was not submitted, and “Get Started” was not clicked.

Browser exploration has begun. It covered the dashboard, module lists, representative empty/list states, item detail tabs, blank invoice/quote/customer/bill/journal forms, report index/detail, settings index/preferences, banking onboarding and Documents Inbox. Opening forms was limited to blank, unsubmitted forms and reversible dialogs. No accounting record was created, edited, deleted, sent, paid, approved, exported or imported; no bank/feed/integration was connected; no accounting/security settings were saved. One report-favorite toggle was accidentally hit while aiming for a report row, then toggled off; Favorites was checked and confirmed empty. Visiting the report updated its system “Last Visited” metadata; that low-impact access metadata cannot be rolled back. This is logged privately.

The browser returns its rendered screenshots in action results but reports an empty “Clean screenshot path”; no PNG/JPG/WEBP artifacts were saved to the private screenshots directory. The visual captures therefore exist in the authenticated-browser task results, not as locally attached files. Do not describe the raw-image archive as complete. Screen and interaction coverage also remains partial; unvisited/unreachable screens are explicitly unverified.

## Reference approach

Prior public help research defines candidate workflows, not tenant truth. The selected Global UI evidence takes precedence; keep public-doc candidates distinct from tenant-verified screens, locally simulated interactions and blocked/unverified actions. Use one reference per canonical screen family with meaningful module variations, not a duplicate page per workflow. Preserve tenant-specific images and notes privately; never put them in application assets, public storage, commits or the private backup.

The current verified screen inventory and behavior log are in `docs/verified-screen-patterns.md`, `docs/reference-manifest.json` and ignored `reference-private/notes/tenant-capture-index.md`. `docs/interaction-coverage-plan.md` records scope and action boundaries. The original browser capture outputs remain in the task session only, not as files.

## Frontend implementation

Build the separate prototype as React + TypeScript + Tailwind with Vite on the existing managed Webdev runtime at port 3000. This is a frontend-only product: no backend, managed database, authentication, Zoho API, gateway, external integration or actual accounting operation. Use fictional records only. App state is held in memory and browser `localStorage` under a project-specific key; a persistent banner states that the data is fictional and stays in this browser. Local create/edit/delete/status changes are simulations only and never call Zoho or any external service. Email, export, upload, payment, approval and bank-connect affordances either show a safe local explanation/preview or remain visibly disabled; they cannot reach a real service.

Start from the actual Books layout: narrow dark-navy top chrome, an icon-led left navigation rail on desktop, white work canvas, slim gray borders and blue primary actions. The observed app uses compact Inter-like sans typography and ZMW defaults; the prototype uses **fictional** ZMW values and names. Reflow the navigation to a phone drawer/bottom bar, replace wide tables with touch-friendly cards, and keep transaction forms single-column on small viewports.

Reusable components and screen families: `AppShell` and responsive navigation; dashboard cards/charts; module list with search/filter/sort, empty state and cards/table; transaction form and line-item editor; record detail with Overview/Transactions/History tabs; reusable dialog; Reports Center and table/chart report view; settings index, general preferences, template library and automation list; and Banking setup status. `src/data.ts` maps module labels, data columns, statuses, actions and form variants to these canonical layouts. Routes cover the dashboard, sales/purchases and other lists, representative forms/details, reports, settings/templates/automation, Banking and Accountant; unverified real workflows remain labeled as prototype concepts rather than asserted tenant capability.

### Structure

- `src/App.tsx`, `src/main.tsx` — client routes, app entry and provider setup.
- `src/components/` — shared navigation, toolbar, controls, data list, status chip, dialog and form rows.
- `src/screens/` — dashboard, list/detail, transaction editor, reports and settings families.
- `src/data.ts`, `src/types.ts`, `src/state/WorkspaceContext.tsx` — fictional seed data, workflow registry/types and project-namespaced local-only mutations.
- `src/styles.css` — Tailwind entry point, design tokens and responsive styles.
- `public/manus-routes.json` — synchronized declarations for implemented UI routes.
- `docs/` — sanitized coverage, decisions and references; `reference-private/` remains ignored.

## Design direction

- **Design movement:** a calm finance-workspace interpretation of the verified Zoho Books Global chrome, using familiar density and blue action affordances with a friendlier, touch-first responsive surface.
- **Core principles:** trustworthy hierarchy; fast scanning; low-friction, reversible local interactions; honest demo-state disclosure.
- **Color philosophy:** white canvas and deep navy chrome frame accounting content with calmness; accessible blue marks primary action, while restrained green/amber/red communicate fictional status rather than celebration.
- **Layout paradigm:** a persistent navigation rail and broad document workspace on desktop; on mobile, a compact header plus drawer/bottom navigation and stacked, scrollable record cards.
- **Signature elements:** compact blue-led page title/action row; thin cool-gray dividers around data-rich work areas; status chips with icon plus text (never color alone).
- **Interaction philosophy:** direct manipulation, keyboard-friendly controls, no surprise mutations, and explicit “demo only” explanations for consequential-looking actions.
- **Animation:** 120–180 ms fades/slides for drawers/dialogs, gentle chart transitions, no bouncy motion, preserve reduced-motion preference, and avoid animated value changes that could imply real accounting effects.
- **Typography:** Inter (matching the app’s observed typography direction); semibold 14–16 px labels, 22–28 px page titles, tabular numerals for money, muted 12–13 px supporting metadata.
- **Brand essence:** “A practical Books-like workspace for exploring a small business ledger without touching a live book.” Personality: clear, steady, approachable.
- **Brand voice:** concise and operational. Examples: “A tidy view of what needs attention.” “Demo action only — nothing is sent or posted.”
- **Wordmark & logo:** a small custom outlined ledger-book glyph with a folded blue corner, paired with “Books demo”; do not represent it as the official Zoho logo.
- **Signature brand color:** Zoho Books-inspired action blue `#408DFB`, paired with navy chrome; keep contrast accessible.

## Saving and delivery

Keep the new Books project separate from the Procurement project. Its managed Git repository remains canonical and `Greenwebb/zoho-books-ui-reference` remains a private backup only. Raw tenant references are Git-ignored. The current config showed managed server/database off and auto-publish off. Keep the website unpublished; do not enable auto-publish. A checkpoint is distinct from website publication.

## Workflow-depth continuation · 21 Oct 2026

The user requested drilling every workflow beyond explanation-only dialogs. Expand this existing project incrementally rather than replacing the app shell. Implement reusable multi-step forms with required-field validation, item/journal/allocation grids, review/edit/back/cancel steps, committed browser-local records, linked detail pages, receipts and timeline history. Include sales/customer/quote/invoice/payment/credit/recurring flows; vendor/expense/bill/order/payment/approval/credit flows; banking/manual account/import/matching/categorization/rules/reconciliation; accounts/journals/locks/budgets/tax/currencies; inventory/projects/tasks/time/billing; settings/templates/documents/reports/automation configuration and local test execution.

Six domain specification modules share `src/workflows/contracts.ts`. A shared workflow workbench renders their field groups and performs local-only effects through a deterministic engine and the existing data provider. Auxiliary artifacts and receipts persist under their own browser-local key. Existing lists and create routes link into the deeper workbench; details expose contextual actions. Documents, email, webhook, portal and schedule outcomes are browser simulations only—not externally sent, scheduled or executed. Keep one persistent scope banner; operational dialogs contain actual fields, review and results instead of generic “UI-only placeholder” notices. Evidence metadata stays in the coverage documentation rather than repeated across the product.

No live financial record submission, posting, payment, export, message, approval or security/accounting setting change is authorized by a broad instruction to finish workflows. Further tenant discovery can inspect unsubmitted forms and safe dialogs only; it must not claim unperformed final actions as tenant-verified. Native testing is not applicable to this web-only project. Commit incrementally, test the web build/runtime, and save final intended source to both Books repositories without publication.
