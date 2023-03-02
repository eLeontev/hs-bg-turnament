import {
    maxCountOfCardsInDesk,
    maxCountOfCardsInHand,
} from '../../../constants/play-game.config.constants';
import { CardId } from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../player/player.models';
import { tavernTiers } from '../models/play-game.tavern.models';

// TODO: improve types to pass only required values
// that should improve performance on FE (to prevent update component on each state change)

export enum validatorErrors {
    purchaseCardDoesNotExist = 'purchaseCardDoesNotExist',
    purchaseCardNotEnoughCurrency = 'purchaseCardNotEnoughCurrency',
    purchaseCardTooManyCards = 'purchaseCardTooManyCards',

    sellCardDoesNotExist = 'sellCardDoesNotExist',

    playCardTooManyCards = 'playCardTooManyCards',
    playCardDoesNotExist = 'playCardDoesNotExist',

    rollTavernCardsNotEnoughCurrency = 'rollTavernCardsNotEnoughCurrency',

    tavernTierUpgradeNonEnoughCurrency = 'tavernTierUpgradeNonEnoughCurrency',
    tavernTierUpgradeMaxTier = 'tavernTierUpgradeMaxTier',
}

export type ValidatorResult = void | validatorErrors;
export type ActionValidatorResult = false | validatorErrors;
export type ActionValidator = (
    player: PlayGamePlayer,
    cardId: CardId
) => ActionValidatorResult;

export type ValidatorErrorsMap = {
    [validatorError in validatorErrors]: string;
};

export const validatorErrorMap: ValidatorErrorsMap = {
    [validatorErrors.purchaseCardDoesNotExist]:
        'the card you are gonna purchase does not exist in your tavern cards collection',
    [validatorErrors.purchaseCardNotEnoughCurrency]:
        'you do not have enough currency to purchase the card',
    [validatorErrors.purchaseCardTooManyCards]: 'too many cards in your hand',
    [validatorErrors.sellCardDoesNotExist]:
        'the card you are gonna sell does not exist in your cards collection on the desk',
    [validatorErrors.playCardTooManyCards]: 'too many cards in your hand',
    [validatorErrors.playCardDoesNotExist]:
        'the card you are gonna play does not exist in your cards collection on the hand',
    [validatorErrors.rollTavernCardsNotEnoughCurrency]:
        'Invalid amount of currency',
    [validatorErrors.tavernTierUpgradeNonEnoughCurrency]:
        'you tavern is already at max level',
    [validatorErrors.tavernTierUpgradeMaxTier]:
        'you do not have enough currency to upgrade your tavern',
};
export const purchaseCardValidator = (
    player: PlayGamePlayer,
    cardId: CardId
): ValidatorResult => {
    const { tavernCardIds, minionPurchasePrice, goldAmount, handCardIds } =
        player;
    if (!tavernCardIds.includes(cardId)) {
        throw new Error(validatorErrors.purchaseCardDoesNotExist);
    }

    if (minionPurchasePrice > goldAmount) {
        throw new Error(validatorErrors.purchaseCardNotEnoughCurrency);
    }

    if (handCardIds.length >= maxCountOfCardsInHand) {
        throw new Error(validatorErrors.purchaseCardTooManyCards);
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
        return (e as { message: validatorErrors }).message;
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
        throw new Error(validatorErrors.sellCardDoesNotExist);
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
        throw new Error(validatorErrors.playCardTooManyCards);
    }

    if (!handCardIds.includes(cardId)) {
        throw new Error(validatorErrors.playCardDoesNotExist);
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
        throw new Error(validatorErrors.rollTavernCardsNotEnoughCurrency);
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
        throw new Error(validatorErrors.tavernTierUpgradeMaxTier);
    }

    // TODO: add logic to calculate tavern price based on round + reducing
    if (tavernTierUpgradePrice > goldAmount) {
        throw new Error(validatorErrors.tavernTierUpgradeNonEnoughCurrency);
    }
};

export const isTavernTierUpgradeDisabled = (
    player: PlayGamePlayer
): ActionValidatorResult =>
    isActionDisabled(tavernTierUpgradeValidator, player, '');
