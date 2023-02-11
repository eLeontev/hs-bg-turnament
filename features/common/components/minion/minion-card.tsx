import { Box, createStyles, MantineTheme } from '@mantine/core';

import Image from 'next/image';

import { minionTypes } from '@prisma/client';

import { useI18nMinionTranslate } from '../../../../i18n/i18n.hooks';

import { MinionCountOfHitpoints } from './minion.hit-points';
import { MinionName } from './minion.name';
import { MinionAttackPower } from './minion.attack-power';
import { MinionTavernTier } from './minion.tavern-tier';
import { MinionDescription } from './minion.description';

import { Minion } from '../../../play-game/models/play-game.minion.models';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';

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

export const MinionCard = ({
    minion,
    tavernTier,
    minionType,
}: MinionCardProps) => {
    const { isTriple, avatarSrc, avatarTripleSrc, name } = minion;

    const { classes } = useMinionCardStyles(isTriple);
    const t = useI18nMinionTranslate();

    const src = isTriple ? avatarTripleSrc : avatarSrc;

    return (
        <Box className={classes.minionCard}>
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
                minionId={minion.minionId}
                tavernTier={tavernTier}
                isTriple={isTriple}
            ></MinionTavernTier>
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
        </Box>
    );
};
