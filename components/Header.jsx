'use client';

import { useState } from 'react';
import { Coins, Gift, Trophy, Award, Menu, X } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
            <button 
              onClick={() => setCurrentTab('spin')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                currentTab === 'spin' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span className="font-medium">Spin</span>
            </button>
            <button 
              onClick={() => setCurrentTab('giveaway')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                currentTab === 'giveaway' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span className="font-medium">Giveaway</span>
            </button>
            <button 
              onClick={() => setCurrentTab('leaderboard')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                currentTab === 'leaderboard' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span className="font-medium">Leaderboard</span>
            </button>
            <button 
              onClick={() => setCurrentTab('rules')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                currentTab === 'rules' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="font-medium">Rules</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <button 
              onClick={() => { setCurrentTab('spin'); setMobileMenuOpen(false); }} 
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Spin
            </button>
            <button 
              onClick={() => { setCurrentTab('giveaway'); setMobileMenuOpen(false); }} 
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Giveaway
            </button>
            <button 
              onClick={() => { setCurrentTab('leaderboard'); setMobileMenuOpen(false); }} 
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Leaderboard
            </button>
            <button 
              onClick={() => { setCurrentTab('rules'); setMobileMenuOpen(false); }} 
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Rules
            </button>
          </nav>
        )}
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-500 text-black px-4 py-2 text-center text-sm font-medium">
        ⚠️ NO PURCHASE NECESSARY TO ENTER HOURLY GIVEAWAY • 18+ ONLY • Not available in restricted regions
      </div>
    </header>
  );
}
