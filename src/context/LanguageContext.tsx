'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'en' | 'am';

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Read persisted language on mount
  useEffect(() => {
    const stored = localStorage.getItem('metro_lang') as Lang | null;
    if (stored === 'en' || stored === 'am') {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('metro_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextProps {
  return useContext(LanguageContext);
}
