import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { deskItems } from '../data/portfolio';
import { ContentWindow } from './ContentWindow';
import { Dock } from './Dock';
import { PaintLayer } from './PaintLayer';
import { PaintToolbar } from './PaintToolbar';
import { DrawingLayer } from './DrawingLayer';
import { DeskDecorations } from './DeskDecorations';
import { AchievementToast } from './AchievementToast';

export const DeskScene: React.FC = () => {
  const { 
    activeWindow, setActiveWindow, 
    isPaintMode, setPaintMode 
  } = useAppStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpenWindow = (id: string) => {
    if (id === 'paint') {
      setPaintMode(!isPaintMode);
      return;
    }
    setActiveWindow(id);
  };

  const handleCloseWindow = () => setActiveWindow(null);

  const activeItem = deskItems.find(i => i.id === activeWindow) || null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-[#e4edf4] to-[#fceef2] font-sans box-border text-desk-border">
      
      {/* Header Info */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1 pointer-events-none">
        <h1 className="text-4xl font-heading font-bold tracking-tight text-desk-border">Divya Mandi</h1>
        <p className="text-xs uppercase tracking-widest font-semibold opacity-60">Creative Developer</p>
      </div>

      {/* Paint Mode Layer & Toolbar */}
      <DrawingLayer />
      <PaintLayer />

      {/* Interactive Desk Environment (Parallax SVG Props) */}
      <DeskDecorations />
      <PaintToolbar onClear={() => window.dispatchEvent(new Event('clear-paint'))} />

      {/* Dynamic Dot Grid Background */}
      <div className="fixed inset-0 pointer-events-none transition-colors duration-500" style={{
        backgroundImage: 'radial-gradient(var(--desk-border) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.15
      }} />

      {/* Center Home Grid (Alternative to the previous scattered hotspots) */}
      <div className="relative w-full h-full z-20 max-w-5xl mx-auto flex flex-col items-center justify-center p-6 sm:p-0 pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pointer-events-auto">
          {deskItems.filter(i => i.type === 'content').map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenWindow(item.id)}
                className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-3xl border-2 border-desk-border shadow-[4px_4px_0_0_var(--desk-border)] flex flex-col items-center justify-center gap-2 sm:gap-3 transition-colors ${item.color}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/50 rounded-2xl flex items-center justify-center border-2 border-desk-border backdrop-blur-sm shadow-[2px_2px_0_0_var(--desk-border)]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-desk-border" strokeWidth={2.5} />
                </div>
                <span className="font-heading font-bold text-[10px] sm:text-sm tracking-widest uppercase text-desk-border text-center">
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Dock (Fallback/Quick Nav) */}
      <Dock 
        items={deskItems}
        onOpenItem={handleOpenWindow}
        activeItemId={activeWindow}
      />

      {/* Active Content Window overlay */}
      <ContentWindow 
        item={activeItem}
        onClose={handleCloseWindow}
      />

      {/* Achievement System Toasts */}
      <AchievementToast />
      
    </div>
  );
};
