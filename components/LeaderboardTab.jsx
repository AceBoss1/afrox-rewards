// ============================================
// components/LeaderboardTab.jsx
// ============================================

'use client';

export default function LeaderboardTab({ userData }) {
  const topPlayers = [
    { rank: 1, username: 'SpinMaster', points: 45890, prize: '10,000M + NFT' },
    { rank: 2, username: 'CryptoQueen', points: 42150, prize: '5,000M' },
    { rank: 3, username: 'LuckyLeo', points: 38920, prize: '5,000M' },
    { rank: 4, username: 'TokenKing', points: 35670, prize: '5,000M' },
    { rank: 5, username: 'WheelWizard', points: 32440, prize: '5,000M' },
    { rank: 6, username: 'AfroXChamp', points: 28990, prize: '2,000M' },
    { rank: 7, username: 'SpinLegend', points: 26540, prize: '2,000M' },
    { rank: 8, username: 'PrizeHunter', points: 24120, prize: '2,000M' },
    { rank: 9, username: 'GoldenWheel', points: 22870, prize: '2,000M' },
    { rank: 10, username: 'MegaSpin', points: 21450, prize: '2,000M' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold mb-6 text-center">Global Leaderboard</h2>
      <div className="max-w-3xl mx-auto">
        {/* User's Rank Card */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-400">Your Rank</p>
              <p className="text-4xl font-bold text-yellow-400">#{userData.leaderboardRank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Your Points</p>
              <p className="text-4xl font-bold">{userData.leaderboardPoints}</p>
            </div>
            <div className="w-full md:w-auto">
              <p className="text-sm text-gray-400 mb-2">Your Badges</p>
              <div className="flex gap-2">
                {userData.badges.includes('pro-spinner') && (
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded-full text-xs font-bold">
                    🏅 Pro-Spinner
                  </span>
                )}
                {userData.badges.includes('early-adopter') && (
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-xs font-bold">
                    ⭐ Early Adopter
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Prize Pool Info */}
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">💰 Monthly Prize Pool: 60,000M AfroX (~$600)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <p className="text-gray-400">Rank #1</p>
              <p className="font-bold text-yellow-400">10,000M + NFT</p>
            </div>
            <div>
              <p className="text-gray-400">Rank #2-5</p>
              <p className="font-bold text-gray-300">5,000M each</p>
            </div>
            <div>
              <p className="text-gray-400">Rank #6-10</p>
              <p className="font-bold text-orange-400">2,000M each</p>
            </div>
            <div>
              <p className="text-gray-400">Rank #11-50</p>
              <p className="font-bold text-blue-400">500M each</p>
            </div>
          </div>
        </div>

        {/* Top 10 Players */}
        <div className="space-y-2 mb-6">
          {topPlayers.map((player) => (
            <div 
              key={player.rank} 
              className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
                player.rank === 1 ? 'bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 border-2 border-yellow-400' :
                player.rank === 2 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-2 border-gray-400' :
                player.rank === 3 ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-2 border-orange-400' :
                player.rank <= 5 ? 'bg-white/10' : 
                'bg-white/5'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
                player.rank === 1 ? 'bg-yellow-400 text-black' :
                player.rank === 2 ? 'bg-gray-300 text-black' :
                player.rank === 3 ? 'bg-orange-400 text-black' :
                'bg-white/20'
              }`}>
                {player.rank === 1 ? '🥇' : 
                 player.rank === 2 ? '🥈' : 
                 player.rank === 3 ? '🥉' : 
                 player.rank}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{player.username}</p>
                <p className="text-sm text-gray-400">{player.points.toLocaleString()} points</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-yellow-400 font-bold">{player.prize}</p>
                {player.rank === 1 && (
                  <p className="text-xs text-gray-400">Exclusive NFT</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How to Earn Points */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">📊 How to Earn Points</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎰</span>
                <span className="text-gray-400">Complete a spin</span>
              </div>
              <span className="font-bold text-green-400">+1 point</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <span className="text-gray-400">Daily login</span>
              </div>
              <span className="font-bold text-green-400">+10 points</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <span className="text-gray-400">Active referral</span>
              </div>
              <span className="font-bold text-green-400">+50 points</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span className="text-gray-400">Social media share</span>
              </div>
              <span className="font-bold text-green-400">+5 points</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <span className="text-gray-400">Complete survey/poll</span>
              </div>
              <span className="font-bold text-green-400">+5 points</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <span className="text-gray-400">7-day login streak</span>
              </div>
              <span className="font-bold text-green-400">+20 points</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Reset Info */}
        <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-400">
            ℹ️ Leaderboard resets monthly. Current season ends in <span className="font-bold">23 days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
