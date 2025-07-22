import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../../i18n';

type LanguageContextType = {
  locale: string;
  setLocale: (lang: 'fr' | 'en') => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'fr',
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState(i18n.locale);

  const setLocale = (lang: 'fr' | 'en') => {
    i18n.locale = lang;
    setLocaleState(lang);
  };

  useEffect(() => {
    i18n.locale = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
