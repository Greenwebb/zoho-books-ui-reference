# Books reference capture protocol

Capture is intentionally paused. The latest explicit handoff says the selected Zoho Books Global organization opens Organization Setup rather than the home screen. This task has not opened authenticated Books, clicked Get Started, submitted setup, or captured new tenant screenshots. The user will finish setup manually. Resume only on an explicit dashboard-ready message here or from the parent task; do not monitor the tenant or assume readiness.

The user's subsequent instruction permits testing buttons and creating low-impact synthetic records where safe to establish behavior. This supersedes the original blanket read-only limit, not the setup gate. `interaction-coverage-plan.md` governs the expanded behavior inventory. Prefer non-mutating reference inspection and retain exact-action safeguards for consequential operations.

## Scope and identity

Use the same user-selected Global edition organization only. On resumption, confirm the displayed organization and edition using read-only UI evidence. Do not create or select a new organization, switch to another edition, or use public regional documentation to infer tenant configuration. Record sensitive identifiers only in the private notes, not the app or public-document reports.

## Navigation and interaction boundaries

Begin with ordinary module navigation, lists, existing record details, tabs, reports and settings display. Inventory all reachable buttons, menus, links, field controls, contextual/bulk actions, nested dialogs and state variations. Record enabled/disabled states, prerequisites, result/destination, validation and cancel/back behavior. If a navigation control may initialize persistent state, assess its effect before using it.

A public help document's procedure is not itself an instruction to execute it. Forms, wizards and dialogs can be opened only where their effects are understood. Under the expanded user permission, ordinary reversible UI tests and low-impact fictional test records may be used where appropriate. Keep fictitious records isolated from real business flows; use no real contact/bank information. Log any tenant mutation privately. Do not delete real records or silently perform cleanup.

Stop before consequential live financial submissions, payments, business approvals, customer/vendor communications or portal invitations, exports of tenant data, integration/feed connections, accounting/security configuration changes and destructive actions unless the exact action has appropriate authorization. Do not upload files merely to reveal later wizard stages when doing so could import/create accounting data. Capture safely reachable previews; describe unexplored commit steps from official docs as public candidates or leave them unverified. Do not use real transactions merely to reach paid, approved, sent or reconciled states.

## Canonical references

Group workflow targets by reusable family: list, form, detail, wizard, confirmation/status, allocation/matching, approval, communication/portal, payment/refund, document/template, settings, report and automation/integration. Capture one representative per family and only significant module/edition variations. Record which workflows reuse each canonical reference. Do not duplicate whole page implementations for every workflow.

Each reference needs a local ID, workflow/family, capture time, organization scope checked, UI entry path, screen state, tabs/dialogs inspected, action log, significant component variations and evidence status. Each control's inventory needs its prerequisite, category and observed result or stopping boundary. Record limitations beside the affected workflow. Never invent screen states or substitute synthetic content while labeling a screenshot genuine.

## Evidence labels

**Public-doc candidate** means the workflow appears in official documentation, possibly another edition, and is not verified for the selected Global organization. **Tenant-verified read-only** means availability or state was observed without mutation. **Observed interaction** means a permitted control was exercised and its result recorded. **Observed control, commit not executed** means a consequential final action was not performed. **Blocked by safety boundary** means the next step could have unacceptable consequences. **Unverified** means evidence is still absent. **Observed unavailable** requires visible plan/permission/feature evidence. **Synthetic demo** means fictional browser-local behavior, not Zoho capability verification.

## Private storage and frontend separation

Store original screenshots only under `reference-private/screenshots/` and sensitive notes/action logs under `reference-private/notes/`. Both are Git-ignored. Do not copy them into `public/`, `src/`, website storage, a public CDN, shared uploads or the GitHub backup. A sanitized coverage manifest may contain reference IDs and non-sensitive evidence labels, but no tenant names, contacts, balances, account numbers, sensitive URLs or private screenshot contents. Do not publish the website.

## Prototype stage

Only after references are available, use fictional fixtures exclusively. Make the synthetic nature visible in the app. Store demo changes only in browser-local state; never read credentials or call Zoho/live accounting services. Local simulation controls must make their lack of real-world effect clear. Use mobile-first reusable React/TypeScript/Tailwind components and responsive desktop patterns, with final visual details tied to verified Books references.
