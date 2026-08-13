import React, { useRef, useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const DrawingLayer: React.FC = () => {
  const { isDrawingMode, isEraserMode } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas resolution
    const resizeCanvas = () => {
      // Save content
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx && canvas.width > 0 && canvas.height > 0) {
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        // Restore content
        if (tempCanvas.width > 0) {
           context.drawImage(tempCanvas, 0, 0);
        }
        setCtx(context);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const handleClear = () => {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('clear-drawing', handleClear);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('clear-drawing', handleClear);
    };
  }, []);

  const getCoordinates = (e: React.PointerEvent) => {
    return { x: e.clientX, y: e.clientY };
  };

  const startDrawing = (e: React.PointerEvent) => {
    if (!isDrawingMode || !ctx) return;
    // Don't draw if clicking on a hotspot
    if ((e.target as HTMLElement).closest('button, .pointer-events-auto') && (e.target as HTMLElement).tagName !== 'CANVAS') {
       return;
    }

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    
    // Configure stroke based on mode
    if (isEraserMode) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 40; // thick eraser
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 4;
      // Fetch dynamic color based on body theme to contrast the bg, or just use a dark/light color.
      ctx.strokeStyle = document.body.classList.contains('dark-mode') ? '#e8e8e8' : '#2D2D2D';
    }
  };

  const draw = (e: React.PointerEvent) => {
    if (!isDrawing || !ctx) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (ctx && isDrawing) {
      ctx.closePath();
    }
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={startDrawing}
      onPointerMove={draw}
      onPointerUp={stopDrawing}
      onPointerOut={stopDrawing}
      className={`fixed inset-0 z-10 touch-none ${
        isDrawingMode 
          ? isEraserMode 
            ? 'cursor-eraser pointer-events-auto' 
            : 'cursor-pencil pointer-events-auto' 
          : 'pointer-events-none'
      }`}
    />
  );
};
