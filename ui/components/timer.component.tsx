import { useEffect, useMemo, useState } from 'react';
import { DefaultMantineColor, Progress } from '@mantine/core';
import { differenceInMilliseconds, formatDuration } from 'date-fns';

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

export type TimerProps = {
    timeLeftUTC: string;
    durationInMs: number;
    className: string;
};
export type TimerParams = {
    value: number;
    color: DefaultMantineColor;
    label: string;
};

const getColorIndex = (value: number) =>
    Math.floor(value * colorsGradations.length);

const getTimerParams = ({ timeLeftUTC, durationInMs }: TimerProps) => {
    const diffInMs = differenceInMilliseconds(
        new Date(),
        new Date(timeLeftUTC)
    );

    const milisecondsLeft =
        durationInMs > diffInMs ? durationInMs - diffInMs : 0;
    const rawValue = milisecondsLeft / durationInMs;
    const value = rawValue * 100;

    const color = colorsGradations[getColorIndex(rawValue)];
    const label = `${formatDuration({
        minutes: Math.round(milisecondsLeft / (1000 * 60)),
    })} left`;

    return { value, color, label };
};

export const Timer = (props: TimerProps) => {
    const initialTimerParams = useMemo(() => getTimerParams(props), [props]);
    const [{ value, color, label }, setTimerParams] =
        useState<TimerParams>(initialTimerParams);

    useEffect(() => {
        const intervalId = setInterval(
            () => setTimerParams(getTimerParams(props)),
            3000
        );

        return () => clearInterval(intervalId);
    }, [setTimerParams, props]);

    return (
        <Progress
            className={props.className}
            color={color}
            label={label}
            value={value}
            radius="sm"
            size="xl"
            striped
            animate
        ></Progress>
    );
};
