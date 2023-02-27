import { Badge, Box, Flex, Rating } from '@mantine/core';
import { IconSun, IconMoon, IconIceCream } from '@tabler/icons';
import {
    initialTavernTierUpgradePrice,
    maxAmounOfGoldPerRound,
} from '../../../../constants/play-game.config.constants';
import { minions } from '../../../../data/minions';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { trpc } from '../../../../lib/client';
import { Button } from '../../../common/components/button.component';
import { MinionCard } from '../../../common/components/minion/minion-card';
import { GridComponent } from '../../../common/components/table.grid.component';
import { PlayGamePlayer } from '../../../player/player.models';
import { useOnRecruitPhaseInit } from '../../hooks/play-game.hooks';
import { Minion } from '../../models/play-game.minion.models';
import { PlayGameBaseInput } from '../../models/play-game.models';
import { tavernTiers } from '../../models/play-game.tavern.models';
import { noFrozenCardIds } from '../../utils/play-game.player-actions.utils';
import {
    isPlayCardActionDisabled,
    isPurchaseCardActionDisabled,
    isSellCardActionDisabled,
} from '../../validators/play-game.player-actions.validators';
import {
    cardSelector,
    goldAmountSelector,
    tavernCardIdsSelector,
    minionsRollPriceSelector,
    tavernTierSelector,
    increaseGoldAmountSelector,
    updateTavernTierSelector,
    usePlayerStore,
    updateTavernCardsSelector,
    deskCardIdsSelector,
    handCardIdsSelector,
    purchaseCardSelector,
    sellCardSelector,
    playCardSelector,
    decreaseGoldAmountSelector,
    freezeMinionsSelector,
    frozenCardIdsSelector,
} from '../store/play-game.player.store';
import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';

type CardProps = {
    cardId: CardId;
    isActionDisabled: (player: PlayGamePlayer, cardId: CardId) => boolean;
    isLoading: boolean;
    action: () => void;
    label: string;
    isFrozen?: boolean;
};
const Card = ({
    cardId,
    action,
    isActionDisabled,
    isLoading,
    label,
    isFrozen,
}: CardProps) => {
    const {
        tavernTier,
        minionTypes: [miniontype],
        minionId,
    } = usePlayerStore(cardSelector(cardId));
    const player = usePlayerStore();

    return (
        <Box>
            <MinionCard
                minion={minions[tavernTier][miniontype].get(minionId) as Minion}
                minionType={miniontype}
                tavernTier={tavernTier}
            ></MinionCard>
            {isFrozen && <IconIceCream></IconIceCream>}
            <Button
                disabled={isActionDisabled(player, cardId)}
                loading={isLoading}
                label={label}
                onClick={action}
            ></Button>
        </Box>
    );
};

const TavernMinions = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const tavernCardIds = usePlayerStore(tavernCardIdsSelector);
    const frozenCardIds = usePlayerStore(frozenCardIdsSelector);
    const purchaseCard = usePlayerStore(purchaseCardSelector);

    const decreaseGoldAmount = usePlayerStore(decreaseGoldAmountSelector);

    const { mutateAsync, isLoading } = trpc.purchaseMinion.useMutation();

    const action = (cardId: CardId) => {
        const isDisabled = isPurchaseCardActionDisabled(
            usePlayerStore.getState(),
            cardId
        );

        if (isDisabled) {
            alert('not enought smt to buy minion');

            return;
        }

        decreaseGoldAmount(usePlayerStore.getState().minionPurchasePrice);
        mutateAsync({ ...baseInput, cardId })
            .then(() => purchaseCard(cardId))
            .catch(console.error);
    };

    return (
        <Flex h={330}>
            {tavernCardIds.map((cardId) => (
                <Card
                    key={cardId}
                    cardId={cardId}
                    isLoading={isLoading}
                    action={() => action(cardId)}
                    label="Buy minion"
                    isActionDisabled={isPurchaseCardActionDisabled}
                    isFrozen={frozenCardIds.includes(cardId)}
                ></Card>
            ))}
        </Flex>
    );
};

const DeskMinions = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const deskCardIds = usePlayerStore(deskCardIdsSelector);
    const sellCard = usePlayerStore(sellCardSelector);

    const increaseGoldAmount = usePlayerStore(increaseGoldAmountSelector);

    const { mutateAsync, isLoading } = trpc.sellMinion.useMutation();

    const action = (cardId: CardId) => {
        const isDisabled = isSellCardActionDisabled(
            usePlayerStore.getState(),
            cardId
        );

        if (isDisabled) {
            alert('not enought smt to buy minion');

            return;
        }

        increaseGoldAmount(usePlayerStore.getState().minionSellPrice);
        mutateAsync({ ...baseInput, cardId })
            .then(() => sellCard(cardId))
            .catch(console.error);
    };

    return (
        <Flex h={330}>
            {deskCardIds.map((cardId) => (
                <Card
                    key={cardId}
                    cardId={cardId}
                    isLoading={isLoading}
                    action={() => action(cardId)}
                    label="Sell minion"
                    isActionDisabled={isSellCardActionDisabled}
                ></Card>
            ))}
        </Flex>
    );
};

