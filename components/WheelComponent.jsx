// ============================================
// components/WheelComponent.jsx
// FIXED: Faster spin + correct prize landing
// ============================================

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
      {/* Pointer Arrow - Points DOWN - FIXED POSITION */}
      <div className="relative z-10 mb-[-20px]">
        <div 
          className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-yellow-400"
          style={{ 
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))',
          }}
        />
      </div>

      {/* Wheel Container - ROTATES */}
      <div 
        className="relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          // FIXED: Faster, smoother transition
          transition: isSpinning 
            ? 'transform 20s cubic-bezier(0.17, 0.67, 0.12, 0.99)' 
            : 'none',
          willChange: 'transform',
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
