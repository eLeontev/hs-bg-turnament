import { Flex } from '@mantine/core';
import { minions } from '../../../../data/minions';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { Button } from '../../../common/components/button.component';
import { MinionCard } from '../../../common/components/minion/minion-card';
import { GridComponent } from '../../../common/components/table.grid.component';
import { useOnRecruitPhaseInit } from '../../hooks/play-game.hooks';
import { Minion } from '../../models/play-game.minion.models';
import {
    cardSelector,
    tavernCardIdsSelector,
    tavernTierSelector,
    usePlayerStore,
} from '../store/play-game.player.store';

type CardProps = { cardId: CardId };
const Card = ({ cardId }: CardProps) => {
    const {
        tavernTier,
        minionTypes: [miniontype],
        minionId,
    } = usePlayerStore(cardSelector(cardId));

    return (
        <MinionCard
            minion={minions[tavernTier][miniontype].get(minionId) as Minion}
            minionType={miniontype}
            tavernTier={tavernTier}
        ></MinionCard>
    );
};
const TavernMinions = () => {
    const tavernCardIds = usePlayerStore(tavernCardIdsSelector);

    return (
        <Flex>
            {tavernCardIds.map((cardId) => (
                <Card key={cardId} cardId={cardId}></Card>
            ))}
        </Flex>
    );
};

const BuyMinionTest = () => {
    // const data = usePlayGameStore();
    // console.log(data);
    return <>BuyMinionTest</>;
};

const PlayMinionTest = () => {
    // const data = usePlayGameStore();
    // console.log(data);
    return <>PlayMinionTest</>;
};

const SellMinionTest = () => {
    // const data = usePlayGameStore();
    // console.log(data);
    return <>SellMinionTest</>;
};

export const TavernTier = () => {
    const tavernTier = usePlayerStore(tavernTierSelector);
    return <Button label={`tavern tier: ${tavernTier}`}></Button>;
};
export const RecruitDesk = () => {
    useOnRecruitPhaseInit();

    return (
        <GridComponent>
            <TavernTier></TavernTier>
            <TavernMinions></TavernMinions>
        </GridComponent>
    );
};
