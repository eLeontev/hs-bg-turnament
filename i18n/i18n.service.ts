import { i18nMessages } from './i18n.messages';

import { locales, namespaces } from './enums/i18n.enums';
import { labelI18nKeys } from './enums/i18n.label.enums';
import { heroI18nKeys } from './enums/i18n.hero.enums';
import { minionI18nKeys } from './enums/i18n.minion.enums';

import { namespacesMap } from './i18n.models';

export const translate = <T extends namespaces>(
    locale: locales,
    ns: T,
    i18nKey: namespacesMap[T]
) => i18nMessages[locale][ns][i18nKey];

export const labelTranslate = (locale: locales) => (i18Key: labelI18nKeys) =>
    translate(locale, namespaces.labels, i18Key);

export const heroTranslate = (locale: locales) => (i18Key: heroI18nKeys) =>
    translate(locale, namespaces.heroes, i18Key);

export const minionTranslate = (locale: locales) => (i18Key: minionI18nKeys) =>
    translate(locale, namespaces.minions, i18Key);
