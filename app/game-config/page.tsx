'use client';

import { minionTypes } from '@prisma/client';

import { Box, Flex, Space } from '@mantine/core';

import { minionTypesValues } from '../../features/play-game/schemas/play-game.minion.schemas';

import {
    selectedMinionTypesSetSelector,
    selectedTavernTiersSelector,
    useGameConfigStore,
} from '../../features/game-config/store/game-config.store';

import { GridComponent } from '../../features/common/components/table.grid.component';
import { GameConfigTitle } from '../../features/game-config/components/config.title.component';

import { TavernTierMinions } from '../../features/game-config/components/game-config.tavern-tier.minions';

import { SummonedMinionsToggle } from '../../features/game-config/components/game-config.summoned-minions.toggle';
import { TavernTierFilter } from '../../features/game-config/components/game-config.taver-tier.filter';
import { MinionTypeFilter } from '../../features/game-config/components/game-config.minion-type.filter';

import { tavernTiersArray } from '../../constants/game-config.constants';

import { tavernTiers } from '../../features/play-game/models/play-game.tavern.models';

const ConfigPage = () => {
    const selectedTavernTiers = useGameConfigStore(selectedTavernTiersSelector);
    const selectedMinionTypesSet = useGameConfigStore(
        selectedMinionTypesSetSelector
    );

    const displayedTavernTiers = selectedTavernTiers.size
        ? tavernTiersArray.filter((tavernTier) =>
              selectedTavernTiers.has(tavernTier)
          )
        : tavernTiersArray;

    const displayedMinionTypes = selectedMinionTypesSet.size
        ? minionTypesValues.filter((minionType) =>
              selectedMinionTypesSet.has(minionType)
          )
        : minionTypesValues;

    return (
        <GridComponent>
            <GameConfigTitle></GameConfigTitle>
            <Flex align="center">
                <TavernTierFilter></TavernTierFilter>
                <Space w="xl"></Space>
                <MinionTypeFilter></MinionTypeFilter>
                <Space w="xl"></Space>
                <SummonedMinionsToggle></SummonedMinionsToggle>
            </Flex>

            <Box>
                {displayedTavernTiers.map((tavernTier: tavernTiers) =>
                    displayedMinionTypes.map((minionType: minionTypes) => (
                        <TavernTierMinions
                            key={`${tavernTier}${minionType}`}
                            tavernTier={tavernTier}
                            minionType={minionType}
                        ></TavernTierMinions>
                    ))
                )}
            </Box>
        </GridComponent>
    );
};
export default ConfigPage;
