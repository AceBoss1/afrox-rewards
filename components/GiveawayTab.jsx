// ============================================
// components/GiveawayTab.jsx
// ============================================

'use client';

import { useState, useEffect } from 'react';

export default function GiveawayTab({ userData, afroxPrice }) {
  const [nextGiveaway, setNextGiveaway] = useState(null);

  const formatUSD = (afroxAmount) => {
    return `$${(afroxAmount * afroxPrice).toFixed(2)}`;
  };

  const formatCountdown = () => {
    if (!nextGiveaway) return '00:00:00';
    const diff = Math.floor((nextGiveaway - Date.now()) / 1000);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const calculateNextGiveaway = () => {
      const now = new Date();
      const hours = [0, 4, 8, 12, 16, 20];
      const currentHour = now.getUTCHours();
      
      let nextHour = hours.find(h => h > currentHour);
      if (!nextHour) nextHour = hours[0];
      
      const next = new Date(now);
      next.setUTCHours(nextHour, 0, 0, 0);
      if (nextHour <= currentHour) {
        next.setUTCDate(next.getUTCDate() + 1);
      }
      
      setNextGiveaway(next);
    };

    calculateNextGiveaway();
    const giveawayInterval = setInterval(calculateNextGiveaway, 1000);
    return () => clearInterval(giveawayInterval);
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold mb-6 text-center">Hourly Giveaway</h2>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-8 border border-yellow-500/30 mb-6">
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-2">Prize Pool</p>
            <p className="text-5xl font-bold text-yellow-400 mb-2">1,000,000,000 AfroX</p>
            <p className="text-2xl text-gray-300">{formatUSD(1000000000)}</p>
          </div>
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-2">Next Draw In</p>
            <p className="text-6xl font-bold text-white">{formatCountdown()}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-400">1st Place</p>
              <p className="text-xl font-bold text-yellow-400">500M</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">2nd Place</p>
              <p className="text-xl font-bold text-gray-300">300M</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">3rd Place</p>
              <p className="text-xl font-bold text-orange-400">200M</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h3 className="font-bold mb-4">Your Entries</h3>
          <p className="text-3xl font-bold text-yellow-400 mb-4">{userData.entries} Entries</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Base Entry:</span>
              <span className="text-green-400">✓ 1 entry</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">From Spins:</span>
              <span className="text-green-400">✓ {Math.max(0, userData.entries - 1)} entries</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="font-bold mb-4">How to Get More Entries (FREE)</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">📺</div>
              <div className="flex-1">
                <p className="font-medium">Watch 3 Ads</p>
                <p className="text-sm text-gray-400">+1 entry</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition">Watch</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">📝</div>
              <div className="flex-1">
                <p className="font-medium">Complete Survey</p>
                <p className="text-sm text-gray-400">+1 entry</p>
              </div>
              <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 transition">Start</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">📱</div>
              <div className="flex-1">
                <p className="font-medium">Share on Social</p>
                <p className="text-sm text-gray-400">+1 entry/day</p>
              </div>
              <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-400 transition">Share</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">🔥</div>
              <div className="flex-1">
                <p className="font-medium">7-Day Streak</p>
                <p className="text-sm text-gray-400">+3 entries</p>
              </div>
              <span className="px-4 py-2 bg-gray-700 rounded-lg">Day 3/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
