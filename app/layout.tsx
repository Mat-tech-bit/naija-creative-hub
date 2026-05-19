import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

// Using system fonts to avoid network timeouts during build
// You can re-enable Google Fonts once you are on a stable internet connection
const fontVariables = "--font-inter: 'Inter', system-ui, sans-serif; --font-plus-jakarta: 'Plus Jakarta Sans', system-ui, sans-serif; --font-geist-mono: 'Geist Mono', monospace;";

export const metadata: Metadata = {
  title: 'NaijaCreativeHub | Create. Inspire. Elevate.',
  description: 'The premier creative community platform for Photography, Fashion Design, and Graphics Design in Nigeria. Join the movement of young creatives.',
  keywords: ['creative community', 'nigeria creatives', 'photography contest', 'fashion design', 'graphics design', 'naija talent'],
  openGraph: {
    title: 'NaijaCreativeHub | Create. Inspire. Elevate.',
    description: 'The premier creative community platform in Nigeria. Join the movement.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NaijaCreativeHub',
    description: 'Create. Inspire. Elevate.',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f14' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background" data-scroll-behavior="smooth">
      <body 
        className="font-sans antialiased creative-noise" 
        style={{ 
          // @ts-ignore
          "--font-inter": "var(--font-inter, 'Inter', system-ui, sans-serif)",
          "--font-plus-jakarta": "var(--font-plus-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
          "--font-geist-mono": "var(--font-geist-mono, 'Geist Mono', monospace)"
        }}
      >
        <Toaster position="top-center" richColors theme="dark" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
