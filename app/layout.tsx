import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeToggleProvider } from "./theme";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'CreativeVote | Discover & Support Creative Talent',
  description: 'The premier voting-based creative competition platform for Photography, Fashion Design, and Graphics Design. Join thousands of young creatives competing for recognition and prizes.',
  keywords: ['creative competition', 'photography contest', 'fashion design', 'graphics design', 'voting', 'talent discovery'],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f14' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <AppRouterCacheProvider>
          <ThemeToggleProvider>
            {children}
          </ThemeToggleProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
