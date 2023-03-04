import { I18nTransMessages } from '../i18n.models';
import { namespaces } from '../enums/i18n.enums';

export const enErrorMessages: I18nTransMessages<namespaces.errorMessages> = {
    errorTitle: 'Something went wrong, synchronization. Please wait.',

    // player actions
    purchaseCardDoesNotExist:
        'The card you are gonna purchase does not exist in your tavern cards collection',
    purchaseCardNotEnoughCurrency:
        'You do not have enough currency to purchase the card',
    purchaseCardTooManyCards: 'Too many cards in your hand',
    sellCardDoesNotExist:
        'The card you are gonna sell does not exist in your cards collection on the desk',
    playCardTooManyCards: 'Too many cards in your desk',
    playCardDoesNotExist:
        'The card you are gonna play does not exist in your cards collection on the hand',
    rollTavernCardsNotEnoughCurrency:
        'Invalid amount of currency to roll tavern cards',
    tavernTierUpgradeNonEnoughCurrency: 'You tavern is already at max level',
    tavernTierUpgradeMaxTier:
        'You do not have enough currency to upgrade your tavern',
};
