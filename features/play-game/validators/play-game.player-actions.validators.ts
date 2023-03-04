import {
    maxCountOfCardsInDesk,
    maxCountOfCardsInHand,
} from '../../../constants/play-game.config.constants';
import { CardId } from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../player/player.models';
import { tavernTiers } from '../models/play-game.tavern.models';
import { errorMessageI18nKeys } from '../../../i18n/enums/i18n.error-message.enums';

// TODO: improve types to pass only required values
// that should improve performance on FE (to prevent update component on each state change)

export type ValidatorResult = void | errorMessageI18nKeys;
export type ActionValidatorResult = false | errorMessageI18nKeys;
export type ActionValidator = (
    player: PlayGamePlayer,
    cardId: CardId
) => ActionValidatorResult;

export const purchaseCardValidator = (
    player: PlayGamePlayer,
    cardId: CardId
): ValidatorResult => {
    const { tavernCardIds, minionPurchasePrice, goldAmount, handCardIds } =
        player;
    if (!tavernCardIds.includes(cardId)) {
        throw new Error(errorMessageI18nKeys.purchaseCardDoesNotExist);
    }

    if (minionPurchasePrice > goldAmount) {
        throw new Error(errorMessageI18nKeys.purchaseCardNotEnoughCurrency);
    }

    if (handCardIds.length >= maxCountOfCardsInHand) {
        throw new Error(errorMessageI18nKeys.purchaseCardTooManyCards);
    }
};

const isActionDisabled = (
    validator: (player: PlayGamePlayer, cardId: CardId) => void | never,
    player: PlayGamePlayer,
    cardId: CardId
): ActionValidatorResult => {
    try {
        validator(player, cardId);
    } catch (e) {
        return (e as { message: errorMessageI18nKeys }).message;
    }

    return false;
};

export const isPurchaseCardActionDisabled = (
    player: PlayGamePlayer,
    cardId: CardId
): ActionValidatorResult =>
    isActionDisabled(purchaseCardValidator, player, cardId);

export const sellCardValidator = (
    { deskCardIds }: PlayGamePlayer,
    cardId: CardId
): ValidatorResult => {
    if (!deskCardIds.includes(cardId)) {
        throw new Error(errorMessageI18nKeys.sellCardDoesNotExist);
    }
};

export const isSellCardActionDisabled = (
    player: PlayGamePlayer,
    cardId: CardId
): ActionValidatorResult => isActionDisabled(sellCardValidator, player, cardId);

export const playCardValidator = (
    { deskCardIds, handCardIds }: PlayGamePlayer,
    cardId: CardId
): ValidatorResult => {
    if (deskCardIds.length >= maxCountOfCardsInDesk) {
        throw new Error(errorMessageI18nKeys.playCardTooManyCards);
    }

    if (!handCardIds.includes(cardId)) {
        throw new Error(errorMessageI18nKeys.playCardDoesNotExist);
    }
};

export const isPlayCardActionDisabled = (
    player: PlayGamePlayer,
    cardId: CardId
): ActionValidatorResult => isActionDisabled(playCardValidator, player, cardId);

export const rollTavernCardsValidator = ({
    minionsRollPrice,
    goldAmount,
}: PlayGamePlayer): ValidatorResult => {
    if (minionsRollPrice > goldAmount) {
        throw new Error(errorMessageI18nKeys.rollTavernCardsNotEnoughCurrency);
    }
};

export const isRollMinionsDisabled = (
    player: PlayGamePlayer
): ActionValidatorResult =>
    isActionDisabled(rollTavernCardsValidator, player, '');

export const tavernTierUpgradeValidator = ({
    tavernTier,
    goldAmount,
    tavernTierUpgradePrice,
}: PlayGamePlayer): ValidatorResult => {
    if (tavernTier === tavernTiers['☆☆☆☆☆☆']) {
        throw new Error(errorMessageI18nKeys.tavernTierUpgradeMaxTier);
    }

    // TODO: add logic to calculate tavern price based on round + reducing
    if (tavernTierUpgradePrice > goldAmount) {
        throw new Error(
            errorMessageI18nKeys.tavernTierUpgradeNonEnoughCurrency
        );
    }
};

export const isTavernTierUpgradeDisabled = (
    player: PlayGamePlayer
): ActionValidatorResult =>
    isActionDisabled(tavernTierUpgradeValidator, player, '');
