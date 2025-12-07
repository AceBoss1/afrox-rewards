## 🔌 **app/api/price/route.js**

```javascript
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
        next: { revalidate: 180 } // Cache for 180 seconds
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
    
    // Return fallback price
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

// Enable CORS for API route
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
