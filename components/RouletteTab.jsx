import React, { useState, useRef, useEffect } from 'react';
import { Coins, TrendingUp } from 'lucide-react';

export default function RouletteGame() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState(50000000); // 50M AfroX
  const [balance, setBalance] = useState(5420000000); // 5.42B AfroX
  const [lastWin, setLastWin] = useState(null);
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);

  const afroxPrice = 0.000000009998;

  // Roulette numbers with colors (American style)
  const rouletteNumbers = [
    { num: 0, color: 'green' },
    { num: 32, color: 'red' }, { num: 15, color: 'black' }, { num: 19, color: 'red' },
    { num: 4, color: 'black' }, { num: 21, color: 'red' }, { num: 2, color: 'black' },
    { num: 25, color: 'red' }, { num: 17, color: 'black' }, { num: 34, color: 'red' },
    { num: 6, color: 'black' }, { num: 27, color: 'red' }, { num: 13, color: 'black' },
    { num: 36, color: 'red' }, { num: 11, color: 'black' }, { num: 30, color: 'red' },
    { num: 8, color: 'black' }, { num: 23, color: 'red' }, { num: 10, color: 'black' },
    { num: 5, color: 'red' }, { num: 24, color: 'black' }, { num: 16, color: 'red' },
    { num: 33, color: 'black' }, { num: 1, color: 'red' }, { num: 20, color: 'black' },
    { num: 14, color: 'red' }, { num: 31, color: 'black' }, { num: 9, color: 'red' },
    { num: 22, color: 'black' }, { num: 18, color: 'red' }, { num: 29, color: 'black' },
    { num: 7, color: 'red' }, { num: 28, color: 'black' }, { num: 12, color: 'red' },
    { num: 35, color: 'black' }, { num: 3, color: 'red' }, { num: 26, color: 'black' }
  ];

  const betOptions = [
    { id: 'red', label: 'Red', payout: 2, color: 'bg-red-600' },
    { id: 'black', label: 'Black', payout: 2, color: 'bg-black' },
    { id: 'even', label: 'Even', payout: 2, color: 'bg-blue-600' },
    { id: 'odd', label: 'Odd', payout: 2, color: 'bg-purple-600' },
    { id: 'low', label: '1-18', payout: 2, color: 'bg-green-600' },
    { id: 'high', label: '19-36', payout: 2, color: 'bg-orange-600' },
  ];

  const formatAfroX = (amount) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(2)}B`;
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
    return amount.toLocaleString();
  };

  const formatUSD = (afroxAmount) => {
    return `$${(afroxAmount * afroxPrice).toFixed(2)}`;
  };

  useEffect(() => {
    drawWheel();
  }, []);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    const segmentAngle = (2 * Math.PI) / rouletteNumbers.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    rouletteNumbers.forEach((item, i) => {
      const startAngle = i * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Color based on number
      ctx.fillStyle = item.color === 'red' ? '#DC2626' : 
                      item.color === 'black' ? '#1F2937' : '#10B981';
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw number
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(item.num, radius * 0.75, 0);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Center text
    ctx.fillStyle = '#EAB308';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY);
  };

  const checkWin = (resultNumber, resultColor) => {
    if (!selectedBet) return null;

    const bet = betOptions.find(b => b.id === selectedBet);
    if (!bet) return null;

    let won = false;

    switch (selectedBet) {
      case 'red':
        won = resultColor === 'red';
        break;
      case 'black':
        won = resultColor === 'black';
        break;
      case 'even':
        won = resultNumber !== 0 && resultNumber % 2 === 0;
        break;
      case 'odd':
        won = resultNumber !== 0 && resultNumber % 2 !== 0;
        break;
      case 'low':
        won = resultNumber >= 1 && resultNumber <= 18;
        break;
      case 'high':
        won = resultNumber >= 19 && resultNumber <= 36;
        break;
    }

    return won ? betAmount * bet.payout : 0;
  };

  const spinRoulette = () => {
    if (spinning || !selectedBet || betAmount <= 0) {
      if (!selectedBet) alert('Please select a bet!');
      if (betAmount <= 0) alert('Please enter a bet amount!');
      return;
    }

    if (balance < betAmount) {
      alert('Insufficient balance!');
      return;
    }

    setSpinning(true);
    setBalance(prev => prev - betAmount);

    // Random result
    const resultIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const result = rouletteNumbers[resultIndex];

    const spinDuration = 8000 + Math.random() * 4000; // 8-12 seconds
    const rotations = 10 + Math.floor(Math.random() * 5); // 10-15 spins
    const segmentAngle = 360 / rouletteNumbers.length;
    const targetAngle = 360 - (resultIndex * segmentAngle);
    const finalRotation = (rotations * 360) + targetAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      
      const winAmount = checkWin(result.num, result.color);
      
      if (winAmount > 0) {
        setLastWin(winAmount);
        setBalance(prev => prev + winAmount);
      } else {
        setLastWin(0);
      }

      // Add to history
      setHistory(prev => [{
        number: result.num,
        color: result.color,
        bet: selectedBet,
        betAmount: betAmount,
        won: winAmount > 0,
        winAmount: winAmount
      }, ...prev.slice(0, 9)]);

    }, spinDuration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            AfroX Roulette
          </h1>
          <p className="text-gray-400">Place your bets and spin to win!</p>
        </div>

        {/* Balance Display */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coins className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Your Balance</p>
                <p className="text-2xl font-bold text-green-400">{formatAfroX(balance)}</p>
                <p className="text-xs text-gray-500">{formatUSD(balance)}</p>
              </div>
            </div>
            {lastWin !== null && (
              <div className="text-right">
                <p className="text-sm text-gray-400">Last Result</p>
                <p className={`text-2xl font-bold ${lastWin > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {lastWin > 0 ? `+${formatAfroX(lastWin)}` : 'Lost'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roulette Wheel */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="relative flex flex-col items-center">
              {/* Pointer */}
              <div className="relative z-10 mb-[-30px]">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M 20 35 L 5 10 L 35 10 Z" fill="#FFD700" stroke="#000" strokeWidth="2"/>
                </svg>
              </div>

              {/* Wheel */}
              <div
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 10s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={450}
                  height={450}
                  className="max-w-full h-auto"
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))' }}
                />
              </div>

              {/* Spin Button */}
              <button
                onClick={spinRoulette}
                disabled={spinning || !selectedBet}
                className={`mt-6 px-12 py-4 rounded-xl font-bold text-xl transition ${
                  spinning || !selectedBet
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg'
                }`}
              >
                {spinning ? '🎰 SPINNING...' : '🎯 SPIN NOW!'}
              </button>
            </div>
          </div>

          {/* Betting Panel */}
          <div className="space-y-6">
            {/* Bet Amount */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-bold mb-4">Bet Amount</h3>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-lg"
                placeholder="Enter bet amount"
                disabled={spinning}
              />
              <p className="text-xs text-gray-400 mt-2">{formatUSD(betAmount)}</p>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[10000000, 50000000, 100000000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    disabled={spinning}
                    className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition"
                  >
                    {formatAfroX(amount)}
                  </button>
                ))}
              </div>
            </div>

            {/* Bet Options */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-bold mb-4">Select Your Bet</h3>
              <div className="space-y-2">
                {betOptions.map(bet => (
                  <button
                    key={bet.id}
                    onClick={() => setSelectedBet(bet.id)}
                    disabled={spinning}
                    className={`w-full p-4 rounded-lg border-2 transition ${
                      selectedBet === bet.id
                        ? 'border-yellow-400 bg-yellow-500/20'
                        : 'border-white/20 hover:border-white/40'
                    } ${bet.color}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{bet.label}</span>
                      <span className="text-sm text-yellow-400">{bet.payout}x</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-bold mb-4">Recent Spins</h3>
              <div className="space-y-2">
                {history.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No spins yet</p>
                ) : (
                  history.map((spin, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          spin.color === 'red' ? 'bg-red-600' :
                          spin.color === 'black' ? 'bg-gray-800' :
                          'bg-green-600'
                        }`}>
                          {spin.number}
                        </div>
                        <span className="text-xs text-gray-400">{spin.bet}</span>
                      </div>
                      <span className={`font-bold text-sm ${spin.won ? 'text-green-400' : 'text-red-400'}`}>
                        {spin.won ? `+${formatAfroX(spin.winAmount)}` : `-${formatAfroX(spin.betAmount)}`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
