
import { Language, useAppSelection } from "@/store/appSlice";

// map of language string pairs
type TranslationMap = {
  [key: string]: {
    [lang in Language]?: string;
  };
};

const DEFAULT_LANGUAGE: Language = 'en';

export const useTranslation = () => {
  // get language from zustand
  const { language } = useAppSelection();

  /**
   * translation function for this hook
   * @param map translation map for a specific component.
   * @param key key of the string to translate.
   * @returns translated string.
   */
  const t = <T extends TranslationMap>(map: T, key: keyof T): string => {
    const translations = map[key];

    if (!translations) {
      console.warn(`Translation key "${String(key)}" not found.`);
      return String(key);
    }

    // i don't think the default language is reallly necessary because a defualt is used in zustant slice
    return translations[language] || translations[DEFAULT_LANGUAGE] || String(key);
  };

  return { t, currentLanguage: language };
};
