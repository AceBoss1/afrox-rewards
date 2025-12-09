'use client';

import { useState } from 'react';
import WheelComponent from './WheelComponent';

export default function SpinTab({ 
  userTier, 
  setUserTier, 
  userData, 
  updateUserData,
  cooldowns, 
  updateCooldowns,
  afroxPrice,
  triggerFlash 
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeWon, setPrizeWon] = useState(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
      cooldown: 3600,
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
      cooldown: 600,
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
      cooldown: 0,
      multiplier: 5
    }
  };

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

  const currentWheel = wheels[`${userTier === 'free' ? '1' : userTier === 'premium' ? '2' : '5'}x`];

  const spinWheel = () => {
    if (isSpinning) return;
    
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
    
    // Calculate rotation - IMPORTANT: This makes it spin!
    const spinDuration = 15000 + Math.random() * 20000; // 15-35 seconds
    const rotations = 5 + Math.floor(Math.random() * 6); // 5-10 full rotations
    const segmentAngle = 360 / currentWheel.segments;
    
    // Calculate where to stop (target segment)
    const targetAngle = prizeIndex * segmentAngle;
    const totalRotation = (rotations * 360) + targetAngle;
    
    // Set rotation - THIS TRIGGERS THE ANIMATION
    setRotation(rotation + totalRotation);
    
    // Heartbeat sound in last 5 seconds
    setTimeout(() => {
      console.log('💓 Heartbeat sound playing...');
    }, spinDuration - 5000);
    
    // After spin completes
    setTimeout(() => {
      setIsSpinning(false);
      setPrizeWon(prize);
      setShowWinModal(true);
      
      // Show confetti for special prizes or big wins
      const isSpecialPrize = prize.type !== 'afrox';
      const isBigWin = prize.type === 'afrox' && prize.amount >= 100000000;
      
      if (isSpecialPrize || isBigWin) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      
      // Update user data
      const newTokens = { ...userData.spinTokens };
      newTokens[userTier] = newTokens[userTier] - tokensNeeded;
      
      updateUserData({
        unclaimedBalance: prize.type === 'afrox' ? userData.unclaimedBalance + prize.amount : userData.unclaimedBalance,
        spinTokens: newTokens,
        entries: prize.type === 'entry' ? userData.entries + 1 : userData.entries
      });
      
      // Set cooldown
      if (userTier !== 'vip') {
        updateCooldowns({ [userTier]: currentWheel.cooldown });
      }
      
      // Trigger flash message (shows to all users)
      triggerFlash(prize, userData.username);
      
      // Play win sound based on rarity
      console.log(`🎵 Playing ${prize.rarity} win sound!`);
    }, spinDuration);
  };

  return (
    <div className="space-y-6">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                backgroundColor: ['#EAB308', '#F59E0B', '#8B5CF6', '#3B82F6', '#10B981'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Tier Selector */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="font-bold text-lg mb-4">Select Your Wheel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setUserTier('free')} 
            className={`p-4 rounded-xl border-2 transition ${
              userTier === 'free' ? 'border-blue-400 bg-blue-500/20' : 'border-white/10 hover:border-blue-400/50'
            }`}
          >
            <div className="text-sm font-bold text-blue-400 mb-2">FREE TIER</div>
            <div className="text-2xl font-bold mb-1">1x Multiplier</div>
            <div className="text-xs text-gray-400">
              ⏲️ Cooldown: {cooldowns.free > 0 ? formatTime(cooldowns.free) : 'Ready!'}
            </div>
          </button>
          <button 
            onClick={() => setUserTier('premium')} 
            className={`p-4 rounded-xl border-2 transition ${
              userTier === 'premium' ? 'border-green-400 bg-green-500/20' : 'border-white/10 hover:border-green-400/50'
            }`}
          >
            <div className="text-sm font-bold text-green-400 mb-2">PREMIUM TIER</div>
            <div className="text-2xl font-bold mb-1">2x Multiplier</div>
            <div className="text-xs text-gray-400">
              ⏲️ Cooldown: {cooldowns.premium > 0 ? formatTime(cooldowns.premium) : 'Ready!'}
            </div>
          </button>
          <button 
            onClick={() => setUserTier('vip')} 
            className={`p-4 rounded-xl border-2 transition ${
              userTier === 'vip' ? 'border-yellow-400 bg-yellow-500/20' : 'border-white/10 hover:border-yellow-400/50'
            }`}
          >
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
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isSpinning ? '🎰 SPINNING...' : 
             cooldowns[userTier] > 0 && userTier !== 'vip' ? `⏲️ Wait ${formatTime(cooldowns[userTier])}` : 
             '🎯 SPIN NOW!'}
          </button>
          <p className="text-sm text-gray-400 mt-3">
            Cost: {currentWheel.multiplier} token{currentWheel.multiplier > 1 ? 's' : ''} • Available: {userData.spinTokens[userTier]}
          </p>
        </div>
      </div>

      {/* Prize Table - CONTINUES IN NEXT MESSAGE... */}
