// ============================================
// components/PriceTicker.jsx
// ============================================

'use client';

export default function PriceTicker({ afroxPrice, lastPriceUpdate }) {
  const formatUSD = (afroxAmount) => {
    return `$${(afroxAmount * afroxPrice).toFixed(2)}`;
  };

  return (
    <div className="bg-black/40 border-b border-white/10 py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-gray-400">AfroX Price:</span>
          <span className="font-bold text-green-400">${afroxPrice.toFixed(12)} USD</span>
          <span className="text-gray-500">• 1B AfroX = {formatUSD(1000000000)}</span>
        </div>
        <div className="text-gray-500 text-xs">
          Updated {Math.floor((Date.now() - lastPriceUpdate) / 1000)}s ago
        </div>
      </div>
    </div>
  );
}
