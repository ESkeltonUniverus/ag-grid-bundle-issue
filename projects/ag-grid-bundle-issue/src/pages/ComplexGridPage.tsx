import { AgGridReact } from 'ag-grid-react'
import {
  ClientSideRowModelModule,
  CsvExportModule,
  ModuleRegistry,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  themeQuartz,
} from 'ag-grid-community'
import { athleteRows, complexColumnDefs } from '@workspace/ag-grid-bundle-shared'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  PaginationModule,
  RowSelectionModule,
  NumberFilterModule,
])

export default function ComplexGridPage() {
  return (
    <section className="grid-card">
      <div className="grid-card-header">
        <div>
          <h2>Complex grid route</h2>
          <p>This route adds optional modules that the simple route does not need.</p>
        </div>

        <div>
          <p><strong>Modules registered</strong></p>
          <ul className="module-list">
            <li>`ClientSideRowModelModule`</li>
            <li>`CsvExportModule`</li>
            <li>`PaginationModule`</li>
            <li>`RowSelectionModule`</li>
            <li>`NumberFilterModule`</li>
          </ul>
        </div>
      </div>

      <div className="grid-surface">
        <AgGridReact
          theme={themeQuartz}
          rowData={athleteRows}
          columnDefs={complexColumnDefs}
          rowSelection={{ mode: 'multiRow' }}
          pagination
          paginationPageSize={5}
          suppressCsvExport={false}
          defaultColDef={{ sortable: true, resizable: true, filter: true, flex: 1, minWidth: 120 }}
        />
      </div>
    </section>
  )
}