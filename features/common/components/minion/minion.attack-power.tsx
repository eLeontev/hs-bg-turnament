import { createStyles, MantineTheme } from '@mantine/core';

const useMinionAttackPowerStyles = createStyles<string, number>(
    (theme: MantineTheme, attackPower: number) => ({
        attackPowerContainer: {
            position: 'absolute',
            width: 40,
            height: 40,
            left: 20,
            top: 240,
            stroke: theme.colors.dark[9],
            strokeWidth: 4,
            paintOrder: 'stroke',
        },
        attackPower: {
            position: 'absolute',
            fill: theme.colors.gray[0],
            font: `600 ${attackPower > 999 ? 15 : 20}px ${theme.fontFamily}`,
            stroke: theme.colors.dark[9],
            strokeWidth: 2,
            paintOrder: 'stroke',
        },
    })
);

export type MinionAttackPowerProps = { attackPower: number };
export const MinionAttackPower = ({ attackPower }: MinionAttackPowerProps) => {
    const { classes } = useMinionAttackPowerStyles(attackPower);

    return (
        <svg viewBox="12 0 40 40" className={classes.attackPowerContainer}>
            <radialGradient id="radialGradientAttackPower">
                <stop offset="0%" stop-color="white" />
                <stop offset="100%" stop-color="gold" />
            </radialGradient>
            <path
                filter="blur(1px)"
                fill="url(#radialGradientAttackPower)"
                d="M 22 4 C 32 3 36 3 42 10 C 45 14 47 21 42 29 L 37 29 L 34 35 C 26 36 20 35 15 28 C 14 28 10 17 15 10 L 22 10"
            />
            <text
                x="29"
                y="27"
                textAnchor="middle"
                className={classes.attackPower}
            >
                {attackPower}
            </text>
        </svg>
    );
};
