import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  activeSection: string;
  sidebarOpen: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setActiveSection: (section: string) => void;
  toggleSidebar: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      activeSection: 'dashboard',
      sidebarOpen: true,
      setUser: (user) => set({ user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setActiveSection: (section) => set({ activeSection: section }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'app-store',
    }
  )
);
