import { Box, createStyles, MantineTheme } from '@mantine/core';

import Image from 'next/image';

import { useI18nMinionTranslate } from '../../../../i18n/i18n.hooks';

import { MinionCountOfHitpoints } from './minion.hit-points';
import { MinionName } from './minion.name';

import { Minion } from '../../../play-game/models/play-game.minion.models';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';
import { MinionAttackPower } from './minion.attack-power';
import { MinionTavernTier } from './minion.tavern-tier';
import { MinionDescription } from './minion.description';
import { minionTypes } from '@prisma/client';

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

export type MinionCardProps = {
    minion: Minion;
    tavernTier: tavernTiers;
    minionType: minionTypes;
};

export const MinionCard = ({
    minion,
    tavernTier,
    minionType,
}: MinionCardProps) => {
    const { classes } = useMinionCardStyles();
    const t = useI18nMinionTranslate();
    return (
        <Box className={classes.minionCard}>
            <MinionTavernTier tavernTier={tavernTier}></MinionTavernTier>
            <MinionName
                name={t(minion.name)}
                isTriple={minion.isTriple}
            ></MinionName>
            <MinionDescription
                minion={minion}
                minionType={minionType}
            ></MinionDescription>
            <MinionAttackPower
                attackPower={minion.attackPower}
            ></MinionAttackPower>
            <MinionCountOfHitpoints
                countOfHitpoints={minion.countOfHitPoints}
            ></MinionCountOfHitpoints>
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
