import Link from 'next/link'
import { Rocket } from 'lucide-react'

export function Hero({ title, subtitle, ctaHref, ctaLabel }) {
  return (
    <section className="hero">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      <Link href={ctaHref} className="hero-cta">
        <Rocket size={18} aria-hidden="true" />
        {ctaLabel}
      </Link>
    </section>
  )
}
