import { labelI18nKeys } from './enums/i18n.label.enums';
import { locales } from './enums/i18n.enums';

export const i18nLocales = {
    [locales.en]: labelI18nKeys.en,
    [locales.ru]: labelI18nKeys.ru,
};
export const localesArray = Object.values(locales) as Array<locales>;
