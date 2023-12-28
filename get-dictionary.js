import 'server-only'
import { cookies } from 'next/headers'
import { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}
export const getDictionary = async (locale) => {
  return (await dictionaries[locale]?.()) ?? (await dictionaries.en());
};
