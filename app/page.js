// ============================================
// FILE: app/page.js 
// ============================================
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import PriceTicker from '../components/PriceTicker';
import UserDashboard from '../components/UserDashboard';
import SpinTab from '../components/SpinTab';
import GiveawayTab from '../components/GiveawayTab';
import LeaderboardTab from '../components/LeaderboardTab';
import RulesTab from '../components/RulesTab';
import FlashMessage from '../components/FlashMessage';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('spin');
  const [userTier, setUserTier] = useState('free');
  const [afroxPrice, setAfroxPrice] = useState(0.000000009998);
  const [lastPriceUpdate, setLastPriceUpdate] = useState(Date.now());
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashCount, setFlashCount] = useState(0);
  
  const [userData, setUserData] = useState({
    username: 'Player' + Math.floor(Math.random() * 10000),
    balance: 5420000000,
    unclaimedBalance: 850000000,
    spinTokens: {
      free: 24,
      premium: 1008,
      vip: 3500
    },
    lastSpinTime: null,
    entries: 3,
    leaderboardRank: 42,
    leaderboardPoints: 1580,
    badges: ['pro-spinner'],
    winningBadge: '/afrodex_token.png'
  });

  const [cooldowns, setCooldowns] = useState({
    free: 0,
    premium: 0,
    vip: 0
  });

  // Fetch AfroX price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('/api/price');
        const data = await response.json();
        if (data.success) {
          setAfroxPrice(data.price);
          setLastPriceUpdate(Date.now());
        }
      } catch (error) {
        console.error('Price fetch error:', error);
      }
    };

    fetchPrice();
    const priceInterval = setInterval(fetchPrice, 180000);
    return () => clearInterval(priceInterval);
  }, []);

  // Cooldown timer
  useEffect(() => {
    const cooldownInterval = setInterval(() => {
      setCooldowns(prev => ({
        free: Math.max(0, prev.free - 1),
        premium: Math.max(0, prev.premium - 1),
        vip: Math.max(0, prev.vip - 0)
      }));
    }, 1000);

    return () => clearInterval(cooldownInterval);
  }, []);

  // Flash message effect
  useEffect(() => {
    if (flashMessage && flashCount > 0) {
      const timer = setTimeout(() => {
        setFlashCount(prev => prev - 1);
        if (flashCount <= 1) {
          setFlashMessage(null);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage, flashCount]);

  const triggerFlash = (prize, username) => {
    const amount = prize.amount;
    const isSpecial = prize.type !== 'afrox';
    
    let flashTimes = 1;
    let flashType = 'normal';
    
    if (isSpecial || prize.type === 'entry') {
      flashTimes = 5;
      flashType = 'special';
    } else if (amount >= 900000000) {
      flashTimes = 5;
      flashType = 'mega';
    } else if (amount >= 500000000) {
      flashTimes = 3;
      flashType = 'vip';
    } else if (amount >= 100000000) {
      flashTimes = 1;
      flashType = 'big';
    }
    
    if (flashTimes > 0) {
      setFlashMessage({ prize, username, type: flashType });
      setFlashCount(flashTimes);
    }
  };

  const updateUserData = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const updateCooldowns = (updates) => {
    setCooldowns(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <FlashMessage 
        flashMessage={flashMessage}
        flashCount={flashCount}
        userData={userData}
      />

      <Header 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <PriceTicker 
        afroxPrice={afroxPrice}
        lastPriceUpdate={lastPriceUpdate}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <UserDashboard 
          userData={userData}
          updateUserData={updateUserData}
          afroxPrice={afroxPrice}
        />

        {currentTab === 'spin' && (
          <SpinTab
            userTier={userTier}
            setUserTier={setUserTier}
            userData={userData}
            updateUserData={updateUserData}
            cooldowns={cooldowns}
            updateCooldowns={updateCooldowns}
            afroxPrice={afroxPrice}
            triggerFlash={triggerFlash}
          />
        )}

        {currentTab === 'giveaway' && (
          <GiveawayTab
            userData={userData}
            afroxPrice={afroxPrice}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardTab
            userData={userData}
          />
        )}

        {currentTab === 'rules' && (
          <RulesTab />
        )}
      </main>

      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm space-y-2">
          <p>💱 AfroX tokens are rewards for platform engagement. Trading value may fluctuate. Not financial advice.</p>
          <p>🔞 18+ ONLY | Not available in restricted regions</p>
          <p>© 2024 AfroX DAO Community of Trust • rewards.afrox.one</p>
        </div>
      </footer>
    </div>
  );
}
