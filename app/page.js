import React, { useState, useEffect, useRef } from 'react';
import { Coins, Trophy, Clock, Gift, Megaphone, Award, Ticket, ChevronDown, Menu, X, Bell, User, Wallet, TrendingUp, Users, Calendar, Star } from 'lucide-react';

const AfroXRewardsHub = () => {
  const [currentTab, setCurrentTab] = useState('spin');
  const [userTier, setUserTier] = useState('free'); // free, premium, vip
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeWon, setPrizeWon] = useState(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [afroxPrice, setAfroxPrice] = useState(0.000000009998);
  const [lastPriceUpdate, setLastPriceUpdate] = useState(Date.now());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashCount, setFlashCount] = useState(0);
  
  // User data
  const [userData, setUserData] = useState({
    username: 'CryptoKing',
    balance: 5420000000, // 5.42B AfroX (available)
    unclaimedBalance: 850000000, // 850M AfroX (needs conversion)
    spinTokens: {
      free: 24,
      premium: 1008,
      vip: 3500
    },
    lastSpinTime: null,
    entries: 3,
    leaderboardRank: 42,
    leaderboardPoints: 1580,
    badges: ['pro-spinner', 'early-adopter'],
    winningBadge: 'https://via.placeholder.com/150/FFD700/000000?text=Winner'
  });

  // Cooldown timers
  const [cooldowns, setCooldowns] = useState({
    free: 0, // seconds
    premium: 0,
    vip: 0
  });

  // Giveaway countdown
  const [nextGiveaway, setNextGiveaway] = useState(null);

  // Wheel configurations
  const wheels = {
    '1x': {
      segments: 12,
      prizes: [
        { value: '1M', type: 'afrox', amount: 1000000, rarity: 'common' },
        { value: '5M', type: 'afrox', amount: 5000000, rarity: 'common' },
        { value: '10M', type: 'afrox', amount: 10000000, rarity: 'common' },
        { value: 'Announce', type: 'announcement', amount: 1, rarity: 'common' },
        { value: '20M', type: 'afrox', amount: 20000000, rarity: 'uncommon' },
        { value: '25M', type: 'afrox', amount: 25000000, rarity: 'uncommon' },
        { value: '30M', type: 'afrox', amount: 30000000, rarity: 'uncommon' },
        { value: '40M', type: 'afrox', amount: 40000000, rarity: 'rare' },
        { value: 'Badge', type: 'badge', amount: 1, rarity: 'rare' },
        { value: '60M', type: 'afrox', amount: 60000000, rarity: 'rare' },
        { value: 'Entry', type: 'entry', amount: 1, rarity: 'epic' },
        { value: '100M', type: 'afrox', amount: 100000000, rarity: 'legendary' }
      ],
      colors: ['#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#10B981', '#10B981', '#10B981', '#8B5CF6', '#8B5CF6', '#8B5CF6', '#F59E0B', '#EAB308'],
      cooldown: 3600, // 1 hour
      multiplier: 1
    },
    '2x': {
      segments: 16,
      prizes: [
        { value: '2M', type: 'afrox', amount: 2000000, rarity: 'common' },
        { value: '4M', type: 'afrox', amount: 4000000, rarity: 'common' },
        { value: '10M', type: 'afrox', amount: 10000000, rarity: 'common' },
        { value: '20M', type: 'afrox', amount: 20000000, rarity: 'common' },
        { value: 'Announce', type: 'announcement', amount: 1, rarity: 'common' },
        { value: '40M', type: 'afrox', amount: 40000000, rarity: 'uncommon' },
        { value: '50M', type: 'afrox', amount: 50000000, rarity: 'uncommon' },
        { value: '60M', type: 'afrox', amount: 60000000, rarity: 'uncommon' },
        { value: '70M', type: 'afrox', amount: 70000000, rarity: 'uncommon' },
        { value: '80M', type: 'afrox', amount: 80000000, rarity: 'rare' },
        { value: 'Badge', type: 'badge', amount: 1, rarity: 'rare' },
        { value: '120M', type: 'afrox', amount: 120000000, rarity: 'rare' },
        { value: '150M', type: 'afrox', amount: 150000000, rarity: 'epic' },
        { value: '180M', type: 'afrox', amount: 180000000, rarity: 'epic' },
        { value: 'Entry', type: 'entry', amount: 1, rarity: 'epic' },
        { value: '250M', type: 'afrox', amount: 250000000, rarity: 'legendary' }
      ],
      colors: ['#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#10B981', '#10B981', '#10B981', '#10B981', '#8B5CF6', '#8B5CF6', '#8B5CF6', '#F59E0B', '#F59E0B', '#F59E0B', '#EAB308'],
      cooldown: 600, // 10 minutes
      multiplier: 2
    },
    '5x': {
      segments: 20,
      prizes: [
        { value: '5M', type: 'afrox', amount: 5000000, rarity: 'common' },
        { value: '10M', type: 'afrox', amount: 10000000, rarity: 'common' },
        { value: '25M', type: 'afrox', amount: 25000000, rarity: 'common' },
        { value: '50M', type: 'afrox', amount: 50000000, rarity: 'common' },
        { value: 'Announce', type: 'announcement', amount: 1, rarity: 'common' },
        { value: '100M', type: 'afrox', amount: 100000000, rarity: 'uncommon' },
        { value: '125M', type: 'afrox', amount: 125000000, rarity: 'uncommon' },
        { value: '150M', type: 'afrox', amount: 150000000, rarity: 'uncommon' },
        { value: '200M', type: 'afrox', amount: 200000000, rarity: 'uncommon' },
        { value: '250M', type: 'afrox', amount: 250000000, rarity: 'uncommon' },
        { value: '300M', type: 'afrox', amount: 300000000, rarity: 'rare' },
        { value: '350M', type: 'afrox', amount: 350000000, rarity: 'rare' },
        { value: '400M', type: 'afrox', amount: 400000000, rarity: 'rare' },
        { value: 'Badge', type: 'badge', amount: 1, rarity: 'rare' },
        { value: '500M', type: 'afrox', amount: 500000000, rarity: 'epic' },
        { value: '600M', type: 'afrox', amount: 600000000, rarity: 'epic' },
        { value: '700M', type: 'afrox', amount: 700000000, rarity: 'epic' },
        { value: 'Entry', type: 'entry', amount: 1, rarity: 'epic' },
        { value: '900M', type: 'afrox', amount: 900000000, rarity: 'legendary' },
        { value: '1B', type: 'afrox', amount: 1000000000, rarity: 'legendary' }
      ],
      colors: ['#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#8B5CF6', '#8B5CF6', '#8B5CF6', '#8B5CF6', '#F59E0B', '#F59E0B', '#F59E0B', '#F59E0B', '#EAB308', '#EAB308'],
      cooldown: 0, // No cooldown
      multiplier: 5
    }
  };

  // Fetch AfroX price from GeckoTerminal
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.geckoterminal.com/api/v2/networks/eth/pools/0xeb10676a236e97e214787e6a72af44c93639ba61');
        const data = await response.json();
        const price = parseFloat(data.data.attributes.base_token_price_usd);
        setAfroxPrice(price);
        setLastPriceUpdate(Date.now());
      } catch (error) {
        console.log('Using cached price');
      }
    };

    fetchPrice();
    const priceInterval = setInterval(fetchPrice, 180000); // 180 seconds

    return () => clearInterval(priceInterval);
  }, []);

  // Calculate next giveaway time
  useEffect(() => {
    const calculateNextGiveaway = () => {
      const now = new Date();
      const hours = [0, 4, 8, 12, 16, 20]; // 6 draws per day
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

  // Cooldown timers
  useEffect(() => {
    const cooldownInterval = setInterval(() => {
      setCooldowns(prev => ({
        free: Math.max(0, prev.free - 1),
        premium: Math.max(0, prev.premium - 1),
        vip: Math.max(0, prev.vip - 1)
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

  const formatAfroX = (amount) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(2)}B`;
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
    return amount.toLocaleString();
  };

  const formatUSD = (afroxAmount) => {
    return `$${(afroxAmount * afroxPrice).toFixed(2)}`;
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatCountdown = () => {
    if (!nextGiveaway) return '00:00:00';
    const diff = Math.floor((nextGiveaway - Date.now()) / 1000);
    return formatTime(Math.max(0, diff));
  };

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

  const spinWheel = () => {
    if (isSpinning) return;
    
    const currentWheel = wheels[`${userTier === 'free' ? '1' : userTier === 'premium' ? '2' : '5'}x`];
    const tierCooldown = cooldowns[userTier];
    
    if (tierCooldown > 0 && userTier !== 'vip') {
      alert(`Please wait ${formatTime(tierCooldown)} before spinning again`);
      return;
    }
    
    const tokensNeeded = currentWheel.multiplier;
    const availableTokens = userData.spinTokens[userTier];
    
    if (availableTokens < tokensNeeded) {
      alert(`Not enough spin tokens! Need ${tokensNeeded}, have ${availableTokens}`);
      return;
    }

    setIsSpinning(true);
    
    // Random prize selection
    const prizeIndex = Math.floor(Math.random() * currentWheel.segments);
    const prize = currentWheel.prizes[prizeIndex];
    
    // Calculate rotation (15-35 seconds of spinning)
    const spinDuration = 15000 + Math.random() * 20000;
    const rotations = 5 + Math.floor(Math.random() * 6); // 5-10 full rotations
    const segmentAngle = 360 / currentWheel.segments;
    const targetRotation = (rotations * 360) + (prizeIndex * segmentAngle) + (segmentAngle / 2);
    
    setRotation(targetRotation);
    
    // Play heartbeat sound in last 5 seconds (simulated)
    setTimeout(() => {
      // Heartbeat effect would play here
      console.log('Heartbeat sound playing...');
    }, spinDuration - 5000);
    
    setTimeout(() => {
      setIsSpinning(false);
      setPrizeWon(prize);
      setShowWinModal(true);
      
      // Update user data
      setUserData(prev => ({
        ...prev,
        unclaimedBalance: prize.type === 'afrox' ? prev.unclaimedBalance + prize.amount : prev.unclaimedBalance,
        spinTokens: {
          ...prev.spinTokens,
          [userTier]: prev.spinTokens[userTier] - tokensNeeded
        },
        entries: prize.type === 'entry' ? prev.entries + 1 : prev.entries
      }));
      
      // Set cooldown
      if (userTier !== 'vip') {
        setCooldowns(prev => ({
          ...prev,
          [userTier]: currentWheel.cooldown
        }));
      }
      
      // Trigger flash message
      triggerFlash(prize, userData.username);
    }, spinDuration);
  };

  const convertBalance = () => {
    const fee = userData.unclaimedBalance <= 1000000000 ? 0.1 : 
                 userData.unclaimedBalance <= 10000000000 ? 0.075 : 0.05;
    const converted = Math.floor(userData.unclaimedBalance * (1 - fee));
    
    setUserData(prev => ({
      ...prev,
      balance: prev.balance + converted,
      unclaimedBalance: 0
    }));
    
    alert(`Converted ${formatAfroX(userData.unclaimedBalance)} to ${formatAfroX(converted)} AfroX (${(fee * 100).toFixed(1)}% fee)`);
  };

  const currentWheel = wheels[`${userTier === 'free' ? '1' : userTier === 'premium' ? '2' : '5'}x`];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Flash Messages */}
      {flashMessage && flashCount > 0 && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${
          flashCount % 2 === 0 ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}>
          <div className={`${
            flashMessage.type === 'mega' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' :
            flashMessage.type === 'vip' ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-80' :
            flashMessage.type === 'special' ? 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-600' :
            'bg-gradient-to-r from-blue-500 to-blue-600'
          } p-8 rounded-2xl shadow-2xl border-4 border-white max-w-2xl text-center`}>
            {(flashMessage.type === 'mega' || flashMessage.type === 'special') && (
              <img src={userData.winningBadge} alt="Winner Badge" className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white" />
            )}
            <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
              🎉 {flashMessage.username} WON! 🎉
            </h2>
            <p className="text-3xl font-bold drop-shadow-lg">
              {flashMessage.prize.type === 'afrox' ? formatAfroX(flashMessage.prize.amount) + ' AfroX' :
               flashMessage.prize.type === 'announcement' ? '📢 Sitewide Announcement' :
               flashMessage.prize.type === 'badge' ? '🏅 Pro-Spinner Badge' :
               '🎟️ Reward Entry'}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Coins className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  AfroX Rewards Hub
                </h1>
                <p className="text-xs text-gray-400">Engage • Earn • Win</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setCurrentTab('spin')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentTab === 'spin' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}>
                <Coins className="w-4 h-4" />
                <span className="font-medium">Spin</span>
              </button>
              <button onClick={() => setCurrentTab('giveaway')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentTab === 'giveaway' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}>
                <Gift className="w-4 h-4" />
                <span className="font-medium">Giveaway</span>
              </button>
              <button onClick={() => setCurrentTab('leaderboard')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentTab === 'leaderboard' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}>
                <Trophy className="w-4 h-4" />
                <span className="font-medium">Leaderboard</span>
              </button>
              <button onClick={() => setCurrentTab('rules')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentTab === 'rules' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}>
                <Award className="w-4 h-4" />
                <span className="font-medium">Rules</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <button onClick={() => { setCurrentTab('spin'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">Spin</button>
              <button onClick={() => { setCurrentTab('giveaway'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">Giveaway</button>
              <button onClick={() => { setCurrentTab('leaderboard'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">Leaderboard</button>
              <button onClick={() => { setCurrentTab('rules'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">Rules</button>
            </nav>
          )}
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-500 text-black px-4 py-2 text-center text-sm font-medium">
          ⚠️ NO PURCHASE NECESSARY TO ENTER HOURLY GIVEAWAY • 18+ ONLY • Not available in restricted regions
        </div>
      </header>

      {/* Price Ticker */}
      <div className="bg-black/40 border-b border-white/10 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">AfroX Price:</span>
            <span className="font-bold text-green-400">${afroxPrice.toFixed(12)} USD</span>
            <span className="text-gray-500">• 1B AfroX = {formatUSD(1000000000)}</span>
          </div>
          <div className="text-gray-500 text-xs">Updated {Math.floor((Date.now() - lastPriceUpdate) / 1000)}s ago</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* User Dashboard */}
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
                  <button onClick={convertBalance} className="mt-2 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition">
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
                <span className="font-bold">{userData.spinTokens.free}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Premium (2x)</span>
                <span className="font-bold">{userData.spinTokens.premium}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">VIP (5x)</span>
                <span className="font-bold">{userData.spinTokens.vip}</span>
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
              <p className="text-xs text-gray-400">Your Entries: <span className="text-yellow-400 font-bold">{userData.entries}</span></p>
            </div>
          </div>
        </div>

        {/* Main Tab Content */}
        {currentTab === 'spin' && (
          <div className="space-y-6">
            {/* Tier Selector */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-lg mb-4">Select Your Wheel</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setUserTier('free')} className={`p-4 rounded-xl border-2 transition ${userTier === 'free' ? 'border-blue-400 bg-blue-500/20' : 'border-white/10 hover:border-blue-400/50'}`}>
                  <div className="text-sm font-bold text-blue-400 mb-2">FREE TIER</div>
                  <div className="text-2xl font-bold mb-1">1x Multiplier</div>
                  <div className="text-xs text-gray-400">⏲️ Cooldown: {cooldowns.free > 0 ? formatTime(cooldowns.free) : 'Ready!'}</div>
                </button>
                <button onClick={() => setUserTier('premium')} className={`p-4 rounded-xl border-2 transition ${userTier === 'premium' ? 'border-green-400 bg-green-500/20' : 'border-white/10 hover:border-green-400/50'}`}>
                  <div className="text-sm font-bold text-green-400 mb-2">PREMIUM TIER</div>
                  <div className="text-2xl font-bold mb-1">2x Multiplier</div>
                  <div className="text-xs text-gray-400">⏲️ Cooldown: {cooldowns.premium > 0 ? formatTime(cooldowns.premium) : 'Ready!'}</div>
                </button>
                <button onClick={() => setUserTier('vip')} className={`p-4 rounded-xl border-2 transition ${userTier === 'vip' ? 'border-yellow-400 bg-yellow-500/20' : 'border-white/10 hover:border-yellow-400/50'}`}>
                  <div className="text-sm font-bold text-yellow-400 mb-2">VIP TIER</div>
                  <div className="text-2xl font-bold mb-1">5x Multiplier</div>
                  <div className="text-xs text-gray-400">🎰 Spins: {userData.spinTokens.vip} remaining today</div>
                </button>
              </div>
            </div>

            {/* Spin Wheel */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <WheelComponent
                wheel={currentWheel}
                rotation={rotation}
                isSpinning={isSpinning}
              />
              
              <div className="text-center mt-8">
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || (cooldowns[userTier] > 0 && userTier !== 'vip')}
                  className={`px-12 py-4 rounded-xl font-bold text-xl transition ${
                    isSpinning || (cooldowns[userTier] > 0 && userTier !== 'vip')
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg'
                  }`}
                >
                  {isSpinning ? 'SPINNING...' : cooldowns[userTier] > 0 && userTier !== 'vip' ? `Wait ${formatTime(cooldowns[userTier])}` : 'SPIN NOW!'}
                </button>
                <p className="text-sm text-gray-400 mt-3">
                  Cost: {currentWheel.multiplier} token{currentWheel.multiplier > 1 ? 's' : ''} • Available: {userData.spinTokens[userTier]}
                </p>
              </div>
            </div>

            {/* Prize Table */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-lg mb-4">Prize Table - {currentWheel.multiplier}x Multiplier</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentWheel.prizes.map((prize, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    prize.rarity === 'legendary' ? 'border-yellow-400 bg-yellow-500/10' :
                    prize.rarity === 'epic' ? 'border-orange-400 bg-orange-500/10' :
                    prize.rarity === 'rare' ? 'border-purple-400 bg-purple-500/10' :
                    prize.rarity === 'uncommon' ? 'border-green-400 bg-green-500/10' :
                    'border-blue-400 bg-blue-500/10'
                  }`}>
                    <div className="text-center">
                      <div className="text-sm font-bold mb-1">
                        {prize.type === 'afrox' ? formatAfroX(prize.amount) :
                         prize.type === 'announcement' ? '📢 Announce' :
                         prize.type === 'badge' ? '🏅 Badge' :
                         '🎟️ Entry'}
                      </div>
                      {prize.type === 'afrox' && (
                        <div className="text-xs text-gray-400">{formatUSD(prize.amount)}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">{(100 / currentWheel.segments).toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'giveaway' && (
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
        )}

        {currentTab === 'leaderboard' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-center">Global Leaderboard</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Your Rank</p>
                    <p className="text-4xl font-bold text-yellow-400">#{userData.leaderboardRank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Your Points</p>
                    <p className="text-4xl font-bold">{userData.leaderboardPoints}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { rank: 1, username: 'SpinMaster', points: 45890, prize: '10,000M + NFT' },
                  { rank: 2, username: 'CryptoQueen', points: 42150, prize: '5,000M' },
                  { rank: 3, username: 'LuckyLeo', points: 38920, prize: '5,000M' },
                  { rank: 4, username: 'TokenKing', points: 35670, prize: '5,000M' },
                  { rank: 5, username: 'WheelWizard', points: 32440, prize: '5,000M' }
                ].map((player) => (
                  <div key={player.rank} className={`flex items-center gap-4 p-4 rounded-xl ${
                    player.rank === 1 ? 'bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 border-2 border-yellow-400' :
                    player.rank <= 3 ? 'bg-white/10' : 'bg-white/5'
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1 ? 'bg-yellow-400 text-black' :
                      player.rank === 2 ? 'bg-gray-300 text-black' :
                      player.rank === 3 ? 'bg-orange-400 text-black' :
                      'bg-white/20'
                    }`}>
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{player.username}</p>
                      <p className="text-sm text-gray-400">{player.points} points</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-yellow-400 font-bold">{player.prize}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-4">How to Earn Points</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Spin completed:</span>
                    <span className="font-bold">1 point</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily login:</span>
                    <span className="font-bold">10 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active referral:</span>
                    <span className="font-bold">50 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7-day streak:</span>
                    <span className="font-bold">20 points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'rules' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6">Official Rules</h2>
            <div className="prose prose-invert max-w-none">
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">⚠️ NO PURCHASE NECESSARY TO ENTER OR WIN</h3>
                <p className="text-gray-300">Free entry methods are always available and provide equal chances to win.</p>
              </div>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">1. ELIGIBILITY</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Open to legal residents of countries where sweepstakes are legal</li>
                  <li>Must be 18+ years old</li>
                  <li>Employees/family of AfroX Community of Trust ineligible</li>
                  <li>Void where prohibited by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">2. ENTRY PERIOD</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Ongoing draws every 4 hours (6 draws daily)</li>
                  <li>Each draw is a separate promotion</li>
                  <li>Entries reset after each draw</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">3. HOW TO ENTER (FREE METHODS)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Method 1: Automatic daily entry (1 per day)</li>
                  <li>Method 2: Watch 3 advertisements (+1 entry)</li>
                  <li>Method 3: Complete daily survey (+1 entry)</li>
                  <li>Method 4: Social media share (+1 entry daily)</li>
                  <li>Method 5: Referral program (+1 per active referral)</li>
                  <li>Method 6: 7-day login streak (+3 entries)</li>
                  <li>Maximum 10 entries per user per draw</li>
                  <li className="font-bold text-yellow-400">NO PURCHASE INCREASES YOUR CHANCES</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">4. PRIZE DETAILS</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Prize per draw: 1 Billion AfroX tokens</li>
                  <li>Approximate Retail Value (ARV): ~$10 USD</li>
                  <li>Distribution: 1st-500M, 2nd-300M, 3rd-200M</li>
                  <li>Prizes awarded as AfroX tokens to platform wallet</li>
                  <li>Winners must convert tokens before withdrawal (5-10% fee)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">5. WINNER SELECTION</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Random drawing from all eligible entries</li>
                  <li>Must be online and active within 10 minutes of draw</li>
                  <li>10-minute claim window</li>
                  <li>Unclaimed prizes trigger redraw</li>
                  <li>Provably fair random number generation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">6. DISCLAIMER</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Platform is entertainment/engagement service</li>
                  <li>NOT a gambling site</li>
                  <li>AfroX has utility beyond giveaways</li>
                  <li>Users responsible for local law compliance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3">7. CONTACT</h3>
                <p className="text-gray-300">
                  AfroX DAO Community of Trust<br/>
                  Email: cot@afrox.one<br/>
                  Contract: 0x08130635368aa28b217a4dfb68e1bf8dc525621c
                </p>
              </section>

              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-bold text-red-400 mb-3">🚫 NOT AVAILABLE IN:</h3>
                <p className="text-gray-300">United States, China, UAE, and other restricted jurisdictions. Check full list before participating.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Win Modal */}
      {showWinModal && prizeWon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border-4 border-yellow-400 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
              <p className="text-gray-300 mb-6">You won:</p>
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {prizeWon.type === 'afrox' ? formatAfroX(prizeWon.amount) :
                 prizeWon.type === 'announcement' ? '📢' :
                 prizeWon.type === 'badge' ? '🏅' :
                 '🎟️'}
              </div>
              <p className="text-xl mb-6">
                {prizeWon.type === 'afrox' ? `AfroX (${formatUSD(prizeWon.amount)})` :
                 prizeWon.type === 'announcement' ? 'Sitewide Announcement' :
                 prizeWon.type === 'badge' ? '7-Day Pro-Spinner Badge' :
                 'Reward Entry'}
              </p>
              {prizeWon.type === 'afrox' && (
                <p className="text-sm text-gray-400 mb-6">Added to unclaimed balance. Convert to use.</p>
              )}
              <button onClick={() => setShowWinModal(false)} className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition">
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mb-2">💱 AfroX tokens are rewards for platform engagement. Trading value may fluctuate. Not financial advice.</p>
          <p className="mb-2">🔞 18+ ONLY | Not available in restricted regions</p>
          <p>© 2025 AfroX DAO Community of Trust • rewards.afrox.one</p>
        </div>
      </footer>
    </div>
  );
};

// Wheel Component
const WheelComponent = ({ wheel, rotation, isSpinning }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    const segments = wheel.segments;
    const anglePerSegment = (2 * Math.PI) / segments;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context for rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    // Draw segments
    for (let i = 0; i < segments; i++) {
      const startAngle = i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = wheel.colors[i];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(wheel.prizes[i].value, radius * 0.65, 0);
      ctx.restore();
    }

    // Restore context
    ctx.restore();

    // Draw outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Draw inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw multiplier
    ctx.fillStyle = '#EAB308';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${wheel.multiplier}x`, centerX, centerY);

    // Draw pointer (pointing DOWN)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 30);
    ctx.lineTo(centerX - 20, centerY - radius - 10);
    ctx.lineTo(centerX + 20, centerY - radius - 10);
    ctx.closePath();
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add shadow to pointer
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }, [rotation, wheel]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        className={`transition-transform duration-[${isSpinning ? '15000' : '0'}ms] ease-out`}
        style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))' }}
      />
    </div>
  );
};

export default AfroXRewardsHub;
