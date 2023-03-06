import { createStyles, CSSObject, MantineTheme } from '@mantine/core';

export const textStyles = (
    theme: MantineTheme,
    countOf: number
): CSSObject => ({
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    color: theme.colors.gray[0],
    fontWeight: 700,
    fontSize: countOf > 999 ? 15 : 20,
    fontFamily: 'Caveat Brush, cursive',
    textShadow: `rgb(0 0 0) 2px 0px 0px, rgb(0 0 0) 1.75517px 0.95885px 0px, rgb(0 0 0) 1.0806px 1.68294px 0px, rgb(0 0 0) 0.14147px 1.99499px 0px, rgb(0 0 0) -0.83229px 1.81859px 0px, rgb(0 0 0) -1.60229px 1.19694px 0px, rgb(0 0 0) -1.97998px 0.28224px 0px, rgb(0 0 0) -1.87291px -0.70157px 0px, rgb(0 0 0) -1.30729px -1.5136px 0px, rgb(0 0 0) -0.42159px -1.95506px 0px, rgb(0 0 0) 0.56732px -1.91785px 0px, rgb(0 0 0) 1.41734px -1.41108px 0px, rgb(0 0 0) 1.92034px -0.55883px 0px`,
});

export type MinionHitPointsStyleProps = {
    countOfHitPoints: number;
    isSummoned: boolean;
};
export const useMinionHitPointsStyles = createStyles<
    string,
    MinionHitPointsStyleProps
>(
    (
        theme: MantineTheme,
        { countOfHitPoints, isSummoned }: MinionHitPointsStyleProps
    ) => ({
        countOfHitPointsContainer: {
            position: 'absolute',
            width: 55,
            height: 58,
            left: isSummoned ? 148 : 148,
            top: isSummoned ? 222 : 225,
            stroke: theme.colors.dark[9],
            strokeWidth: 4,
            paintOrder: 'stroke',
        },
        countOfHitPoints: {
            top: '60%',
            left: '50%',
            ...textStyles(theme, countOfHitPoints),
        },
    })
);

export type MinionAttackPowerStyleProps = {
    attackPower: number;
    isSummoned: boolean;
};
export const useMinionAttackPowerStyles = createStyles<
    string,
    MinionAttackPowerStyleProps
>(
    (
        theme: MantineTheme,
        { attackPower, isSummoned }: MinionAttackPowerStyleProps
    ) => ({
        attackPowerContainer: {
            position: 'absolute',
            width: isSummoned ? 60 : 55,
            height: isSummoned ? 60 : 55,
            left: isSummoned ? 20 : 5,
            top: isSummoned ? 219 : 227,
        },
        attackPower: {
            top: '60%',
            left: '57%',
            ...textStyles(theme, attackPower),
        },
    })
);
