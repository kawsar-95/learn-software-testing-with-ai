import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { RegisterServiceWorker } from "@/components/layout/RegisterServiceWorker";
import { GA_ID, OWNER, SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s – ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [OWNER],
  // The manifest link comes from app/manifest.ts. These tags are for iOS,
  // which reads the home-screen title from them.
  appleWebApp: { capable: true, title: SITE_SHORT_NAME, statusBarStyle: "default" },
  // Canonical and Open Graph URLs need an absolute base, so they exist only
  // when NEXT_PUBLIC_SITE_URL is set.
  ...(SITE_URL && {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: "./" },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      url: "./",
      images: ["/resources/mermaid-diagram.png"],
    },
    twitter: { card: "summary_large_image" },
  }),
};

// The browser colors its title bar to match the page background (globals.css).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1013" },
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script changes data-theme before React hydrates, so React
    // must accept the DOM value (suppressHydrationWarning).
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full bg-bg text-text">
        {children}
        <RegisterServiceWorker />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
