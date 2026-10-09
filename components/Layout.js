import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Sidebar from './Sidebar'

const BASE_URL = 'https://roadtocareer.github.io/learn-software-testing-with-claude-code'
const DEFAULT_DESCRIPTION = 'Master software testing with Claude AI. Complete tutorial covering prompt engineering, context engineering, skills, agents, and MCP servers for QA engineers and SDETs.'
const OG_IMAGE = `${BASE_URL}/resources/mermaid-diagram.png`

export default function Layout({ title = 'Software Testing with AI', description = DEFAULT_DESCRIPTION, children }) {
  const router = useRouter()
  const asPath = router.asPath.endsWith('/') ? router.asPath : router.asPath + '/'
  const canonicalUrl = `${BASE_URL}${asPath}`
  // Card fade-in animation via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.5s ease forwards'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.card').forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Copy-to-clipboard buttons injected into .code-block and accordion pre>code
  useEffect(() => {
    function copyCode(btn) {
      const wrapper = btn.closest('.code-block-wrapper')
      const pre = wrapper?.querySelector('pre')
      const text = pre ? pre.innerText : wrapper?.innerText ?? ''
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!'
        btn.style.color = '#7B2FF7'
        setTimeout(() => {
          btn.textContent = 'Copy'
          btn.style.color = ''
        }, 2000)
      })
    }

    // Inject into .accordion-body pre code blocks
    document.querySelectorAll('.accordion-body pre, .accordion-body .code-block').forEach(block => {
      if (block.closest('.code-block-wrapper')) return
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'
      block.parentNode.insertBefore(wrapper, block)
      wrapper.appendChild(block)
      const btn = document.createElement('button')
      btn.className = 'btn btn-sm btn-outline-info copy-btn'
      btn.textContent = 'Copy'
      btn.addEventListener('click', () => copyCode(btn))
      wrapper.appendChild(btn)
    })
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Software Testing with AI" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Extra SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Road to Career" />
      </Head>

      <Sidebar />

      <div className="main-content">
        {children}
      </div>

      <footer className="text-center py-5 mt-5">
        <div className="container">
          <p>© 2026 Road to Career.</p>
          <p style={{ fontSize: '0.9rem' }}>Build reliable, intelligent testing systems with Claude AI</p>
        </div>
      </footer>
    </>
  )
}
