import { useState, useEffect } from 'react';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { localeSelector, useI18nStore } from '../../../i18n/i18n.store';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { formatUIDistance, tenSecondInMs } from '../../../utils.ts/date.utils';

export const useFormatDistance = (date: string) => {
    const t = useI18nLabelTranslate();
    const locale = useI18nStore(localeSelector);
    const localizedPostfix = t(labelI18nKeys.pendingGameTimeAgoPostfix);

    const [dateDistance, setDistance] = useState(
        formatUIDistance(date, locale, localizedPostfix)
    );

    useEffect(() => {
        const timer = setInterval(
            () => setDistance(formatUIDistance(date, locale, localizedPostfix)),
            tenSecondInMs
        );

        return () => clearInterval(timer);
    }, [dateDistance, setDistance, date, locale, localizedPostfix]);

    return dateDistance;
};
