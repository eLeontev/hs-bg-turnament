import { Badge, Box, Flex, Rating } from '@mantine/core';
import { IconSun, IconMoon, IconIceCream } from '@tabler/icons';
import { maxAmounOfGoldPerRound } from '../../../../constants/play-game.config.constants';
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
import {
    isPlayCardActionDisabled,
    isPurchaseCardActionDisabled,
    isRollMinionsDisabled,
    isSellCardActionDisabled,
    isTavernTierUpgradeDisabled,
} from '../../validators/play-game.player-actions.validators';
import {
    cardSelector,
    goldAmountSelector,
    tavernCardIdsSelector,
    tavernTierSelector,
    updateTavernTierSelector,
    usePlayerStore,
    updateTavernCardsSelector,
    deskCardIdsSelector,
    handCardIdsSelector,
    purchaseCardSelector,
    sellCardSelector,
    playCardSelector,
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

        purchaseCard(cardId);
        mutateAsync({ ...baseInput, cardId }).catch(console.error);
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

        sellCard(cardId);
        mutateAsync({ ...baseInput, cardId }).catch(console.error);
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

        playCard(cardId);
        mutateAsync({ ...baseInput, cardId }).catch(console.error);
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

    const player = usePlayerStore();
    const tavernTier = usePlayerStore(tavernTierSelector);

    const updateTavernTier = usePlayerStore(updateTavernTierSelector);

    const { mutateAsync, isLoading } = trpc.upgradeTavern.useMutation();

    const isActionDisabled = isTavernTierUpgradeDisabled(player);

    const action = () => {
        if (isActionDisabled) {
            alert('not enough gold');

            return;
        }

        updateTavernTier();
        mutateAsync(baseInput).catch(console.error);
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

    const player = usePlayerStore();
    const updateTavernCards = usePlayerStore(updateTavernCardsSelector);

    const { mutateAsync, isLoading } = trpc.rollTavernMinions.useMutation();
    const isActionDisabled = isRollMinionsDisabled(player);

    const action = () => {
        if (isActionDisabled) {
            alert('not enough gold');

            return;
        }

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
