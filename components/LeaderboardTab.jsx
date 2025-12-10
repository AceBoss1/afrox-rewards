'use client';

export default function LeaderboardTab({ userData }) {
  const topPlayers = [
    { rank: 1, username: 'SpinMaster', points: 45890, prize: '10,000M + NFT' },
    { rank: 2, username: 'CryptoQueen', points: 42150, prize: '5,000M' },
    { rank: 3, username: 'LuckyLeo', points: 38920, prize: '5,000M' },
    { rank: 4, username: 'TokenKing', points: 35670, prize: '5,000M' },
    { rank: 5, username: 'WheelWizard', points: 32440, prize: '5,000M' },
  ];

  return (
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
          {topPlayers.map((player) => (
            <div 
              key={player.rank} 
              className={`flex items-center gap-4 p-4 rounded-xl ${
                player.rank === 1 ? 'bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 border-2 border-yellow-400' :
                player.rank <= 3 ? 'bg-white/10' : 'bg-white/5'
              }`}
            >
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
  );
}
