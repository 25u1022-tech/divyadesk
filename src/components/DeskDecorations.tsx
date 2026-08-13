import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { Leaf, Code2, Pen, Book, Coffee, Star, Eraser } from 'lucide-react';

export const DeskDecorations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { toggleTheme, addToast, addDiscovery, discoveries, setDrawingMode, setEraserMode, isDrawingMode, isEraserMode } = useAppStore();
  const [plantClicks, setPlantClicks] = useState(0);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, mouseX, mouseY]);

  // Movement transforms based on depth
  const moveFarX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const moveFarY = useTransform(smoothY, [-1, 1], [-15, 15]);

  const moveMidX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const moveMidY = useTransform(smoothY, [-1, 1], [-25, 25]);

  const moveCloseX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const moveCloseY = useTransform(smoothY, [-1, 1], [-40, 40]);

  // Event handlers
  const handleCoffeeClick = () => {
    toggleTheme();
    if (!discoveries.has('coffee')) {
      addToast('Coffee break! Theme toggled.', '☕');
      addDiscovery('coffee');
    }
  };

  const handlePlantClick = () => {
    const newCount = plantClicks + 1;
    setPlantClicks(newCount);
    if (newCount === 3 && !discoveries.has('plant')) {
      addToast('Green thumb! The plant grew a flower.', '🌱');
      addDiscovery('plant');
    }
  };

  const handleCodeClick = () => {
    if (!discoveries.has('code')) {
      addToast('Why do programmers prefer dark mode? Because light attracts bugs!', '💻');
      addDiscovery('code');
    }
  };

  const handlePencilClick = () => {
    if (isDrawingMode && !isEraserMode) {
      setDrawingMode(false);
    } else {
      setDrawingMode(true);
      setEraserMode(false);
      if (!discoveries.has('pencil')) {
        addToast('Artist at heart! Drawing mode enabled.', '✏️');
        addDiscovery('pencil');
      }
    }
  };

  const handleEraserClick = () => {
    if (isDrawingMode && isEraserMode) {
      setDrawingMode(false);
    } else {
      setDrawingMode(true);
      setEraserMode(true);
      if (!discoveries.has('eraser')) {
        addToast('Made a mistake? Eraser enabled.', '🧽');
        addDiscovery('eraser');
      }
    }
  };


  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      
      {/* Plant (Top Left, Far Depth) */}
      <motion.div 
        className="absolute top-4 left-4 md:top-12 md:left-12 cursor-pointer pointer-events-auto scale-75 md:scale-100 origin-top-left"
        style={{ x: moveFarX, y: moveFarY }}
        onClick={handlePlantClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <motion.div 
            className="w-16 h-20 bg-desk-accent-green border-2 border-desk-border rounded-t-full rounded-bl-full shadow-[4px_4px_0_0_var(--desk-border)] flex items-center justify-center origin-bottom"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Leaf className="w-8 h-8 text-desk-border" strokeWidth={1.5} />
          </motion.div>
          <div className="w-10 h-10 bg-orange-200 border-2 border-desk-border rounded-b-xl absolute -bottom-8 left-3 shadow-[4px_4px_0_0_var(--desk-border)]" />
          
          {plantClicks >= 3 && (
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} 
              className="absolute -top-4 -right-2 text-2xl"
            >
              🌸
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Coffee Mug (Top Right, Mid Depth) */}
      <motion.div 
        className="absolute top-8 right-8 md:top-20 md:right-32 cursor-pointer pointer-events-auto scale-75 md:scale-100 origin-top-right"
        style={{ x: moveMidX, y: moveMidY }}
        onClick={handleCoffeeClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Steam */}
          <motion.div 
            className="absolute -top-6 left-2 flex gap-1"
            animate={{ y: [-2, -8], opacity: [0.2, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-6 bg-desk-border rounded-full opacity-30 blur-[1px] rotate-[10deg]" />
            <div className="w-1.5 h-8 bg-desk-border rounded-full opacity-30 blur-[1px] mt-1 -rotate-[5deg]" />
          </motion.div>
          
          {/* Mug */}
          <div className="w-14 h-16 bg-white border-2 border-desk-border rounded-xl shadow-[4px_4px_0_0_var(--desk-border)] flex items-center justify-center relative z-10">
            <Coffee className="w-6 h-6 text-desk-border" strokeWidth={2} />
          </div>
          {/* Handle */}
          <div className="w-6 h-10 border-2 border-desk-border rounded-r-xl absolute top-3 -right-5 z-0" />
        </div>
      </motion.div>

      {/* Notebook (Bottom Left, Close Depth) */}
      <motion.div 
        className="absolute bottom-40 left-4 md:bottom-32 md:left-32 cursor-pointer pointer-events-auto scale-75 md:scale-100 origin-bottom-left"
        style={{ x: moveCloseX, y: moveCloseY }}
        whileHover={{ scale: 1.05, rotate: -5 }}
      >
        <div className="w-32 h-40 bg-desk-accent-blue border-2 border-desk-border rounded-r-xl shadow-[4px_4px_0_0_var(--desk-border)] -rotate-[10deg] flex relative">
          <div className="w-4 h-full border-r-2 border-desk-border/20 flex flex-col justify-evenly py-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-1 bg-desk-border" />
            ))}
          </div>
          <div className="flex-1 p-3">
             <div className="w-full h-4 bg-white/50 border border-desk-border rounded-sm mb-2" />
             <div className="w-3/4 h-2 bg-white/40 rounded-sm mb-1" />
             <div className="w-1/2 h-2 bg-white/40 rounded-sm" />
             <Book className="absolute bottom-3 right-3 w-6 h-6 text-desk-border/50" />
          </div>
        </div>
      </motion.div>

      {/* Code Brackets (Right Edge, Far Depth) */}
      <motion.div 
        className="absolute top-1/3 right-4 md:top-1/2 md:right-16 cursor-pointer pointer-events-auto scale-75 md:scale-100 origin-right"
        style={{ x: moveFarX, y: moveFarY }}
        onClick={handleCodeClick}
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <div className="w-16 h-16 bg-desk-accent-tan border-2 border-desk-border rounded-2xl shadow-[4px_4px_0_0_var(--desk-border)] flex items-center justify-center rotate-[15deg]">
          <Code2 className="w-8 h-8 text-desk-border" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Wandering Pencil (Bottom Right, Close Depth) */}
      <motion.div 
        className="absolute bottom-32 right-16 md:bottom-24 md:right-48 cursor-pointer pointer-events-auto scale-75 md:scale-100 origin-bottom-right"
        style={{ x: moveCloseX, y: moveCloseY }}
        onClick={handlePencilClick}
        whileHover={{ rotate: 15 }}
      >
        <div className="w-40 h-6 bg-yellow-400 border-2 border-desk-border shadow-[4px_4px_0_0_var(--desk-border)] rotate-[35deg] flex items-center justify-end relative hover:-translate-y-2 transition-transform">
          <div className="w-8 h-full bg-pink-300 border-l-2 border-desk-border" />
          <div className="w-6 h-6 border-2 border-desk-border bg-orange-200 rotate-45 absolute -left-3 rounded-sm z-[-1]" />
          <Pen className="absolute top-1/2 -translate-y-1/2 left-2 w-3 h-3 text-desk-border opacity-50" />
        </div>
      </motion.div>

      {/* Eraser (Bottom Right, Close Depth) */}
      <motion.div 
        className="absolute bottom-20 right-4 md:bottom-16 md:right-32 cursor-pointer pointer-events-auto scale-75 md:scale-100 origin-bottom-right"
        style={{ x: moveCloseX, y: moveCloseY }}
        onClick={handleEraserClick}
        whileHover={{ rotate: -5, scale: 1.05 }}
      >
        <div className="w-16 h-8 bg-pink-400 border-2 border-desk-border shadow-[4px_4px_0_0_var(--desk-border)] -rotate-[15deg] flex items-center justify-center relative hover:-translate-y-1 transition-transform rounded-sm">
          <Eraser className="w-4 h-4 text-desk-border opacity-60" />
        </div>
      </motion.div>

      {/* Floating Stars */}
      <motion.div 
        className="absolute top-1/3 left-1/4"
        style={{ x: moveMidX, y: moveMidY }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
      </motion.div>

    </div>
  );
};
