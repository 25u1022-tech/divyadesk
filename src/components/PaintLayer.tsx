import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';

interface Splash {
  id: string;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  borderRadius: string;
}

export const PaintLayer: React.FC = () => {
  const { isPaintMode, paintColor, addToast, addDiscovery, discoveries } = useAppStore();
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const splashCountRef = useRef(0);

  useEffect(() => {
    const handleClear = () => setSplashes([]);
    window.addEventListener('clear-paint', handleClear);
    return () => window.removeEventListener('clear-paint', handleClear);
  }, []);

  const handlePointerDown = (e: React.MouseEvent) => {
    if (!isPaintMode) return;
    
    // Don't paint if clicking on a hotspot
    if ((e.target as HTMLElement).closest('button, .pointer-events-auto')) {
       return;
    }

    const br1 = 30 + Math.random() * 40;
    const br2 = 30 + Math.random() * 40;
    const br3 = 30 + Math.random() * 40;
    const br4 = 30 + Math.random() * 40;
    const borderRadius = `${br1}% ${100 - br1}% ${br2}% ${100 - br2}% / ${br3}% ${br4}% ${100 - br4}% ${100 - br3}%`;

    const newSplash: Splash = {
      id: Date.now().toString() + Math.random().toString(),
      x: e.clientX,
      y: e.clientY,
      color: paintColor,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1.5,
      borderRadius
    };

    splashCountRef.current += 1;
    if (splashCountRef.current % 10 === 0) {
      addToast(`Congratulations on ${splashCountRef.current} splashes!`, '🎉🎨');
    }

    setSplashes(prev => [...prev, newSplash]);
  };

  return (
    <div 
      className={`fixed inset-0 z-0 overflow-hidden ${isPaintMode ? 'cursor-brush' : 'cursor-default pointer-events-none'}`}
      onClick={handlePointerDown}
    >
      <AnimatePresence>
        {splashes.map(splash => (
          <motion.div
            key={splash.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: splash.scale, opacity: 0.7 }}
            transition={{ type: 'spring', damping: 15 }}
            className="absolute mix-blend-multiply pointer-events-none border-2 border-desk-border"
            style={{
              left: splash.x,
              top: splash.y,
              width: '80px',
              height: '80px',
              marginLeft: '-40px',
              marginTop: '-40px',
              backgroundColor: splash.color,
              rotate: `${splash.rotation}deg`,
              borderRadius: splash.borderRadius,
              boxShadow: '4px 4px 0 0 var(--desk-border)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
