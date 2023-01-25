import { i18nMessages } from './i18n.messages';

import { labelI18nKeys, locales, namespaces } from './i18n.enums';

import { namespacesMap } from './i18n.models';

export const translate = <T extends namespaces>(
    locale: locales,
    ns: T,
    i18nKey: namespacesMap[T]
) => i18nMessages[locale][ns][i18nKey];

export const labelTranslate = (locale: locales) => (i18Key: labelI18nKeys) =>
    translate(locale, namespaces.labels, i18Key);
