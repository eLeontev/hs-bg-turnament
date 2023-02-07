import { createStyles, CSSObject, MantineTheme } from '@mantine/core';

const textStyles = (theme: MantineTheme, countOf: number): CSSObject => ({
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    color: theme.colors.gray[0],
    fontWeight: 700,
    fontSize: countOf > 999 ? 15 : 20,
    textShadow: `0 0 2px ${theme.colors.dark[9]}`,
});

export const useMinionHitpointsStyles = createStyles<string, number>(
    (theme: MantineTheme, countOfHitpoints: number) => ({
        countOfHitpointsContainer: {
            position: 'absolute',
            width: 50,
            height: 50,
            left: 149,
            top: 230,
            stroke: theme.colors.dark[9],
            strokeWidth: 4,
            paintOrder: 'stroke',
        },
        countOfHitpoints: {
            top: '57%',
            left: '50%',
            ...textStyles(theme, countOfHitpoints),
        },
    })
);

export const useMinionAttackPowerStyles = createStyles<string, number>(
    (theme: MantineTheme, attackPower: number) => ({
        attackPowerContainer: {
            position: 'absolute',
            width: 55,
            height: 55,
            left: 5,
            top: 227,
        },
        attackPower: {
            top: '57%',
            left: '57%',
            ...textStyles(theme, attackPower),
        },
    })
);
