import React, { useState, useEffect } from 'react';
import Translations from '../utils/translations';

const LanguageSelector = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('app_language') || 'hi'
  );
  const languages = Translations.getAvailableLanguages();

  useEffect(() => {
    if (selectedLanguage === 'all') {
      // Reset or show all content
      onLanguageChange('all');
      localStorage.removeItem('app_language');
    } else {
      Translations.setLanguage(selectedLanguage);
      onLanguageChange(selectedLanguage);
    }
  }, [selectedLanguage, onLanguageChange]);

  return (
    <select
      value={selectedLanguage}
      onChange={e => setSelectedLanguage(e.target.value)}
    >
      <option value="all">All Languages</option>
      {languages.map(lang => (
        <option key={lang} value={lang}>
          {Translations.getLanguageName(lang)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
