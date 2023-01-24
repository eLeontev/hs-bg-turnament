import { create } from 'zustand';

import { locales } from './i18n.enums';

export type I18nPropsState = {
    locale: locales;
};

export type I18nStoreApi = {
    setLocale: (locale: locales) => void;
};

export type I18nState = I18nPropsState & I18nStoreApi;

export const useI18nStore = create<I18nState>((set) => ({
    locale: locales.en,
    setLocale: (locale: locales) => set({ locale }),
}));

export const localeSelector = ({ locale }: I18nPropsState) => locale;
export const setLocaleSelector = ({ setLocale }: I18nStoreApi) => setLocale;
