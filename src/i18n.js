import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// the translations
const resources = {
  eng: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
      resources,
      lng: 'ru',

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

export default i18n;
