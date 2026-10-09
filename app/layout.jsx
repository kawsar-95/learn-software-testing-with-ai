import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_ID, SITE_URL } from '../lib/site'
import 'nextra-theme-docs/style.css'
import '../components/mdx/mdx.css'
import '../components/landing/landing.css'

export const metadata = {
  title: {
    default: 'Software Testing with AI',
    template: '%s – Software Testing with AI',
  },
  description:
    'Master software testing with Claude AI. Complete tutorial covering prompt engineering, context engineering, skills, agents, and MCP servers for QA engineers and SDETs.',
  authors: [{ name: 'Road to Career' }],
  ...(SITE_URL && {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: './' },
    openGraph: {
      siteName: 'Software Testing with AI',
      type: 'website',
      images: ['/resources/mermaid-diagram.png'],
    },
  }),
}

const navbar = <Navbar logo={<b>Software Testing with AI</b>} />

const footer = (
  <Footer>
    <div>
      <p>© 2026 Road to Career.</p>
      <p>Build reliable, intelligent testing systems with Claude AI</p>
    </div>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 263, saturation: 93 }} />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  )
}
