'use client';

export default function FlashMessage({ flashMessage, flashCount, userData }) {
  if (!flashMessage || flashCount <= 0) return null;

  const formatAfroX = (amount) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(2)}B`;
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
    return amount.toLocaleString();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${
      flashCount % 2 === 0 ? 'opacity-100' : 'opacity-0'
    } transition-opacity duration-500`}>
      <div className={`${
        flashMessage.type === 'mega' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' :
        flashMessage.type === 'vip' ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-80' :
        flashMessage.type === 'special' ? 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-600' :
        'bg-gradient-to-r from-blue-500 to-blue-600'
      } p-8 rounded-2xl shadow-2xl border-4 border-white max-w-2xl text-center mx-4`}>
        {(flashMessage.type === 'mega' || flashMessage.type === 'special') && (
          <img 
            src={userData.winningBadge} 
            alt="Winner Badge" 
            className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white"
          />
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
  );
}
