# AG Grid Bundle Splitting Repro

This repo demonstrates a downstream bundling issue with the published `ag-grid-community` package.

Two lazy routes are built together in the same small React app:

- a **simple grid** route that imports only `ClientSideRowModelModule`, `ModuleRegistry`, and `themeQuartz`
- a **complex grid** route that imports `ClientSideRowModelModule` plus additional community modules such as `CsvExportModule`, `PaginationModule`, `RowSelectionModule`, and `NumberFilterModule`

The comparison is:

- **published package build**: the app imports `ag-grid-community` from the published package
- **local source build**: the same app resolves `ag-grid-community` to AG Grid's `src/main.ts` via a Vite mode flag

The source-resolved build splits AG Grid internals much more cleanly. Route-specific modules stay in the complex route chunk instead of being hoisted into a large shared AG Grid chunk.

## Workspace layout

- `projects/ag-grid-bundle-issue`: the single repro app used for both build modes
- `packages/ag-grid-bundle-shared`: shared grid UI, data, and styles
- `packages/ag-grid`: local AG Grid clone used by the source-resolved repro

## Commands

- `pnpm install`
- `pnpm build:combined`
- `pnpm build:combined-local`
- `pnpm build`
- `pnpm dev:combined`
- `pnpm dev:combined-local`

## Output

Published-package output:

- `projects/ag-grid-bundle-issue/dist/assets`
- `projects/ag-grid-bundle-issue/dist/stats.html`

Source-resolved output:

- `projects/ag-grid-bundle-issue/dist-source/assets`
- `projects/ag-grid-bundle-issue/dist-source/stats.html`

## What to compare

After building both modes, compare:

- the size of the shared `index.esm-*.js` AG Grid chunk
- the size of the route chunks for `SimpleGridPage` and `ComplexGridPage`
- `dist/stats.html` in each app for a visual chunk comparison

In this repro, the published-package build places much more AG Grid implementation code in the shared chunk, while the local-source build moves complex-only modules into the complex route chunk.