# Zoho Books UI Reference & Prototype

A separate, unpublished Books Global edition reference project. The project is not Zoho Procurement and does not modify the Procurement website or existing application repositories.

## Current state

The new managed Webdev project is initialized. Server and database are disabled, and auto-publish is off. This stage prepares public-document candidate coverage and the private capture protocol. No frontend implementation, authenticated Books exploration or tenant screenshots have been completed in this task.

The selected organization was reported at Organization Setup by the parent task. The user will finish setup manually. Do not click Get Started, submit that form, or open authenticated Books for reference capture until an explicit dashboard-ready message is received here or from the parent task. This intentional gate is not permission to finish setup or monitor tenant progress.

## Reference documents

`plan.md` records the approved scope and implementation approach. `TODO.md` keeps completed and pending outcomes distinct. `docs/books-coverage-plan.md` holds the combined public-document workflow and reusable screen-family inventory when its research completes. `docs/domains/` holds source-cited public candidate notes. `docs/capture-protocol.md` defines read-only capture boundaries. `docs/reference-manifest.json` contains sanitized evidence status and no fabricated captures.

All official documentation coverage remains a candidate for the selected Global tenant until observed safely. Public edition-neutral URLs can resolve to regional help. Plan, role, edition, setup and enablement availability must be verified rather than assumed.

## Hard restrictions

The user's follow-up permits button-level interaction testing and low-impact synthetic record creation where safe after dashboard readiness. This supersedes the original blanket read-only restriction but does not authorize finishing setup. Follow `docs/interaction-coverage-plan.md`: prefer non-mutating inspection and stop before consequential financial submissions, payments, external messages, destructive actions and integration/accounting settings changes without exact action-specific authorization. Keep original tenant screenshots and notes under Git-ignored `reference-private/` only. Do not put them into frontend public assets, website storage, public CDN URLs, commits or backups.

The later prototype is React + TypeScript + Tailwind, mobile-first and frontend-only. All data is fictional and browser-local. No backend, authentication, live Zoho API integration or real accounting operations. Reuse canonical components rather than duplicating pages per workflow. Match actual Books visual details only to verified Books references; reuse accepted Procurement reference style when it becomes available read-only. The Procurement workspace is not present in this sandbox.

## Repositories and publication

The Manus-managed repository remains canonical. An additional new private GitHub repository is a backup only, not a canonical switch. Use a `backup` remote only after its private target is confirmed. The repository excludes raw tenant references and secrets. Do not publish this website or enable auto-publish.

## Next allowed transition

Upon an explicit dashboard-ready signal, resume safe reference capture in the same selected Global organization, reconcile candidate coverage against accessible UI, and record canonical screen/component patterns. Only then implement Books-matched screens using fictional local demo data. Missing or unsafe-to-reach screens stay unverified or blocked rather than fabricated.
