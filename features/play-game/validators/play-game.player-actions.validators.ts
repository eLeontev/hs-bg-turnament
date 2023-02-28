import {
    maxCountOfCardsInDesk,
    maxCountOfCardsInHand,
} from '../../../constants/play-game.config.constants';
import { CardId } from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../player/player.models';
import { tavernTiers } from '../models/play-game.tavern.models';

// TODO: add disable reason to tooltip

// TODO: imrove types to pass only required values
// that should imrove performance on FE (to prevent update component on each state change)
export const purchaseCardValidator = (
    player: PlayGamePlayer,
    cardId: CardId
) => {
    const { tavernCardIds, minionPurchasePrice, goldAmount, handCardIds } =
        player;
    if (!tavernCardIds.includes(cardId)) {
        throw new Error(
            'the card you are gonna purchase does not exist in your tavern cards collection'
        );
    }

    if (minionPurchasePrice > goldAmount) {
        throw new Error('you do not have enough currency to purchase the card');
    }

    if (handCardIds.length >= maxCountOfCardsInHand) {
        throw new Error('too many cards in your hand');
    }
};

const isActionDisabled = (
    validator: (player: PlayGamePlayer, cardId: CardId) => void | never,
    player: PlayGamePlayer,
    cardId: CardId
): boolean => {
    try {
        validator(player, cardId);
    } catch {
        return true;
    }

    return false;
};

export const isPurchaseCardActionDisabled = (
    player: PlayGamePlayer,
    cardId: CardId
): boolean => isActionDisabled(purchaseCardValidator, player, cardId);

export const sellCardValidator = (
    { deskCardIds }: PlayGamePlayer,
    cardId: CardId
) => {
    if (!deskCardIds.includes(cardId)) {
        throw new Error(
            'the card you are gonna sell does not exist in your cards collection on the desk'
        );
    }
};

export const isSellCardActionDisabled = (
    player: PlayGamePlayer,
    cardId: CardId
): boolean => isActionDisabled(sellCardValidator, player, cardId);

export const playCardValidator = (
    { deskCardIds, handCardIds }: PlayGamePlayer,
    cardId: CardId
) => {
    if (deskCardIds.length >= maxCountOfCardsInDesk) {
        throw new Error('too many cards in your hand');
    }

    if (!handCardIds.includes(cardId)) {
        throw new Error(
            'the card you are gonna play does not exist in your cards collection on the hand'
        );
    }
};

export const isPlayCardActionDisabled = (
    player: PlayGamePlayer,
    cardId: CardId
): boolean => isActionDisabled(playCardValidator, player, cardId);

export const rollMinionsValidator = ({
    minionsRollPrice,
    goldAmount,
}: PlayGamePlayer) => {
    if (minionsRollPrice > goldAmount) {
        throw new Error('Invalid amount of currency');
    }
};

export const isRollMinionsDisabled = (player: PlayGamePlayer): boolean =>
    isActionDisabled(rollMinionsValidator, player, '');

export const tavernTierUpgradeValidator = ({
    tavernTier,
    goldAmount,
    tavernTierUpgradePrice,
}: PlayGamePlayer) => {
    if (tavernTier === tavernTiers['☆☆☆☆☆☆']) {
        throw new Error('you tavern is already at max level');
    }

    // TODO: add logic to calculate tavern price based on round + reducing
    if (tavernTierUpgradePrice > goldAmount) {
        throw new Error(
            'you do not have enough currency to upgrade your tavern'
        );
    }
};

export const isTavernTierUpgradeDisabled = (player: PlayGamePlayer): boolean =>
    isActionDisabled(tavernTierUpgradeValidator, player, '');
