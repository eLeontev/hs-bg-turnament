import { Flex } from '@mantine/core';

import { minionTypes } from '@prisma/client';

import { GameConfigMinionCard } from './game-config.minion-card';

import {
    shouldDisplaySummonedMinionsSelector,
    useGameConfigStore,
} from '../store/game-config.store';

import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

import { minions, summonedMinions } from '../../../data/minions';

type TavernTierMinionsProps = {
    tavernTier: tavernTiers;
    minionType: minionTypes;
};
export const TavernTierMinions = ({
    tavernTier,
    minionType,
}: TavernTierMinionsProps) => {
    const shouldDisplaySummonedMinions = useGameConfigStore(
        shouldDisplaySummonedMinionsSelector
    );

    const displayedMinions = shouldDisplaySummonedMinions
        ? summonedMinions
        : minions;

    return (
        <Flex>
            {Array.from(displayedMinions[tavernTier][minionType].values()).map(
                (minion) => (
                    <GameConfigMinionCard
                        key={minion.minionId}
                        minion={minion}
                        minionType={minionType}
                        tavernTier={tavernTier}
                    ></GameConfigMinionCard>
                )
            )}
        </Flex>
    );
};
