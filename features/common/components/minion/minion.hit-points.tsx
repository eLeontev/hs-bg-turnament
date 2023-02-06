import { createStyles, MantineTheme } from '@mantine/core';

const useMinionHitpointsStyles = createStyles<string, number>(
    (theme: MantineTheme, countOfHitpoints: number) => ({
        cuntOfHitpointsContainer: {
            position: 'absolute',
            width: 42,
            height: 60,
            left: 155,
            top: 230,
            stroke: theme.colors.dark[9],
            strokeWidth: 4,
            paintOrder: 'stroke',
        },
        cuntOfHitpoints: {
            position: 'absolute',
            fill: theme.colors.gray[0],
            font: `700 ${countOfHitpoints > 999 ? 16 : 24}px ${
                theme.fontFamily
            }`,
            stroke: theme.colors.dark[9],
            strokeWidth: 2,
            paintOrder: 'stroke',
        },
    })
);

export type MinionCountOfHitpointsProps = { countOfHitpoints: number };
export const MinionCountOfHitpoints = ({
    countOfHitpoints,
}: MinionCountOfHitpointsProps) => {
    const { classes } = useMinionHitpointsStyles(countOfHitpoints);

    return (
        <svg
            viewBox="-20 -10 45 60"
            className={classes.cuntOfHitpointsContainer}
        >
            <radialGradient id="radialGradientHitPoints">
                <stop offset="0%" stop-color="white" />
                <stop offset="100%" stop-color="red" />
            </radialGradient>
            <path
                filter="blur(1px)"
                fill="url(#radialGradientHitPoints)"
                d="m 1 -7 c 6 11 15 22 14 34 c -4 15 -26 17 -29 0 c -4 -9 10 -27 14 -34"
            />
            <text
                x="0"
                y="27"
                textAnchor="middle"
                className={classes.cuntOfHitpoints}
            >
                {countOfHitpoints}
            </text>
        </svg>
    );
};
