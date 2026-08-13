import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';

export const AchievementToast: React.FC = () => {
  const { toastQueue, removeToast } = useAppStore();

  useEffect(() => {
    if (toastQueue.length > 0) {
      const currentToast = toastQueue[0];
      const timer = setTimeout(() => {
        removeToast(currentToast.id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastQueue, removeToast]);

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toastQueue.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="bg-desk-window border-2 border-desk-border rounded-xl px-4 py-3 shadow-mac-shadow flex items-center gap-3 pointer-events-auto"
          >
            <div className="text-2xl">{toast.icon}</div>
            <div>
              <p className="font-heading font-bold text-sm text-desk-border">Achievement Unlocked!</p>
              <p className="text-xs text-desk-border/80 font-medium">{toast.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
