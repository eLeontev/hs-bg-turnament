import { useEffect } from 'react';

import { labelTranslate, heroTranslate } from './i18n.service';

import { localeSelector, setLocaleSelector, useI18nStore } from './i18n.store';

import { locales } from './enums/i18n.enums';

import { getI18nLocale, setI18nLocale } from '../utils.ts/storage.utils';

export const useInitLocale = () => {
    const setLocale = useI18nStore(setLocaleSelector);
    useEffect(() => {
        const locale = getI18nLocale() || locales.en;

        setLocale(getI18nLocale() || locales.en);
        setI18nLocale(locale);
    }, [setLocale]);
};

export const useLocale = () => {
    const setLocaleToStore = useI18nStore(setLocaleSelector);
    const selectedLocale = useI18nStore(localeSelector);

    const setLocale = (locale: locales) => {
        setLocaleToStore(locale);
        setI18nLocale(locale);
    };

    return { setLocale, selectedLocale };
};

export const useI18nLabelTranslate = () => {
    const locale = useI18nStore(localeSelector);
    return labelTranslate(locale);
};

export const useI18nHeroTranslate = () => {
    const locale = useI18nStore(localeSelector);
    return heroTranslate(locale);
};
