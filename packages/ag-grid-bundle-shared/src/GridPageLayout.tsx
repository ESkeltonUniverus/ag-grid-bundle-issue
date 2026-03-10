import type { PropsWithChildren, ReactNode } from 'react'

type NavLink = {
  href: string
  label: string
}

type GridPageLayoutProps = PropsWithChildren<{
  eyebrow: string
  title: string
  description: string
  navLinks: NavLink[]
  aside?: ReactNode
}>

export function GridPageLayout({
  eyebrow,
  title,
  description,
  navLinks,
  aside,
  children,
}: GridPageLayoutProps) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-header-row">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="description">{description}</p>
          </div>
          {aside ? <div className="hero-aside">{aside}</div> : null}
        </div>

        <nav className="route-nav" aria-label="Demo routes">
          {navLinks.map((link) => (
            <a key={link.href} className="route-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </section>

      {children}
    </main>
  )
}
