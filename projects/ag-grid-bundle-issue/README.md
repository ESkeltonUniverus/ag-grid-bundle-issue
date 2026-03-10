# AG Grid bundle splitting repro app

This app compares AG Grid bundle output in two modes:

- **default mode** uses the published `ag-grid-community` package
- **source mode** aliases `ag-grid-community` to the local source tree

It has two lazy routes:

- `src/pages/SimpleGridPage.tsx` imports `ClientSideRowModelModule`, `ModuleRegistry`, and `themeQuartz`
- `src/pages/ComplexGridPage.tsx` imports those symbols plus `CsvExportModule`, `PaginationModule`, `RowSelectionModule`, and `NumberFilterModule`

The goal is to show that the published package creates a larger shared AG Grid chunk, while source mode produces cleaner route-level splitting.

## Modes

- `pnpm dev` / `pnpm build` — published package mode
- `pnpm dev:source` / `pnpm build:source` — source mode

## Output

- `dist/assets`
- `dist/stats.html`
- `dist-source/assets`
- `dist-source/stats.html`

## Expected result

In published package mode, AG Grid code used only by `ComplexGridPage` is pulled into shared output more than expected.

In source mode, those complex-only modules stay much closer to the `ComplexGridPage` chunk.
