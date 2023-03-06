import { formatDistanceToNow } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { locales } from '../i18n/enums/i18n.enums';

export const tenSecondInMs = 10000;

export const localesMap = {
    [locales.en]: enUS,
    [locales.ru]: ru,
};

export const dateInUtcString = () => new Date().toUTCString();

export const formatUIDistance = (
    date: string,
    locale: locales,
    timePostfix: string
) =>
    `${formatDistanceToNow(new Date(date), {
        includeSeconds: true,
        locale: localesMap[locale],
    })} ${timePostfix}`;

export const getDelayIMsFromNow = (
    dateInUtc: string,
    delayInMs: number
): number => Number(new Date(dateInUtc)) + delayInMs - Number(new Date());
