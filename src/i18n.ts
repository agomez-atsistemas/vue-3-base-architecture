import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import type { I18n, I18nOptions, Locale, VueI18n, Composer } from 'vue-i18n';

export const SUPPORT_LOCALES = ['es', 'en'];

export function getLocale(i18n: I18n): string {
  return i18n.mode === 'legacy' ? (i18n.global as unknown as VueI18n).locale : (i18n.global as unknown as Composer).locale.value;
}

export function setLocale(i18n: I18n, locale: Locale): void {
  if (i18n.mode === 'legacy') {
    (i18n.global as unknown as VueI18n).locale = locale;
  } else {
    (i18n.global as unknown as Composer).locale.value = locale;
  }
}

export function setupI18n(options: I18nOptions = { locale: 'es' }): I18n {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale!);
  return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale);
  document.querySelector('html')!.setAttribute('lang', locale);
}

export async function loadLocaleMessages(i18n: I18n, locale: Locale): Promise<void> {
  // load locale messages with dynamic import
  const messages = await import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`);

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}
