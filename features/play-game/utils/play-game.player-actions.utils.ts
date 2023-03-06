import {
    CardId,
    CardIds,
} from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../player/player.models';
import { tavernTiers } from '../models/play-game.tavern.models';

// TODO: improve types to pass only required values
// that should improve performance on FE (to prevent update component on each state change)

export const noFrozenCardIds: CardIds = [];

export const purchaseCardPlayerStateAction = (
    {
        tavernCardIds,
        handCardIds,
        frozenCardIds,
        goldAmount,
        minionPurchasePrice,
    }: PlayGamePlayer,
    cardId: CardId
): {
    goldAmount: number;
    handCardIds: CardIds;
    tavernCardIds: CardIds;
    frozenCardIds: CardIds;
} => ({
    goldAmount: goldAmount - minionPurchasePrice,
    frozenCardIds: frozenCardIds.filter(
        (frozenCardId) => frozenCardId !== cardId
    ),
    handCardIds: [...handCardIds, cardId],
    tavernCardIds: tavernCardIds.filter(
        (tavernCardId) => tavernCardId !== cardId
    ),
});

export const sellCardPlayerStateAction = (
    { deskCardIds, goldAmount, minionSellPrice }: PlayGamePlayer,
    cardId: CardId
): {
    goldAmount: number;
    deskCardIds: CardIds;
} => ({
    goldAmount: goldAmount + minionSellPrice,
    deskCardIds: deskCardIds.filter((deskCardId) => deskCardId !== cardId),
});

export const playCardPlayerStateAction = (
    { deskCardIds, handCardIds }: PlayGamePlayer,
    cardId: CardId
): {
    deskCardIds: CardIds;
    handCardIds: CardIds;
} => ({
    deskCardIds: [...deskCardIds, cardId],
    handCardIds: handCardIds.filter((deskCardId) => deskCardId !== cardId),
});

export const freezeTogglePlayerStateAction = ({
    tavernCardIds,
    frozenCardIds,
}: PlayGamePlayer): { frozenCardIds: CardIds } => ({
    frozenCardIds: frozenCardIds.length ? noFrozenCardIds : [...tavernCardIds],
});

export const rollMinionsPlayerStateAction = ({
    goldAmount,
    minionsRollPrice,
}: PlayGamePlayer): { goldAmount: number } => ({
    goldAmount: goldAmount - minionsRollPrice,
});

export const tavernTierUpgradePlayerStateAction = ({
    tavernTier,
    goldAmount,
    tavernTierUpgradePrice,
}: PlayGamePlayer): {
    tavernTier: tavernTiers;
    goldAmount: number;
} => ({
    tavernTier: tavernTier + 1,
    goldAmount: goldAmount - tavernTierUpgradePrice,
});
