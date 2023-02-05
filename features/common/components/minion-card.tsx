import { Box, createStyles, MantineTheme } from '@mantine/core';

import Image from 'next/image';

import { useI18nMinionTranslate } from '../../../i18n/i18n.hooks';

import { Minion } from '../../play-game/models/play-game.minion.models';
import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

const useMinionNameStyles = createStyles<string, string>(
    (theme: MantineTheme, name: string) => ({
        minionNameContainer: {
            position: 'absolute',
            width: 180,
            height: 30,
            left: 20,
            top: 150,
        },
        minionName: {
            fill: theme.colors.gray[0],
            font: `600 ${name.length > 19 ? 10 : 13}px ${theme.fontFamily}`,
            stroke: theme.colors.dark[9],
            strokeWidth: 2,
            paintOrder: 'stroke',
        },
    })
);
const useMinionCardStyles = createStyles<string>((theme: MantineTheme) => ({
    minionCard: {
        cursor: 'pointer',
        padding: 8,
        margin: 8,
        width: 232,
        borderRadius: 8,
        backdropFilter: 'blur(1px)',
    },
}));

export type MinionNameProps = { name: string };
export const MinionName = ({ name }: MinionNameProps) => {
    const { classes } = useMinionNameStyles(name);
    return (
        <svg viewBox="-3 3 180 30" className={classes.minionNameContainer}>
            <path
                filter="blur(1px)"
                fill="#977f60"
                d="M 8 26 C 8 26 10 20 8 14 C 37 18 47 7 101 4 C 131 4 134 4 155 14 C 153 18 152 22 152 28 C 131 19 122 20 116 20 C 96 20 84 21 68 24 C 30 34 17 34 7 30"
            />
            <path
                id="MyPath"
                fill="none"
                stroke="none"
                d="M 9 26 C 38 35 102 1 149 23"
            />
            <text>
                <textPath
                    className={classes.minionName}
                    startOffset="50%"
                    textAnchor="middle"
                    href="#MyPath"
                >
                    {name}
                </textPath>
            </text>
        </svg>
    );
};
export type MinionCardProps = {
    minion: Minion;
    tavernTier: tavernTiers;
};

export const MinionCard = ({ minion, tavernTier }: MinionCardProps) => {
    const { classes } = useMinionCardStyles();
    const t = useI18nMinionTranslate();
    return (
        <Box className={classes.minionCard}>
            <MinionName name={t(minion.name)}></MinionName>
            <Image
                priority
                width={200}
                height={276}
                src={minion.avatarSrc}
                alt={minion.name}
            ></Image>
        </Box>
    );
};
