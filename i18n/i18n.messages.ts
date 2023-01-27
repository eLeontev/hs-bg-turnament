import { enHeroMessages } from './en/i18n.heroes';
import { ruHeroMessages } from './ru/i18n.heroes';

import { enLabelMessages } from './en/i18n.labels';
import { ruLabelMessages } from './ru/i18n.labels';

import { enMinionMessages } from './en/i18n.minions';
import { ruMinionMessages } from './ru/i18n.minions';

import { locales, namespaces } from './enums/i18n.enums';

import { I18nMessages } from './i18n.models';

export const i18nMessages: I18nMessages = {
    [locales.en]: {
        [namespaces.labels]: enLabelMessages,
        [namespaces.heroes]: enHeroMessages,
        [namespaces.minions]: enMinionMessages,
    },
    [locales.ru]: {
        [namespaces.labels]: ruLabelMessages,
        [namespaces.heroes]: ruHeroMessages,
        [namespaces.minions]: ruMinionMessages,
    },
};
