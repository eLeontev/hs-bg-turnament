import { I18nTransMessages } from '../i18n.models';
import { namespaces } from '../enums/i18n.enums';

export const ruErrorMessages: I18nTransMessages<namespaces.errorMessages> = {
    errorTitle: 'Что-то пошло не так, синхронизируемся. Ждемс.',

    // player actions
    purchaseCardDoesNotExist:
        'Карта, которую вы пытались купить не найдена в таверне',
    purchaseCardNotEnoughCurrency: 'Не хватает денег, чтобы купить карту',
    purchaseCardTooManyCards: 'Слишком много карт в руке',
    sellCardDoesNotExist:
        'Карта, которую вы пытались продать не найдена на вашем столе',
    playCardTooManyCards: 'Слишком много карт на столе',
    playCardDoesNotExist:
        'Карта, которую вы пытались сыграть, не найдена в вашей руке',
    rollTavernCardsNotEnoughCurrency:
        'Не хватает денег на смену кард в таверне',
    tavernTierUpgradeNonEnoughCurrency: 'Ваша таверна уже максимального уровня',
    tavernTierUpgradeMaxTier: 'Не хватает денег на пошывение уровня таверны',
    rearrangeCardNotFound:
        'Карта, порядок, которой вы пытаетеся поменять, не найдена',
};
