'use client';

import { minionTypes } from '@prisma/client';

import { Box, Flex } from '@mantine/core';

import {
    selectedTavernTiersSelector,
    useGameConfigStore,
} from '../../features/game-config/store/game-config.store';

import { GridComponent } from '../../features/common/components/table.grid.component';
import { GameConfigTitle } from '../../features/game-config/components/config.title.component';
import { TavernTierFilter } from '../../features/game-config/components/game-config.taver-tier.filter';
import { MinionCard } from '../../features/common/components/minion/minion-card';

import { tavernTiersArray } from '../../constants/game-config.constants';

import { tavernTiers } from '../../features/play-game/models/play-game.tavern.models';

import { minions } from '../../data/minions';

export type TavernTierMinionsProps = {
    tavernTier: tavernTiers;
    minionType: minionTypes;
};
const TavernTierMinions = ({
    tavernTier,
    minionType,
}: TavernTierMinionsProps) => (
    <Flex>
        {Array.from(minions[tavernTier][minionType].values()).map((minion) => (
            <MinionCard
                key={minion.minionId}
                minion={minion}
                minionType={minionType}
                tavernTier={tavernTier}
            ></MinionCard>
        ))}
    </Flex>
);

const ConfigPage = () => {
    const selectedTavernTiers = useGameConfigStore(selectedTavernTiersSelector);

    const displayedTavernTiers = selectedTavernTiers.size
        ? tavernTiersArray.filter((tavernTier) =>
              selectedTavernTiers.has(tavernTier)
          )
        : tavernTiersArray;

    return (
        <GridComponent>
            <GameConfigTitle></GameConfigTitle>
            <TavernTierFilter></TavernTierFilter>

            <Box>
                {displayedTavernTiers.map((tavernTier: tavernTiers) => (
                    <TavernTierMinions
                        key={tavernTier}
                        tavernTier={tavernTier}
                        minionType={minionTypes.beast}
                    ></TavernTierMinions>
                ))}
            </Box>
        </GridComponent>
    );
};
export default ConfigPage;
