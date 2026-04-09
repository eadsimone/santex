# Customer Feedback Explorer

Internal-style React + TypeScript app for browsing mock customer feedback: search (debounced), category/status filters, sort, detail dialog, and **local-only** status updates. Filters persist in **`localStorage`** for the current browser.

## Setup

```bash
npm install
npm run dev
```

- Production build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

Open the dev server URL (usually `http://localhost:5173`). Append **`?error=1`** to simulate a failed load and exercise the error + retry UI.

## Assumptions

- No backend: all data is mock; status changes are **not** persisted beyond the page session (only filter UI state is persisted).
- **~20-ish rows** in v1: the full filtered list is rendered (no pagination yet).
- **localStorage** may be unavailable or full; persistence failures are swallowed so the UI keeps working.

## Performance notes (v1)

- Search input is **debounced** to avoid recomputing filters on every keystroke.
- Filter + sort run inside **`useMemo`** over the merged array (`O(n)` per dependency change), which is appropriate for the small mock set and keeps the pipeline ready for larger data later.
- Row/card subcomponents use **`React.memo`** where props are relatively stable.
- **Next step for scale (v2):** pagination, infinite scroll, or virtualization so the DOM does not grow linearly with thousands of rows; consider server-side or worker-based filter/sort if the client set grows further.

## Security notes

- **No** `dangerouslySetInnerHTML` — React renders names, emails, and messages as **text**; suspicious strings appear literally.
- Status updates are constrained to known **union** values (native `<select>` + whitelist check in the modal handler).
- **localStorage** payloads are treated as **untrusted**: `JSON.parse` in `try/catch`, fields validated against allowed enums, search length capped.

## Trade-offs

1. **State structure** — Fetched feedback stays immutable in hook state; **status overrides** live in a separate map so we do not mutate mock rows and refetches stay predictable. Filter state is separate and **persisted** so support staff keep their working context across reloads without a backend.
2. **Performance** — v1 optimizes **derivations** (debounce + `useMemo`) but still renders every matching row. That is intentional for the small exercise dataset; scaling to thousands requires **bounding the rendered rows** (planned for v2).
3. **Untrusted content** — All user-like fields are plain React children; long messages use **`pre-wrap`** / `overflow-wrap` for readability without interpreting HTML.
4. **What we would improve next** — Pagination or virtualization; optional Vitest coverage for `filterFeedback` / `sortFeedback`; keyboard navigation across rows; optimistic status UX if wired to a real API; optional generator for very large mock files to stress-test the v2 list strategy.

## Repository

Source: [github.com/eadsimone/santex](https://github.com/eadsimone/santex)
