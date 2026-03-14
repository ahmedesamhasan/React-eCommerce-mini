import { useEffect, useMemo, useState } from 'react';
import { LangContext, translations } from './langConfig';

const defaultLanguage = localStorage.getItem('language') || 'en';

function LangProvider({ children }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      t: translations[language],
    }),
    [language],
  );

  return (
    <LangContext.Provider value={value}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>{children}</div>
    </LangContext.Provider>
  );
}

export { LangProvider };
