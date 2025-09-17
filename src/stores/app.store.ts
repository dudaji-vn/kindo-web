import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { restoredState } from './restore';

export type ThemeSetting = 'system' | 'light' | 'dark';
export type Theme = Exclude<ThemeSetting, 'system'>;

export type AppState = {
  language: string;
  theme?: Theme;
};

export type AppActions = {
  setLanguage: (language: string) => void;
  setTheme: (theme: Theme) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      language: undefined,
      theme: undefined,
      setLanguage: (language) => set(() => ({ language })),
      setTheme: (theme) => set(() => ({ theme })),
      ...restoredState('app-store'),
    }),
    { name: 'app-store' },
  ),
);
