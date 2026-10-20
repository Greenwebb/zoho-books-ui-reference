# Interaction coverage and current authorization

The user's follow-up on October 20, 2026 requests button-level behavior coverage, not screenshot-only inspection. They permit creation and other testing to discover the complete UI. This supersedes the earlier blanket read-only limit for ordinary, low-impact UI-discovery actions, but does not confirm that organization setup is complete. Authenticated exploration remains paused until an explicit dashboard-ready message here or from the parent task. Never finish the live Organization Setup or click its Get Started action on the user's behalf.

## How complete UI references will be built

Start from the same selected Zoho Books Global organization and enumerate the visible module tree. For each accessible canonical screen, inventory every visible button, menu item, tab, link, field affordance, overflow menu and contextual/bulk action. Record the control's entry point, prerequisites, enabled/disabled state, action category, destination or resulting dialog, validations, cancel/back behavior and visible success/error/empty/loading states. A screenshot is evidence of appearance; the interaction record establishes behavior.

Use representative screen families so the workflow map is complete without duplicating equivalent layouts. Capture a base list and meaningful variations, a form and its nested pickers, a detail view and its tabs/actions, and each accessible wizard/dialog/state. Map module-specific controls to the shared list, form, detail, wizard, allocation, communication, document, report, settings and integration families. Record conditional controls that depend on plan, role, edition, module enablement or record state. Do not call the inventory exhaustive until all reachable visible controls have a recorded result or explicit coverage boundary.

Inspect existing safe states first. Use the user's expanded permission for reversible navigation, opening/closing controls, field interactions, validation that does not submit records, and low-impact synthetic test records only where appropriate and demonstrably safe. A test record should be visibly fictional, contain no real contact or bank details, and be isolated from real business processes. Keep a private test-action log if any tenant mutation is performed; do not silently clean up records or delete business data. Prefer no tenant changes when the same UI can be captured without them.

Payments, emails, customer/vendor portal invitations, approvals with business consequences, live financial record submissions, exports of tenant data, integration/feed connections, changes to accounting/security settings and destructive actions are not ordinary UI exploration. Inspect the controls and any safely opened previews, but stop before consequential commit/submit steps. Financial/legal submissions, payments, broad external publishing or destructive account changes require exact action-specific authorization and the applicable workflow; a general instruction to test everything does not remove those gates. Do not invent a result when a safe boundary prevents execution.

## Behavior evidence labels

Use **observed interaction** when the control was safely exercised and its result recorded. Use **observed control, commit not executed** when a dialog is reachable but its final action is consequential. Use **public-document behavior candidate** when behavior comes from official docs rather than the selected tenant. Use **unverified prerequisite** when the necessary plan, role, feature or record state is unavailable. Use **synthetic prototype behavior** when the later frontend merely simulates the interaction locally.

Each button inventory entry should reference its screenshot IDs, applicable workflow(s), canonical family, prerequisite/state, action category, result and evidence label. Keep tenant identity and any sensitive screenshot paths in private notes. Sanitized public planning metadata must never contain actual tenant records.

## Implementation gate

The frontend remains React + TypeScript + Tailwind, mobile-first, modular and fictional browser-local only. No backend, authentication, live Zoho API or real accounting operations. Do not build Books-specific screen detail by guessing from public docs. Implement canonical components only after relevant verified references and behavior inventory are available; inaccessible states remain visibly unverified rather than portrayed as exact replicas. The website and original references remain unpublished/private, and Zoho Procurement remains untouched.
