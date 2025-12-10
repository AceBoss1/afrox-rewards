'use client';

import { useState, useEffect } from 'react';
import { Wallet, Coins, Gift } from 'lucide-react';

export default function UserDashboard({ userData, updateUserData, afroxPrice }) {
  const [nextGiveaway, setNextGiveaway] = useState(null);

  const formatAfroX = (amount) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(2)}B`;
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
    return amount.toLocaleString();
  };

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

  const convertBalance = () => {
    const fee = userData.unclaimedBalance <= 1000000000 ? 0.1 : 
                 userData.unclaimedBalance <= 10000000000 ? 0.075 : 0.05;
    const converted = Math.floor(userData.unclaimedBalance * (1 - fee));
    
    updateUserData({
      balance: userData.balance + converted,
      unclaimedBalance: 0
    });
    
    alert(`Converted ${formatAfroX(userData.unclaimedBalance)} to ${formatAfroX(converted)} AfroX (${(fee * 100).toFixed(1)}% fee)`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Wallet Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-yellow-400" />
          <h3 className="font-bold text-lg">Wallet</h3>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-2xl font-bold text-green-400">{formatAfroX(userData.balance)}</p>
            <p className="text-xs text-gray-500">{formatUSD(userData.balance)}</p>
          </div>
          <div className="border-t border-white/10 pt-3">
            <p className="text-sm text-gray-400">Unclaimed Balance</p>
            <p className="text-2xl font-bold text-orange-400">{formatAfroX(userData.unclaimedBalance)}</p>
            <p className="text-xs text-gray-500">{formatUSD(userData.unclaimedBalance)}</p>
            {userData.unclaimedBalance > 0 && (
              <button 
                onClick={convertBalance} 
                className="mt-2 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
              >
                Convert Now (5-10% fee)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spin Tokens Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Coins className="w-6 h-6 text-blue-400" />
          <h3 className="font-bold text-lg">Spin Tokens</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Free (1x)</span>
            <div className="text-right">
              <span className="font-bold">{userData.spinTokens.free}</span>
              <p className="text-xs text-gray-500">168 spins/week</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Premium (2x)</span>
            <div className="text-right">
              <span className="font-bold">{userData.spinTokens.premium}</span>
              <p className="text-xs text-gray-500">1,008 spins/week</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">VIP (5x)</span>
            <div className="text-right">
              <span className="font-bold">{userData.spinTokens.vip}</span>
              <p className="text-xs text-gray-500">3,500 spins/week</p>
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-400 transition mt-2">
            Buy 120 Spins (100M AfroX)
          </button>
        </div>
      </div>

      {/* Next Giveaway Card */}
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-yellow-400" />
          <h3 className="font-bold text-lg">Next Giveaway</h3>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Prize Pool: 1B AfroX (~$10)</p>
          <div className="text-5xl font-bold text-yellow-400 mb-2">{formatCountdown()}</div>
          <p className="text-xs text-gray-400">
            Your Entries: <span className="text-yellow-400 font-bold">{userData.entries}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
