import React, { useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { DeskScene } from './components/DeskScene';
import { BootScreen } from './components/BootScreen';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { isBooted, isDayMode } = useAppStore();

  useEffect(() => {
    if (!isDayMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDayMode]);

  useEffect(() => {
    let timeout: number;

    const resetTimer = () => {
       clearTimeout(timeout);
       timeout = window.setTimeout(() => {
          const store = useAppStore.getState();
          if (store.isPaintMode) store.setPaintMode(false);
          if (store.isDrawingMode) store.setDrawingMode(false);
          if (store.isEraserMode) store.setEraserMode(false);
       }, 30000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer();

    return () => {
       clearTimeout(timeout);
       window.removeEventListener('mousemove', resetTimer);
       window.removeEventListener('mousedown', resetTimer);
       window.removeEventListener('touchstart', resetTimer);
       window.removeEventListener('keydown', resetTimer);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isBooted && <BootScreen key="boot" />}
      </AnimatePresence>
      <DeskScene />
    </>
  );
}

