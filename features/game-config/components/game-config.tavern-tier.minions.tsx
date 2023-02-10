import { Flex } from '@mantine/core';

import { minionTypes } from '@prisma/client';

import { GameConfigMinionCard } from './game-config.minion-card';

import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

import { minions } from '../../../data/minions';

type TavernTierMinionsProps = {
    tavernTier: tavernTiers;
    minionType: minionTypes;
};
export const TavernTierMinions = ({
    tavernTier,
    minionType,
}: TavernTierMinionsProps) => (
    <Flex>
        {Array.from(minions[tavernTier][minionType].values()).map((minion) => (
            <GameConfigMinionCard
                key={minion.minionId}
                minion={minion}
                minionType={minionType}
                tavernTier={tavernTier}
            ></GameConfigMinionCard>
        ))}
    </Flex>
);
