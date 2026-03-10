import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type DemoRoute = {
  path: string
  label: string
  description: string
  importLabel: string
  component: LazyExoticComponent<ComponentType>
}

export const demoRoutes: DemoRoute[] = [
  {
    path: '/',
    label: 'Simple grid',
    description: 'Simple grid route with the client-side row model only.',
    importLabel: 'lazy(() => import("./pages/SimpleGridPage"))',
    component: lazy(() => import('./pages/SimpleGridPage')),
  },
  {
    path: '/complex',
    label: 'Complex grid',
    description: 'Complex grid route with extra AG Grid community modules.',
    importLabel: 'lazy(() => import("./pages/ComplexGridPage"))',
    component: lazy(() => import('./pages/ComplexGridPage')),
  },
]