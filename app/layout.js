  // **app/layout.js**

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
    images: [
      {
        url: '/afrodex_token.png',
        width: 800,
        height: 600,
        alt: 'AfroX Token',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AfroX Rewards Hub',
    description: 'Engage, Earn, Win - Free hourly giveaways',
    images: ['/afrodex_token.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/afrodex_token.png',
  },
}

export default function RootLayout({ children }) {
  return (
    
      
        
        
      
      {children}
    
  )
}
