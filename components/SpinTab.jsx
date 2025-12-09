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
    
    const prizeIndex = Math.floor(Math.random() * currentWheel.segments);
    const prize = currentWheel.prizes[prizeIndex];
    
    const spinDuration = 15000 + Math.random() * 20000;
    const rotations = 5 + Math.floor(Math.random() * 6);
    const segmentAngle = 360 / currentWheel.segments;
    const targetRotation = (rotations * 360) + (prizeIndex * segmentAngle) + (segmentAngle / 2);
    
    setRotation(targetRotation);
    
    setTimeout(() => {
      console.log('Heartbeat sound playing...');
    }, spinDuration - 5000);
    
    setTimeout(() => {
      setIsSpinning(false);
      setPrizeWon(prize);
      setShowWinModal(true);
      
      const newTokens = { ...userData.spinTokens };
      newTokens[userTier] = newTokens[userTier] - tokensNeeded;
      
      updateUserData({
        unclaimedBalance: prize.type === 'afrox' ? userData.unclaimedBalance + prize.amount : userData.unclaimedBalance,
        spinTokens: newTokens,
        entries: prize.type === 'entry' ? userData.entries + 1 : userData.entries
      });
      
      if (userTier !== 'vip') {
        updateCooldowns({ [userTier]: currentWheel.cooldown });
      }
      
      triggerFlash(prize, userData.username);
    }, spinDuration);
  };

  return (
    <div className="space-y-6">
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
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg'
            }`}
          >
            {isSpinning ? 'SPINNING...' : 
             cooldowns[userTier] > 0 && userTier !== 'vip' ? `Wait ${formatTime(cooldowns[userTier])}` : 
             'SPIN NOW!'}
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
            <div 
              key={idx} 
              className={`p-3 rounded-lg border ${
                prize.rarity === 'legendary' ? 'border-yellow-400 bg-yellow-500/10' :
                prize.rarity === 'epic' ? 'border-orange-400 bg-orange-500/10' :
                prize.rarity === 'rare' ? 'border-purple-400 bg-purple-500/10' :
                prize.rarity === 'uncommon' ? 'border-green-400 bg-green-500/10' :
                'border-blue-400 bg-blue-500/10'
              }`}
            >
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
                <div className="text-xs text-gray-500 mt-1">
                  {(100 / currentWheel.segments).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              <button 
                onClick={() => setShowWinModal(false)} 
                className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
