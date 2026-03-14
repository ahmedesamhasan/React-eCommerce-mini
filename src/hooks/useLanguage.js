import { useContext } from 'react';
import { LangContext } from '../context/langConfig';

function useLanguage() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LangProvider');
  }

  return context;
}

export default useLanguage;
