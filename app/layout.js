import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AfroX Rewards Hub - Engage, Earn, Win',
  description: 'Free hourly giveaways + premium engagement features. No purchase necessary to participate.',
  keywords: 'AfroX, crypto rewards, spin wheel, giveaway, blockchain, DeFi',
  authors: [{ name: 'AfroX DAO Community of Trust' }],
  openGraph: {
    title: 'AfroX Rewards Hub',
    description: 'Engage, Earn, Win - Free hourly giveaways',
    url: 'https://rewards.afrox.one',
    siteName: 'AfroX Rewards Hub',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a1a2e',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
