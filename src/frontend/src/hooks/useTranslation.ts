import { type Lang, type TranslationKey, translations } from "@/lib/i18n";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface I18nStore {
  language: Lang;
  setLanguage: (lang: Lang) => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: "ru",
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: "icpt-language" },
  ),
);

export type { Lang, TranslationKey };

export function useTranslation() {
  const { language, setLanguage } = useI18nStore();

  function t(key: TranslationKey): string {
    const val = (translations[language] as Record<string, string>)[key];
    return val ?? (translations.en as Record<string, string>)[key] ?? key;
  }

  return {
    t,
    language,
    setLanguage,
    // Backward-compat aliases
    lang: language,
    setLang: setLanguage,
  };
}
