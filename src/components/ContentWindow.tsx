import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';
import type { HotspotItem } from '../types';

interface ContentWindowProps {
  item: HotspotItem | null;
  onClose: () => void;
}

export const ContentWindow: React.FC<ContentWindowProps> = ({ item, onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-desk-border/20 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
          
          {/* Window */}
            <motion.div
              ref={windowRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full flex flex-col bg-desk-window pointer-events-auto overflow-hidden ${
                item.id === 'projects' 
                  ? 'max-w-[1200px] max-h-[90vh] border-[6px] border-desk-border rounded-[2rem] shadow-[8px_8px_0px_0px_var(--desk-border)] bg-transparent' 
                  : 'max-w-3xl max-h-[85vh] border-[2.5px] border-desk-border rounded-xl shadow-[12px_12px_0px_0px_var(--desk-border)]'
              }`}
              style={item.id === 'projects' ? { backgroundImage: 'linear-gradient(120deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)' } : {}}
              role="dialog"
              aria-labelledby="dialog-title"
              aria-modal="true"
            >
              {item.id === 'projects' && (
                <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{
                  backgroundImage: 'radial-gradient(var(--desk-border) 1.5px, transparent 1.5px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.15
                }} />
              )}
              
              {/* Title Bar */}
              <div className={`border-b-2 border-desk-border flex items-center justify-between px-4 select-none relative z-10 shrink-0 ${
                item.id === 'projects' 
                  ? 'h-10 border-b-[6px] bg-desk-window/80 backdrop-blur-md' 
                  : 'h-12 bg-[var(--window-header)]'
              }`}>
                {/* Traffic Lights */}
                <div className="flex gap-2">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] border-2 border-desk-border hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-desk-border" aria-label="Close" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border-2 border-desk-border" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840] border-2 border-desk-border" />
                </div>
                
                {/* Title */}
                {item.id === 'projects' ? (
                  <span id="dialog-title" className="text-[10px] font-bold font-heading tracking-widest uppercase opacity-50 mr-2 text-desk-border">
                    DIVYA_MANDI_OS V2.0
                  </span>
                ) : (
                  <h2 id="dialog-title" className="text-sm font-bold uppercase tracking-widest text-desk-border absolute left-1/2 -translate-x-1/2">
                    {item.id}.exe
                  </h2>
                )}
                
                {/* Right Controls */}
                {item.id !== 'projects' && (
                  <div className="w-16 flex justify-end text-desk-border/60 gap-3">
                    {/* Empty to balance traffic lights, or add icons if desired */}
                  </div>
                )}
              </div>
              
              {/* Content Area */}
              <div className={`overflow-y-auto relative z-10 flex-1 ${item.id === 'projects' ? 'p-8 md:p-12' : 'p-6'}`}>
                {item.content}
              </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
