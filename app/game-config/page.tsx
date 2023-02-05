'use client';

import { minionTypes } from '@prisma/client';

import { Flex } from '@mantine/core';

import { GridComponent } from '../../features/common/components/table.grid.component';
import { GameConfigTitle } from '../../features/game-config/components/config.title.component';

import { MinionCard } from '../../features/common/components/minion-card';

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
                tavernTier={tavernTier}
            ></MinionCard>
        ))}
    </Flex>
);

const ConfigPage = () => {
    return (
        <GridComponent>
            <GameConfigTitle></GameConfigTitle>
            <TavernTierMinions
                tavernTier={tavernTiers['☆']}
                minionType={minionTypes.beast}
            ></TavernTierMinions>
            <TavernTierMinions
                tavernTier={tavernTiers['☆☆']}
                minionType={minionTypes.beast}
            ></TavernTierMinions>
            <TavernTierMinions
                tavernTier={tavernTiers['☆☆☆']}
                minionType={minionTypes.beast}
            ></TavernTierMinions>
            <TavernTierMinions
                tavernTier={tavernTiers['☆☆☆☆']}
                minionType={minionTypes.beast}
            ></TavernTierMinions>
            <TavernTierMinions
                tavernTier={tavernTiers['☆☆☆☆☆']}
                minionType={minionTypes.beast}
            ></TavernTierMinions>
            <TavernTierMinions
                tavernTier={tavernTiers['☆☆☆☆☆☆']}
                minionType={minionTypes.beast}
            ></TavernTierMinions>
        </GridComponent>
    );
};
export default ConfigPage;
