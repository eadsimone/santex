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

### Large dataset (v2)

- Default: **~22** curated rows from `src/data/feedback.ts`.
- **`?n=5000`** (or any number up to **15 000**): loads a **deterministic synthetic** dataset from `src/data/generateFeedback.ts` to stress the UI.
- The list is still **filtered/sorted in memory** (`useMemo`); only the **current page** of rows is mounted (**25** per page) via pagination controls.

## Assumptions

- No backend: all data is mock; status changes are **not** persisted beyond the page session (only filter UI state is persisted).
- **localStorage** may be unavailable or full; persistence failures are swallowed so the UI keeps working.

## Performance notes

- Search is **debounced**; filter + sort run in **`useMemo`** over the merged list (`O(n)` per change).
- **v2:** Client-side **pagination** caps DOM rows/cards at **25** per page. For tens of thousands of rows or heavy filters, the next step would be **server-side** or **Web Worker** filter/sort, or **virtualization** within a page.

## Security notes

- **No** `dangerouslySetInnerHTML` — React renders names, emails, and messages as **text**; suspicious strings appear literally.
- Status updates are constrained to known **union** values (native `<select>` + whitelist check in the modal handler).
- **localStorage** payloads are treated as **untrusted**: `JSON.parse` in `try/catch`, fields validated against allowed enums, search length capped.

## Trade-offs

1. **State structure** — Fetched feedback stays immutable in hook state; **status overrides** live in a separate map so we do not mutate mock rows and refetches stay predictable. Filter state is separate and **persisted** so support staff keep their working context across reloads without a backend.
2. **Performance** — v1 rendered every row; **v2** paginates after filter/sort. The full filtered array still lives in memory; **virtualization** or **server pagination** would be the next step for very large sets.
3. **Untrusted content** — All user-like fields are plain React children; long messages use **`pre-wrap`** / `overflow-wrap` for readability without interpreting HTML.
4. **What we would improve next** — Infinite scroll or virtualized rows; Vitest for `filterFeedback` / `sortFeedback`; keyboard navigation across rows; optimistic status UX with a real API.

## Repository

Source: [github.com/eadsimone/santex](https://github.com/eadsimone/santex)
