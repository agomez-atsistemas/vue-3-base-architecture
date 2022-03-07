import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupI18n } from './i18n';
import es from './locales/es.json';
import en from './locales/en.json';
import store from './store';

const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
});
const router = setupRouter(i18n);

createApp(App).use(store).use(i18n).use(router).mount('#app');
