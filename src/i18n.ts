import {createI18n} from 'vue-i18n'
import {Preferences} from "@capacitor/preferences";
import ru from './locales/ru.json'
import en from './locales/en.json'

const fallbackLocale = 'ru'

const messages = {
    en: en,
    ru: ru,
};

// Получаем значение локали из Preferences
// const {value} = await Preferences.get({key: 'i18n-locale'});
// const locale = value || fallbackLocale; // Подставляем локаль по умолчанию, если она не установлена

// Создаем и возвращаем экземпляр i18n
const instance = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale,
    messages
})

export default instance;

export const i18n = instance.global;
