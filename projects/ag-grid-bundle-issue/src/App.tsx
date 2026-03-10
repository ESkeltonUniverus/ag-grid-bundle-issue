import { Suspense, useMemo } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { GridPageLayout } from '@workspace/ag-grid-bundle-shared'
import { demoRoutes } from './routes'

export default function App() {
  const location = useLocation()
  const route = useMemo(
    () => demoRoutes.find((candidate) => candidate.path === location.pathname) ?? demoRoutes[0],
    [location.pathname],
  )

  return (
    <div className="app-shell">
      <GridPageLayout
        eyebrow="AG Grid bundle isolation demo"
        title="Published package route-splitting repro"
        description="A tiny React app with two lazy routes. The simple route only needs the client-side row model. The complex route pulls in extra community modules. This version consumes the published AG Grid packages."
        navLinks={demoRoutes.map((candidate) => ({
          href: candidate.path,
          label: candidate.label,
        }))}
        aside={
          <p>
            <strong>Active route</strong>
            {route.label}
          </p>
        }
      >
        <section className="shell-card">
          <div className="shell-grid">
            <div>
              <h2>Routing model</h2>
              <p>Route selection is driven by the current URL and each page component is lazy-loaded.</p>
            </div>
            <div>
              <h2>Current import</h2>
              <p>{route.importLabel}</p>
            </div>
            <div>
              <h2>Expectation</h2>
              <p>The simple route should ideally avoid downloading modules only used by the complex route.</p>
            </div>
          </div>
        </section>

        <Suspense fallback={<section className="loading-card">Loading route chunk…</section>}>
          <Routes>
            {demoRoutes.map((candidate) => {
              const Page = candidate.component

              return <Route key={candidate.path} path={candidate.path} element={<Page />} />
            })}
          </Routes>
        </Suspense>

        <section className="shell-card">
          <nav className="route-links" aria-label="Route navigation">
            {demoRoutes.map((candidate) => (
              <NavLink
                key={candidate.path}
                to={candidate.path}
                className={({ isActive }) =>
                  isActive ? 'route-link route-link-active' : 'route-link'
                }
                end={candidate.path === '/'}
              >
                {candidate.label}
              </NavLink>
            ))}
          </nav>
        </section>
      </GridPageLayout>
    </div>
  )
}
