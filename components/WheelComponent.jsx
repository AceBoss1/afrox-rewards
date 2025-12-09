'use client';

import { useRef, useEffect } from 'react';

export default function WheelComponent({ wheel, rotation, isSpinning }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

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

    // Draw segments
    for (let i = 0; i < segments; i++) {
      const startAngle = i * anglePerSegment - Math.PI / 2;
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

    // Draw outer border (gold coin edge)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Add inner gold ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw inner circle with multiplier
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw multiplier text
    ctx.fillStyle = '#EAB308';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${wheel.multiplier}x`, centerX, centerY - 5);
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('AfroX', centerX, centerY + 15);
  }, [wheel]);

  return (
    <div className="flex flex-col items-center justify-center" ref={containerRef}>
      {/* Pointer Arrow - Points DOWN */}
      <div className="relative z-10 mb-[-20px]">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-lg"
             style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))' }}>
        </div>
      </div>

      {/* Wheel Container - THIS ROTATES */}
      <div 
        className="relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 15s cubic-bezier(0.25, 0.1, 0.25, 1.0)' : 'none',
        }}
      >
        <canvas
          ref={canvasRef}
          width={450}
          height={450}
          style={{ 
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>

      {/* Animated particles in background */}
      {isSpinning && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
