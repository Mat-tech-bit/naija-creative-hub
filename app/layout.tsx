import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'CreativeVote | Discover & Support Creative Talent',
  description: 'The premier voting-based creative competition platform for Photography, Fashion Design, and Graphics Design. Join thousands of young creatives competing for recognition and prizes.',
  keywords: ['creative competition', 'photography contest', 'fashion design', 'graphics design', 'voting', 'talent discovery'],
  openGraph: {
    title: 'CreativeVote | Discover & Support Creative Talent',
    description: 'The premier voting-based creative competition platform. Join the movement.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreativeVote',
    description: 'Discover & Support Creative Talent',
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
      <body className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