const HandMinions = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const handCardIds = usePlayerStore(handCardIdsSelector);
    const playCard = usePlayerStore(playCardSelector);

    const { mutateAsync, isLoading } = trpc.playMinion.useMutation();

    const action = (cardId: CardId) => {
        const isDisabled = isPlayCardActionDisabled(
            usePlayerStore.getState(),
            cardId
        );

        if (isDisabled) {
            alert('not enought smt to play minion');

            return;
        }

        mutateAsync({ ...baseInput, cardId })
            .then(() => playCard(cardId))
            .catch(console.error);
    };

    return (
        <Flex h={330}>
            {handCardIds.map((cardId) => (
                <Card
                    key={cardId}
                    cardId={cardId}
                    isLoading={isLoading}
                    action={() => action(cardId)}
                    label="Play minion"
                    isActionDisabled={isPlayCardActionDisabled}
                ></Card>
            ))}
        </Flex>
    );
};

export const GoldAmount = () => {
    const goldAmount = usePlayerStore(goldAmountSelector);

    return (
        <Flex>
            <Rating
                size="lg"
                value={goldAmount}
                count={maxAmounOfGoldPerRound}
                emptySymbol={<IconSun />}
                fullSymbol={<IconMoon />}
                color="yellow"
            ></Rating>
            <Badge color="yellow" size="lg">
                {goldAmount}
            </Badge>
        </Flex>
    );
};

export const TavernTier = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);

    const tavernTier = usePlayerStore(tavernTierSelector);
    const updateTavernTier = usePlayerStore(updateTavernTierSelector);

    const goldAmount = usePlayerStore(goldAmountSelector);
    const decreaseGoldAmount = usePlayerStore(decreaseGoldAmountSelector);

    const { mutateAsync, isLoading } = trpc.upgradeTavern.useMutation();

    const hasNotEnoughGold = initialTavernTierUpgradePrice > goldAmount;
    const isLastTavernTier = tavernTier === tavernTiers['☆☆☆☆☆☆'];

    const isActionDisabled = hasNotEnoughGold || isLastTavernTier;

    const action = () => {
        if (isActionDisabled) {
            alert('not enough gold');

            return;
        }

        mutateAsync(baseInput).then(updateTavernTier).catch(console.error);
        decreaseGoldAmount(initialTavernTierUpgradePrice);
    };

    return (
        <Button
            disabled={isActionDisabled}
            onClick={action}
            loading={isLoading}
            label={`tavern tier: ${tavernTier}`}
        ></Button>
    );
};

export const RollTaverMinions = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);

    const goldAmount = usePlayerStore(goldAmountSelector);
    const minionsRollPrice = usePlayerStore(minionsRollPriceSelector);

    const decreaseGoldAmount = usePlayerStore(decreaseGoldAmountSelector);
    const updateTavernCards = usePlayerStore(updateTavernCardsSelector);

    const { mutateAsync, isLoading } = trpc.rollTavernMinions.useMutation();

    const isActionDisabled = minionsRollPrice > goldAmount;
    const action = () => {
        if (isActionDisabled) {
            alert('not enough gold');

            return;
        }

        decreaseGoldAmount(minionsRollPrice);
        mutateAsync(baseInput).then(updateTavernCards).catch(console.error);
    };

    return (
        <Button
            onClick={action}
            disabled={isActionDisabled}
            loading={isLoading}
            label="roll tavern minions"
            color="teal"
        ></Button>
    );
};

export const FreezeToggle = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);

    const freezeMinions = usePlayerStore(freezeMinionsSelector);

    const { mutateAsync, isLoading } = trpc.freezeMinions.useMutation();

    const action = () =>
        mutateAsync(baseInput).then(freezeMinions).catch(console.error);

    return (
        <Button
            onClick={action}
            disabled={isLoading}
            loading={isLoading}
            label="freeze minions"
            color="green"
        ></Button>
    );
};

export const RecruitDesk = () => {
    useOnRecruitPhaseInit();

    return (
        <GridComponent>
            <Flex>
                <TavernTier></TavernTier>
                <GoldAmount></GoldAmount>
                <FreezeToggle></FreezeToggle>
                <RollTaverMinions></RollTaverMinions>
            </Flex>

            <TavernMinions></TavernMinions>
            <DeskMinions></DeskMinions>
            <HandMinions></HandMinions>
        </GridComponent>
    );
};
