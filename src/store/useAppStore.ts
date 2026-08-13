import { create } from 'zustand';

interface AppState {
  isBooted: boolean;
  setBooted: (val: boolean) => void;
  
  isDayMode: boolean;
  toggleTheme: () => void;
  
  activeWindow: string | null;
  setActiveWindow: (id: string | null) => void;
  
  isPaintMode: boolean;
  setPaintMode: (val: boolean) => void;
  paintColor: string;
  setPaintColor: (color: string) => void;
  
  isDrawingMode: boolean;
  setDrawingMode: (val: boolean) => void;
  isEraserMode: boolean;
  setEraserMode: (val: boolean) => void;
  
  discoveries: Set<string>;
  addDiscovery: (id: string) => void;
  
  toastQueue: { id: string; message: string; icon: string }[];
  addToast: (message: string, icon: string) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),
  
  isDayMode: true,
  toggleTheme: () => set((state) => ({ isDayMode: !state.isDayMode })),
  
  activeWindow: null,
  setActiveWindow: (id) => set({ activeWindow: id }),
  
  isPaintMode: false,
  setPaintMode: (val) => set((state) => ({ 
    isPaintMode: val,
    ...(val ? { isDrawingMode: false, isEraserMode: false } : {})
  })),
  paintColor: '#FF6B6B',
  setPaintColor: (color) => set({ paintColor: color }),

  isDrawingMode: false,
  setDrawingMode: (val) => set((state) => ({ 
    isDrawingMode: val,
    ...(val ? { isPaintMode: false } : {})
  })),
  isEraserMode: false,
  setEraserMode: (val) => set((state) => ({ 
    isEraserMode: val,
    ...(val ? { isPaintMode: false } : {})
  })),
  
  discoveries: new Set(),
  addDiscovery: (id) => set((state) => {
    const newDiscoveries = new Set(state.discoveries);
    if (!newDiscoveries.has(id)) {
      newDiscoveries.add(id);
      return { discoveries: newDiscoveries };
    }
    return state;
  }),
  
  toastQueue: [],
  addToast: (message, icon) => set((state) => ({
    toastQueue: [...state.toastQueue, { id: Math.random().toString(36).substring(7), message, icon }]
  })),
  removeToast: (id) => set((state) => ({
    toastQueue: state.toastQueue.filter((t) => t.id !== id)
  })),
}));
