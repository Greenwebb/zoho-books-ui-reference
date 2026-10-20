# Zoho Books UI reference and prototype plan

The approved project is a separate Zoho Books Global edition reference and frontend prototype. It does not extend or alter Zoho Procurement, `/home/ubuntu/procureui`, or either selected delivery/application repository. The new managed workspace is `/home/ubuntu/booksui`.

## Current permitted stage

Initialize the separate project and prepare public-document candidate coverage only. The parent observed the selected Global organization at its initial Organization Setup form. That observation is handoff evidence, not a screenshot taken in this task. The user will finish setup manually. Do not click Get Started or submit the form. Do not open authenticated Books pages or capture tenant screenshots until an explicit dashboard-ready message arrives here or from the parent task. Do not infer readiness from elapsed time or public documentation.

After that signal, inspect only the same selected Global organization. The user's subsequent instruction permits button-level interaction testing and low-impact creation where safe; this supersedes the original blanket read-only limit. See `docs/interaction-coverage-plan.md` for the current authorization and button inventory approach. Prefer non-mutating inspection, use visibly fictional test data only where appropriate, and do not execute payments, external messages, destructive actions, integration/accounting setting changes or live financial submissions casually for UI discovery. Exact high-impact actions retain their applicable confirmation gates. Public docs are candidate workflows, not instructions to execute against the tenant. Leave unreachable or unsafe steps honestly unverified.

## Reference approach

Public documentation supplies candidate workflow coverage and reusable canonical screen families. Public docs can route to regional help even from edition-neutral URLs; record the actual edition shown and do not treat regional examples as Global tenant evidence. Plan, role, module enablement, region and setup dependencies remain unverified until observed safely.

Capture one representative reference for each canonical screen family, plus only meaningful variations. Map each workflow to its canonical screen and component set rather than building duplicate pages per workflow. Distinguish public-doc-supported candidates, tenant-verified references, inaccessible or unavailable features, blocked steps and synthetic prototype behavior. An unavailable feature requires observed evidence; absence of a screenshot is only unverified.

Store raw tenant references privately outside the frontend's public assets and exclude them from commits and backups. Keep a separate sanitized manifest of coverage metadata. Public-document notes can be committed. Never upload screenshots to public asset storage.

## Frontend implementation after verified references

Use React, TypeScript, Tailwind CSS and a Vite frontend-only build. Keep managed server and database capabilities off. Do not add backend routes, authentication, Zoho API calls, financial gateways or real accounting operations. Fictional demonstration data lives only in memory and browser localStorage with a project-specific key; display its synthetic nature persistently. Any local save or status transition is only a simulation. Email, public sharing, exports, uploads, payment and approval controls must never reach real services or real tenant state.

Create reusable application shell, module navigation, record list, filter toolbar, responsive record cards/table, transaction editor, line-item editor, record-detail workspace, status badge, allocation panel, wizard stepper, dialog, report view and settings section. The workflow registry supplies data and layout variations to these screen families. The expected candidates cover sales and receivables; purchases and payables; banking and cash; accountant and tax; items, inventory, projects and time; reports, organization settings and integrations. Coverage selection must be reconciled against observed Global screens before calling a screen Books-matched.

## Design direction

The accepted Procurement reference style is a starting point, not permission to invent Books screen details. That workspace is not present in this sandbox, so its exact typography, spacing and tokens remain to be recovered read-only when available. Verified Books screenshots take precedence for structural accuracy.

Use a modern, friendly accounting workspace rather than a landing page. Begin with mobile-phone layouts: a compact top bar, drawer navigation, touch-sized controls, record cards and single-column forms. Scale to desktop with sidebar navigation, dense tables and split list/detail layouts. Use clear visual hierarchy and a restrained, accessible status palette. Keep interactions quiet, preserve focus and support reduced motion. Final colors, typography and Books chrome remain reference-dependent, not frozen speculative choices.

## Project structure

`docs/domains/` contains official-public-document candidate notes per domain. `docs/books-coverage-plan.md` combines those notes into the reusable coverage plan. `docs/capture-protocol.md` defines safe read-only reference capture and evidence labels. `docs/reference-manifest.json` tracks readiness, evidence and canonical family references. `reference-private/` holds private capture files locally after permission to inspect; Git and the frontend must exclude this directory. Future `src/components/` contains reusable canonical components; `src/screens/` contains screen-family layouts; `src/data/` contains fictional fixtures and browser-local state; `src/routes/` contains the workflow registry. `public/manus-routes.json` will describe actual routes once they exist. Do not invent routes or scaffold Books screens before the reference gate is cleared.

## Saving and delivery

Maintain the Books project's own Manus-managed repository and an additional new private GitHub backup. The backup does not switch the canonical repository. Verify auto-publish remains false before checkpoint pushes, and never invoke publication. Keep raw tenant captures out of the repository and backup. Deliver the initial planning outcome honestly as project/reference preparation, not as a finished tenant capture or prototype. Continue the remaining stages only after the explicit dashboard-ready signal.
