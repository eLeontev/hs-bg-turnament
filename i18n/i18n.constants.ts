import { labelI18nKeys } from './enums/i18n.label.enums';
import { locales } from './enums/i18n.enums';
import { minionTypes } from '@prisma/client';
import { minionI18nKeys } from './enums/i18n.minion.enums';

export const i18nLocales = {
    [locales.en]: labelI18nKeys.en,
    [locales.ru]: labelI18nKeys.ru,
};
export const localesArray = Object.values(locales) as Array<locales>;

export const minionTypesI18nKeys = {
    [minionTypes.all]: minionI18nKeys.minionTypeAll,
    [minionTypes.beast]: minionI18nKeys.minionTypeBeasts,
    [minionTypes.noType]: minionI18nKeys.minionTypeNoType,
};
