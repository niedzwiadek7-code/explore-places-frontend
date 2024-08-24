import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import translationEn from './locales/en-US/translation.json'
import translationPl from './locales/pl-PL/translation.json'

const resources = {
  en: {
    translation: translationEn,
  },
  pl: {
    translation: translationPl,
  },
}

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language')

  if (!savedLanguage) {
    savedLanguage = Localization.locale
    await AsyncStorage.setItem('language', savedLanguage)
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
