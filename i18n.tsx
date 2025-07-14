import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import fr from './app/locales/fr';
import en from './app/locales/en';

// Fix for MissingTranslation import
i18n.missingTranslation = function (scope) {
  return scope;
};

i18n.translations = {
  fr,
  en,
};

i18n.fallbacks = true;
const locale = Localization?.locale?.split('-')[0] || 'fr';
i18n.locale = locale;


export default i18n;
