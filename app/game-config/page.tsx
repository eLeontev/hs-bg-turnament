'use client';

import { minionTypes } from '@prisma/client';

import { Box } from '@mantine/core';

import {
    selectedTavernTiersSelector,
    useGameConfigStore,
} from '../../features/game-config/store/game-config.store';

import { GridComponent } from '../../features/common/components/table.grid.component';
import { GameConfigTitle } from '../../features/game-config/components/config.title.component';
import { TavernTierFilter } from '../../features/game-config/components/game-config.taver-tier.filter';

import { tavernTiersArray } from '../../constants/game-config.constants';

import { tavernTiers } from '../../features/play-game/models/play-game.tavern.models';

import { TavernTierMinions } from '../../features/game-config/components/game-config.tavern-tier.minions';

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
