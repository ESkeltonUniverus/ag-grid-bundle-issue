# AG Grid bundle splitting repro

This repo demonstrates a downstream chunk-splitting issue with the published AG Grid packages.

The repro app builds two lazy routes in the same React app:

- `SimpleGridPage` imports only `ClientSideRowModelModule`, `ModuleRegistry`, and `themeQuartz`
- `ComplexGridPage` imports those same symbols plus `CsvExportModule`, `PaginationModule`, `RowSelectionModule`, and `NumberFilterModule`

The app is built in two modes:

- **published package mode**: uses the installed `ag-grid-community` package
- **source mode**: aliases `ag-grid-community` to the local AG Grid source tree

The point of the repro is to show that the published package produces a larger shared AG Grid chunk, while source resolution keeps more complex-only code in the complex route chunk.

## Workspace layout

- `projects/ag-grid-bundle-issue` — repro app
- `packages/ag-grid-bundle-shared` — shared data, UI, and styles
- `packages/ag-grid` — local AG Grid checkout used by source mode

## Commands

- `pnpm install`
- `pnpm build:combined` — build both modes
- `pnpm build` — build published package mode only
- `pnpm build:local` — build source mode only

## Output

Published package mode:

- `projects/ag-grid-bundle-issue/dist/assets`
- `projects/ag-grid-bundle-issue/dist/stats.html`

Source mode:

- `projects/ag-grid-bundle-issue/dist-source/assets`
- `projects/ag-grid-bundle-issue/dist-source/stats.html`

## What to compare

After building both modes, compare:

- the shared AG Grid chunk size
- the `SimpleGridPage` and `ComplexGridPage` route chunks
- the `stats.html` treemaps for each mode

Expected result:

- published package mode over-shares AG Grid code into common output
- source mode keeps more complex-only AG Grid code in the complex route chunk