import i18n from 'i18n-js'
import en from './en.json'
import fr from './fr.json'
import de from './de.json'

function uniq(arr: string[]) {
  return arr.filter((el, index, self) => self.indexOf(el) === index);
}

function normalizeLocales(arr: string[]) {
  return arr.map((el) => {
    if (!el || el.indexOf('-') === -1 || el.toLowerCase() !== el) {
      return el;
    }

    const splitEl = el.split('-');
    return `${splitEl[0]}-${splitEl[1].toUpperCase()}`;
  });
}

function getUserLocales() {
  let languageList: string[] = [];

  if (typeof window !== 'undefined') {
    const { navigator } = window;

    if (navigator.languages) {
      languageList = languageList.concat(navigator.languages);
    }
    if (navigator.language) {
      languageList.push(navigator.language);
    }
    if ((navigator as any).userLanguage) {
      languageList.push((navigator as any).userLanguage);
    }
    if ((navigator as any).browserLanguage) {
      languageList.push((navigator as any).browserLanguage);
    }
    if ((navigator as any).systemLanguage) {
      languageList.push((navigator as any).systemLanguage);
    }
  }

  languageList.push('fr-FR'); // Fallback

  return normalizeLocales(uniq(languageList));
}

i18n.fallbacks = true
i18n.translations = { en, fr, de }

i18n.locale = getUserLocales()[0]

/**
 * Builds up valid keypaths for translations.
 */
type DefaultLocale = typeof fr
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]