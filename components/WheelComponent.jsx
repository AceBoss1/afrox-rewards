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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel segments
    for (let i = 0; i < segments; i++) {
      // Start from top (pointer position)
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

      // Add prize text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(wheel.prizes[i].value, radius * 0.65, 0);
      ctx.restore();
    }

    // Outer gold border (coin edge)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Inner gold ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Multiplier text
    ctx.shadowColor = 'transparent';
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
    <div className="flex flex-col items-center justify-center relative" ref={containerRef}>
      {/* Pointer Arrow - Points DOWN - STAYS FIXED AT TOP */}
      <div className="relative z-10 mb-[-25px]">
        <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.5"/>
            </filter>
          </defs>
          {/* Triangle pointing DOWN */}
          <path 
            d="M 20 35 L 5 10 L 35 10 Z" 
            fill="#FFD700" 
            stroke="#000" 
            strokeWidth="2"
            filter="url(#shadow)"
          />
        </svg>
      </div>

      {/* Wheel Container - THIS ROTATES */}
      <div 
        className="relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning 
            ? 'transform 20s cubic-bezier(0.17, 0.67, 0.12, 0.99)' 
            : 'none',
          willChange: isSpinning ? 'transform' : 'auto',
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

      {/* Spinning particles */}
      {isSpinning && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
