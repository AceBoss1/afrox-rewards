import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const poolAddress = process.env.NEXT_PUBLIC_GECKOTERMINAL_POOL;
    const network = process.env.NEXT_PUBLIC_GECKOTERMINAL_NETWORK;
    
    const response = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${poolAddress}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 180 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch price');
    }

    const data = await response.json();
    const price = parseFloat(data.data.attributes.base_token_price_usd);
    const volume24h = parseFloat(data.data.attributes.volume_usd.h24);
    const priceChange24h = parseFloat(data.data.attributes.price_change_percentage.h24);

    return NextResponse.json({
      price,
      volume24h,
      priceChange24h,
      timestamp: Date.now(),
      success: true
    });

  } catch (error) {
    console.error('Price API Error:', error);
    
    return NextResponse.json({
      price: 0.000000009998,
      volume24h: 0,
      priceChange24h: 0,
      timestamp: Date.now(),
      success: false,
      error: 'Using cached price'
    }, { status: 200 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}


// ============================================
// FILE: app/layout.js
// COPY EVERYTHING BELOW (excluding this comment block)
// ============================================

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
