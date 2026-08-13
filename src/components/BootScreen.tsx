import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';

export const BootScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const { setBooted } = useAppStore();

  useEffect(() => {
    const bootSequence = async () => {
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      const addLog = (msg: string) => setLogs(prev => [...prev, msg]);
      
      await wait(500);
      addLog('> Initializing paintbrush... ✓');
      setProgress(20);
      
      await wait(600);
      addLog('> Loading projects... ✓');
      setProgress(50);
      
      await wait(700);
      addLog('> Brewing coffee... ☕');
      setProgress(85);
      
      await wait(600);
      addLog('> Starting DIVYA_MANDI_OS V3.0... ✓');
      setProgress(100);
      
      await wait(800);
      setBooted(true);
    };
    
    bootSequence();
  }, [setBooted]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black text-green-400 font-mono flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-md p-6 border-2 border-green-500/30 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center animate-pulse">
          🎨 DIVYA_MANDI_OS V3.0
        </h1>
        
        <div className="mb-4">
          <div className="h-4 w-full bg-gray-900 border border-green-500/50 rounded overflow-hidden">
            <motion.div 
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="text-right text-xs mt-1">{progress}%</div>
        </div>
        
        <div className="space-y-2 text-sm h-32">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="opacity-90"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
