import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from 'locales/en.json';

i18next.use(initReactI18next).init(
  {
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      },
    },
    resources: {
      en: {translation: en},
    },
  },
  err => {
    if (err) console.log('I18Next error :', err);
  }
);

export default i18next;
