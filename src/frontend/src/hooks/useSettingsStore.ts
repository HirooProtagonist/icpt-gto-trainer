import type { Language } from "@/lib/i18n";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppSettings {
  language: Language;
  animationSpeed: 1 | 2 | 3;
  soundEffects: boolean;
  showHints: boolean;
  evDisplay: boolean;
  evDetailLevel: "LOW" | "HIGH";
}

interface SettingsStore extends AppSettings {
  setLanguage: (lang: Language) => void;
  setAnimationSpeed: (speed: 1 | 2 | 3) => void;
  setSoundEffects: (val: boolean) => void;
  setShowHints: (val: boolean) => void;
  setEvDisplay: (val: boolean) => void;
  setEvDetailLevel: (val: "LOW" | "HIGH") => void;
  resetAll: () => void;
}

const defaults: AppSettings = {
  language: "ru",
  animationSpeed: 1,
  soundEffects: true,
  showHints: true,
  evDisplay: true,
  evDetailLevel: "HIGH",
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaults,
      setLanguage: (language) => set({ language }),
      setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
      setSoundEffects: (soundEffects) => set({ soundEffects }),
      setShowHints: (showHints) => set({ showHints }),
      setEvDisplay: (evDisplay) => set({ evDisplay }),
      setEvDetailLevel: (evDetailLevel) => set({ evDetailLevel }),
      resetAll: () => set(defaults),
    }),
    { name: "icpt-settings" },
  ),
);
