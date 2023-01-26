import { useEffect, useMemo, useState } from 'react';
import {
    Container,
    DefaultMantineColor,
    MantineNumberSize,
    Progress,
    Text,
} from '@mantine/core';

import { differenceInMilliseconds, formatDuration } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { labelI18nKeys, locales } from '../../../i18n/i18n.enums';

import { useCommonStyles } from '../../../styles/common.styles';
import { localeSelector, useI18nStore } from '../../../i18n/i18n.store';
import { labelTranslate } from '../../../i18n/i18n.service';

const localesMap = {
    [locales.en]: enUS,
    [locales.ru]: ru,
};

const colorsGradations: Array<DefaultMantineColor> = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
];

export const timerSections = [
    { value: 15, color: 'red' },
    { value: 30, color: 'orange' },
    { value: 45, color: 'yellow' },
    { value: 60, color: 'lime' },
    { value: 75, color: 'green' },
    { value: 90, color: 'teal' },
];

export enum durationFormats {
    minutes = 'minutes',
    seconds = 'seconds',
}

export type TimerProps = {
    durationFormat: durationFormats;
    timeLeftUTC: string;
    durationInMs: number;
    className?: string;
    size?: MantineNumberSize;
    labelFontSize?: number;
};

export type TimerParams = {
    value: number;
    color: DefaultMantineColor;
    label: string;
};

const getColorIndex = (value: number) =>
    Math.floor(value * colorsGradations.length);

const getTimerParams = (
    { timeLeftUTC, durationInMs, durationFormat }: TimerProps,
    locale: locales
) => {
    const diffInMs = differenceInMilliseconds(
        new Date(),
        new Date(timeLeftUTC)
    );

    const milisecondsLeft =
        durationInMs > diffInMs ? durationInMs - diffInMs : 0;
    const rawValue = milisecondsLeft / durationInMs;
    const value = rawValue * 100;

    const color = colorsGradations[getColorIndex(rawValue)];
    const formatDevider =
        durationFormat === durationFormats.minutes ? 1000 * 60 : 1000;

    const label = formatDuration(
        {
            [durationFormat]: Math.round(milisecondsLeft / formatDevider),
        },
        { locale: localesMap[locale] }
    );

    return { value, color, label };
};

export const Timer = (props: TimerProps) => {
    const { classes } = useCommonStyles({ labelFontSize: props.labelFontSize });

    const locale = useI18nStore(localeSelector);
    const t = labelTranslate(locale);

    const initialTimerParams = useMemo(
        () => getTimerParams(props, locale),
        [props, locale]
    );
    const [{ value, color, label }, setTimerParams] =
        useState<TimerParams>(initialTimerParams);

    useEffect(() => {
        const intervalDurationInMs =
            props.durationFormat === durationFormats.minutes ? 3000 : 1000;
        const intervalId = setInterval(
            () => setTimerParams(getTimerParams(props, locale)),
            intervalDurationInMs
        );

        return () => clearInterval(intervalId);
    }, [setTimerParams, props, locale]);

    return (
        <Container fluid className={classes.timerContainer}>
            <Progress
                className={props.className}
                classNames={{ label: classes.timerLabel }}
                color={color}
                value={value}
                radius="sm"
                size={props.size || 'lg'}
                striped
                animate
            ></Progress>
            <Text className={classes.timerLabel}>
                {label || t(labelI18nKeys.timerPendingLabel)}
            </Text>
        </Container>
    );
};
