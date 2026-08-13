import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import type { HotspotItem } from '../types';

interface DockProps {
  items: HotspotItem[];
  onOpenItem: (id: string) => void;
  activeItemId: string | null;
}

export const Dock: React.FC<DockProps> = ({ items, onOpenItem, activeItemId }) => {
  const { isPaintMode } = useAppStore();
  const dockItems = items.filter(item => item.type === 'content' || item.id === 'paint');

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-40 bg-desk-window/90 border-2 border-desk-border p-3 rounded-2xl shadow-mac-shadow backdrop-blur-sm pointer-events-auto">
      {dockItems.map(item => {
        const Icon = item.icon;
        const isActive = activeItemId === item.id || (item.id === 'paint' && isPaintMode);
        
        return (
          <div key={`dock-${item.id}`} className="group flex flex-col items-center gap-1 cursor-pointer" onClick={() => onOpenItem(item.id)}>
            <motion.div
              className={`w-12 h-12 ${item.color} rounded-xl border-2 border-desk-border flex items-center justify-center transition-transform group-hover:-translate-y-2`}
              whileTap={{ scale: 0.95 }}
              layoutId={`dock-icon-${item.id}`}
            >
              <Icon className="w-6 h-6 text-desk-border" />
            </motion.div>
            <span className="text-[9px] font-bold uppercase tracking-tighter text-desk-border">
              {item.title}
            </span>
            {isActive && (
              <motion.div layoutId="dock-indicator" className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-desk-border" />
            )}
          </div>
        );
      })}
    </div>
  );
};
