import { Box, createStyles, MantineTheme } from '@mantine/core';

import Image from 'next/image';

import { minionTypes } from '@prisma/client';

import { useI18nMinionTranslate } from '../../../../i18n/i18n.hooks';

import { MinionCountOfHitPoints } from './minion.hit-points';
import { MinionName } from './minion.name';
import { MinionAttackPower } from './minion.attack-power';
import { MinionTavernTier } from './minion.tavern-tier';
import { MinionDescription } from './minion.description';

import { Minion } from '../../../play-game/models/play-game.minion.models';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';
import { summonedMinionsSet } from '../../../../data/summoned-minions';
import { MinionAbilities } from './minion.abilities';

const useMinionCardStyles = createStyles<string, boolean>(
    (theme: MantineTheme, isTriple: boolean) => ({
        minionCard: {
            cursor: 'pointer',
            padding: 8,
            margin: 8,
            width: 232,
            borderRadius: 8,
            backdropFilter: 'blur(1px)',
        },
        tripleOverride: {
            position: 'relative',
            left: isTriple ? 4 : 0,
        },
    })
);

export type MinionCardProps = {
    minion: Minion;
    tavernTier: tavernTiers;
    minionType: minionTypes;
};

export const MinionCard = ({ minion, tavernTier }: MinionCardProps) => {
    const { isTriple, avatarSrc, avatarTripleSrc, name, minionId } = minion;

    const { classes } = useMinionCardStyles(isTriple);
    const t = useI18nMinionTranslate();

    const src = isTriple ? avatarTripleSrc : avatarSrc;
    const isSummoned = summonedMinionsSet.has(minionId);
    return (
        <Box className={classes.minionCard}>
            <MinionAbilities minion={minion}></MinionAbilities>
            <Box className={classes.tripleOverride}>
                <Image
                    priority
                    width={isTriple ? 198 : 200}
                    height={276}
                    src={src}
                    alt={name}
                ></Image>
            </Box>
            <MinionTavernTier
                isSummoned={isSummoned}
                tavernTier={tavernTier}
                isTriple={isTriple}
            ></MinionTavernTier>
            <MinionName
                isSummoned={isSummoned}
                name={t(minion.name)}
                isTriple={minion.isTriple}
            ></MinionName>
            <MinionDescription
                isSummoned={isSummoned}
                isTriple={minion.isTriple}
                minion={minion}
            ></MinionDescription>
            <MinionAttackPower
                isSummoned={isSummoned}
                attackPower={minion.attackPower}
            ></MinionAttackPower>
            <MinionCountOfHitPoints
                isSummoned={isSummoned}
                countOfHitPoints={minion.countOfHitPoints}
            ></MinionCountOfHitPoints>
        </Box>
    );
};
