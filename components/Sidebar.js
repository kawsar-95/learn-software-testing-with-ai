import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV_LINKS = [
  { href: '/',            icon: 'fa-house',              label: 'Home' },
  { href: '/ai-systems',  icon: 'fa-layer-group',        label: 'AI Systems' },
  { href: '/prompt',      icon: 'fa-pen-fancy',          label: 'Prompt Engineering' },
  { href: '/context',     icon: 'fa-brain',              label: 'Context Engineering' },
  { href: '/setup',       icon: 'fa-download',           label: 'Install Claude' },
  { href: '/models',      icon: 'fa-microchip',          label: 'Claude Models' },
  { href: '/modes',       icon: 'fa-sliders',            label: 'Plan vs Act Mode' },
  { href: '/structure',   icon: 'fa-folder-tree',        label: 'Claude Architecture' },
  { href: '/claude-md',   icon: 'fa-file-code',          label: 'CLAUDE.md' },
  { href: '/memory',      icon: 'fa-memory',             label: 'Memory' },
  { href: '/skills',      icon: 'fa-wand-magic-sparkles',label: 'Skills' },
  { href: '/agents',      icon: 'fa-robot',              label: 'Agents' },
  { href: '/hooks',       icon: 'fa-anchor',             label: 'Hooks' },
  { href: '/commands',    icon: 'fa-terminal',           label: 'Commands' },
  { href: '/mcp',         icon: 'fa-server',             label: 'MCP Server' },
  { href: '/superpower',  icon: 'fa-bolt',               label: '⚡ Superpower' },
  { href: '/principles',  icon: 'fa-star',               label: 'Key Principles' },
  { href: '/marketplace', icon: 'fa-store',              label: 'Marketplaces' },
]

export default function Sidebar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const sidebarRef = useRef(null)
  const btnRef = useRef(null)

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [router.pathname])

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Scroll active link into view
  useEffect(() => {
    if (sidebarRef.current) {
      const active = sidebarRef.current.querySelector('.active')
      if (active) active.scrollIntoView({ block: 'nearest' })
    }
  }, [router.pathname])

  return (
    <>
      {/* Fixed header bar */}
      <div
        style={{
          position: 'fixed', left: 0, top: 0, width: 280,
          height: 56, background: '#7B2FF7',
          borderBottom: '1px solid #6620e0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1001,
        }}
      >
        <button
          ref={btnRef}
          className={`hamburger-btn${open ? ' active' : ''}`}
          onClick={() => setOpen(o => !o)}
          title="Toggle sidebar"
        >
          <span /><span /><span />
        </button>
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: 1 }}>
          MASTER IN CLAUDE
        </span>
      </div>

      {/* Sidebar nav */}
      <div
        ref={sidebarRef}
        className={`sidebar${open ? ' show' : ''}`}
      >
        {NAV_LINKS.map(({ href, icon, label }) => {
          const isActive = router.pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-title${isActive ? ' active' : ''}`}
            >
              <i className={`fas ${icon}`} />
              {label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
