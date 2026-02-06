# Specification

## Summary
**Goal:** Build an offline-first, client-only vehicle tracking and daily accounting web app with a dashboard, date-wise reports, and PDF/Excel export.

**Planned changes:**
- Implement a local offline-first data layer in the browser with schema versioning/migrations and safe read/write helpers for Water Tank entries, Vehicle work logs (JCB/HYDRO), and Accounting transactions.
- Add Water Tank module CRUD with date-wise filtering (fields: date, time, category, party name, driver name, notes).
- Add Vehicle work log module CRUD (JCB/HYDRO) with automatic hours and payment calculations and date-wise filtering (fields: date, vehicle type, driver name, start time, end time, hourly rate).
- Add Daily Accounting module CRUD with date-wise totals (income, expenses, balance) (fields: type, amount, person name, date, notes).
- Create a “Today” dashboard with subtle animated KPI cards (income, expenses, balance, total vehicle hours, water tank count) linking to the corresponding date-filtered views.
- Add report views for each module with a shared date selector and computed totals where applicable.
- Implement per-report export to PDF and Excel (.xlsx) for the selected date, including headers, tables, and totals.
- Apply a consistent Material-inspired theme (non-blue/purple primary), subtle micro-animations, and light/dark mode toggle persisted locally.
- Add form validation and safeguards (required fields, numeric/time validation, delete confirmations) and mobile-friendly navigation across Dashboard, Water Tank, Vehicle, Accounting, and Reports/Exports.

**User-visible outcome:** Users can fully manage Water Tank entries, vehicle work logs, and daily accounting offline; view today’s KPIs on a dashboard; browse date-wise reports with totals; and export any selected day’s reports to PDF or Excel with a clean themed UI and light/dark mode.
