import { namespaces, locales } from './enums/i18n.enums';
import { heroI18nKeys } from './enums/i18n.hero.enums';
import { labelI18nKeys } from './enums/i18n.label.enums';
import { minionI18nKeys } from './enums/i18n.minion.enums';
import { errorMessageI18nKeys } from './enums/i18n.error-message.enums';

export type namespacesMap = {
    [namespaces.labels]: labelI18nKeys;
    [namespaces.heroes]: heroI18nKeys;
    [namespaces.minions]: minionI18nKeys;
    [namespaces.errorMessages]: errorMessageI18nKeys;
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
