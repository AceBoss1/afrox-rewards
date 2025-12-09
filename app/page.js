'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          AfroX Rewards Hub
        </h1>
        <p className="text-xl text-gray-300 mb-8">Engage • Earn • Win</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <p className="text-lg mb-4">🎉 Platform is loading...</p>
          <p className="text-sm text-gray-400">Deployment successful!</p>
        </div>
      </div>
    </div>
  );
}


