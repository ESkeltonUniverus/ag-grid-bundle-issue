# AG Grid Bundle Splitting Repro

This app builds a small React router app in two modes:

- default mode uses the published `ag-grid-community` package
- `source` mode aliases `ag-grid-community` to the local AG Grid source tree

It has two lazy routes:

- `src/pages/SimpleGridPage.tsx`: imports `ClientSideRowModelModule`, `ModuleRegistry`, and `themeQuartz`
- `src/pages/ComplexGridPage.tsx`: imports the simple-route symbols plus `CsvExportModule`, `PaginationModule`, `RowSelectionModule`, and `NumberFilterModule`

The point is to show that the published package does not split AG Grid internals as cleanly when both routes are bundled together.

## Modes

- `pnpm build` / `pnpm dev` → published package mode
- `pnpm build:source` / `pnpm dev:source` → local source resolution mode

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm preview`

## Output

- `dist/assets`
- `dist/stats.html`
- `dist-source/assets`
- `dist-source/stats.html`

## Expected observation

In published-package mode, the shared AG Grid chunk is larger than expected, and code for modules only used by `ComplexGridPage` is pulled into shared output instead of staying route-specific.

In source mode, those complex-only modules should move into the `ComplexGridPage` chunk much more effectively.
