import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/enTranslation.json';
import ruTranslation from './locales/ruTranslation.json';

// Ресурсы с переводами
const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },

};

// Инициализация i18next
i18n
  .use(LanguageDetector) // Автоматическое определение языка браузера
  .use(initReactI18next) // Инициализация react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Язык по умолчанию, если перевод не найден
    interpolation: {
      escapeValue: false, // Не экранировать HTML (если нужно)
    },
    detection: {
      order: ['localStorage', 'navigator'], // Сначала проверяем localStorage, затем язык браузера
      caches: ['localStorage'], // Сохраняем язык в localStorage
    },
  });

export default i18n;