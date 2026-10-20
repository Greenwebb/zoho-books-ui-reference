# Reports, settings and integrations

> Authorization update: this source note was researched under the original read-only instruction. The later user message permits button-level testing and low-impact synthetic record creation where safe after the explicit dashboard-ready signal. Current action boundaries are in [interaction coverage](../interaction-coverage-plan.md); that guidance supersedes older blanket read-only wording below. No tenant exploration or creation has occurred.

**Planning note — not a tenant capture.** The selected Global organization is still at Organization Setup. This note is based only on public Zoho Books help; the public pages do not verify the Global tenant or its dashboard state.

## Source-supported candidate steps

- **Reports:** Reports landing/index → choose a report family or report. The help index lists business overview, sales, inventory, receivables, payments received, and activity. It documents report PDF layout, chart views, report scheduling, scheduled-report management, role-based report access, and sharing/access changes as report-management topics. Draft transactions are excluded from reports. Treat report views as read-only in a future capture; schedule, permission, and share actions change configuration and are out of bounds. [1]
- **General organization settings:** Settings → Organization Settings → Setup & Configurations → General. This page describes enabling modules, configuring general preferences, and saving changes; the documented Inventory add-on requires an active Zoho Inventory organization on a supported plan. Do not enable or save settings during capture. [2]
- **Integrations:** Settings → Integrations → Online Payments; the help page also documents card-verification settings and a Zoho Books ZSC Key location. Gateway connection paths can involve an external login or sharing credentials. Use only for planning, not connection or credential actions. Gateway availability varies by country; the page marks Payflow Pro and Payments Pro deprecated and available only to existing users. [3]

## Canonical screen families

- Module/report index and report-view shell, with report-management actions as a separate configuration surface. [1]
- Settings category/subcategory navigation and preference form with save action. [2]
- Integration catalog/list, gateway connection or external authorization flow, and integration-specific settings/key page. [3]

These are shared UI-family abstractions, not assertions about exact Global tenant screens or screenshots.

## Listed but unverified candidates and boundaries

- **Users/roles, templates, automation, and Zoho Analytics/CRM workflows:** candidate scope only. The sources fetched here do not establish their Global-specific paths or exact steps. The reports index supports report-level role-based access and sharing, but does not establish organization-wide user/role administration. CRM appears in the integrations index; Analytics is not substantiated by the fetched page. Verify only from suitable public documentation before treating these as source-backed workflows. [1] [3]
- Plan, country, organization configuration, and integration credentials can affect what is available. The reports page displays a plan list, while the settings and integrations pages flag plan or country qualifications. Public help pages display a **US-EN** edition header and US support details, alongside an editions selector that includes **Global**; they are not evidence that a described feature, label, or path matches the selected Global organization. [1] [2] [3]
- No authenticated Zoho pages, tenant records, MCP/API tenant inspection, browser state, or tenant modifications were used. After an explicit dashboard-ready signal, any eventual capture should remain read-only: do not save settings, toggle modules, connect gateways/apps, regenerate keys, schedule/deactivate reports, or change user/report sharing permissions. Capture no confidential transaction, customer, or credential data.

## References

[1]: https://www.zoho.com/books/help/reports/ "Reports | Zoho Books Help"
[2]: https://www.zoho.com/books/help/settings/preferences.html "Preferences | Zoho Books Help"
[3]: https://www.zoho.com/books/help/settings/integrations.html "Integrations | Zoho Books Help"
