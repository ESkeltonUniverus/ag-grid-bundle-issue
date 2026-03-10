import { AgGridReact } from 'ag-grid-react'
import { ClientSideRowModelModule, ModuleRegistry, themeQuartz } from 'ag-grid-community'
import { athleteRows, simpleColumnDefs } from '@workspace/ag-grid-bundle-shared'

ModuleRegistry.registerModules([ClientSideRowModelModule])

export default function SimpleGridPage() {
  return (
    <section className="grid-card">
      <div className="grid-card-header">
        <div>
          <h2>Simple grid route</h2>
          <p>Only the core client-side row model is registered here.</p>
        </div>

        <div>
          <p><strong>Modules registered</strong></p>
          <ul className="module-list">
            <li>`ClientSideRowModelModule`</li>
          </ul>
        </div>
      </div>

      <div className="grid-surface">
        <AgGridReact
          theme={themeQuartz}
          rowData={athleteRows}
          columnDefs={simpleColumnDefs}
          defaultColDef={{ sortable: true, resizable: true, filter: true }}
        />
      </div>
    </section>
  )
}