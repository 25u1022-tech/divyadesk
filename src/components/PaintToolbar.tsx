import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { Trash2, X, Brush, GripHorizontal } from 'lucide-react';

const COLORS = [
  '#FF6B6B', // Coral
  '#4ECDC4', // Mint
  '#A78BFA', // Lavender
  '#F59E0B', // Honey
  '#FDE2E4', // Pink
  '#b8d4e3', // Blue
  '#2D2D2D', // Black/Dark
  '#ffffff', // Eraser/White
];

interface PaintToolbarProps {
  onClear: () => void;
}

export const PaintToolbar: React.FC<PaintToolbarProps> = ({ onClear }) => {
  const { isPaintMode, setPaintMode, paintColor, setPaintColor } = useAppStore();
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 z-40 pointer-events-none" />
      <AnimatePresence>
        {isPaintMode && (
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed top-24 left-6 z-50 bg-desk-window border-2 border-desk-border p-3 rounded-2xl shadow-mac-shadow flex flex-col gap-4 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center justify-between border-b-2 border-desk-border/20 pb-2">
              <div className="flex items-center gap-2">
                <Brush className="w-5 h-5 text-desk-border" />
                <span className="font-heading font-bold text-sm tracking-widest uppercase">Paint</span>
              </div>
              <GripHorizontal className="w-4 h-4 text-desk-border/40" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setPaintColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    paintColor === color ? 'border-desk-border scale-110 shadow-[2px_2px_0_0_var(--desk-border)]' : 'border-desk-border/20'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>

            <div className="flex gap-2 pt-2 border-t-2 border-desk-border/20">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onClear}
                className="flex-1 flex justify-center items-center p-2 bg-desk-accent-tan border-2 border-desk-border rounded-lg hover:-translate-y-1 shadow-[2px_2px_0_0_var(--desk-border)] transition-all"
                title="Clear Canvas"
              >
                <Trash2 className="w-4 h-4 text-desk-border" />
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setPaintMode(false)}
                className="flex-1 flex justify-center items-center p-2 bg-desk-accent-pink border-2 border-desk-border rounded-lg hover:-translate-y-1 shadow-[2px_2px_0_0_var(--desk-border)] transition-all"
                title="Exit Paint Mode"
              >
                <X className="w-4 h-4 text-desk-border" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
