import {
    namespaces,
    labelI18nKeys,
    heroI18nKeys,
    minionI18nKeys,
    locales,
} from './i18n.enums';

export type namespacesMap = {
    [namespaces.labels]: labelI18nKeys;
    [namespaces.heroes]: heroI18nKeys;
    [namespaces.minions]: minionI18nKeys;
};

export type NsTransProps<T extends namespaces> = { i18nKey: namespacesMap[T] };
export type TransProps<T extends namespaces> = NsTransProps<T> & { ns: T };

export type I18nTransMessages<N extends namespaces> = {
    [K in namespacesMap[N]]: string;
};
export type I18nNameSpaceMessages = {
    [N in namespaces]: I18nTransMessages<N>;
};
export type I18nMessages = {
    [L in locales]: I18nNameSpaceMessages;
};
