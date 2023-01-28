import { format, formatDistanceToNow } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { locales } from '../i18n/enums/i18n.enums';

export const UIdateFormat = 'MM/dd/yy H:m::s';
export const tenSecondInMs = 10000;

export const localesMap = {
    [locales.en]: enUS,
    [locales.ru]: ru,
};

export const formatToUI = (date: string) =>
    format(new Date(date), UIdateFormat);

export const formatUIDistance = (
    date: string,
    locale: locales,
    timePostfix: string
) =>
    `${formatDistanceToNow(new Date(date), {
        includeSeconds: true,
        locale: localesMap[locale],
    })} ${timePostfix}`;
