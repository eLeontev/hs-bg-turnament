import { Flex } from '@mantine/core';
import { GridComponent } from '../../../common/components/table.grid.component';
import { useOnRecruitPhaseInit } from '../../hooks/play-game.hooks';
import { FreezeToggle } from '../player-actions/freeze-toggle.component';
import { RollTavernMinions } from '../player-actions/roll-tavern-minions.component';
import { TavernTier } from '../player-actions/upgrade-tavern-tier.component';
import { GoldAmount } from './gold-amount.component';
import { DeskMinions } from '../minions/desk-minions.component';
import { HandMinions } from '../minions/hand-minions.component';
import { TavernMinions } from '../minions/tavern-minions.component';

export const RecruitDesk = () => {
    useOnRecruitPhaseInit();

    return (
        <GridComponent>
            <Flex>
                <TavernTier></TavernTier>
                <GoldAmount></GoldAmount>
                <FreezeToggle></FreezeToggle>
                <RollTavernMinions></RollTavernMinions>
            </Flex>

            <TavernMinions></TavernMinions>
            <DeskMinions></DeskMinions>
            <HandMinions></HandMinions>
        </GridComponent>
    );
};
