import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

export const defaultCountOfHitPoints = 40;
export const initialTavernTier = 1;

export const countOfMinionsPerDeck = 5; // how many minion with the same ID will be available per game

export const initialRound = 0;

export const defaultMinionsRollPrice = 1;
export const defaultMinionPurchasePrice = 1;
export const defaultMinionSellPrice = 3;

export const initialAmounOfGoldPerRound = 2;
export const maxAmounOfGoldPerRound = 10;

export const initialTavernTierUpgradePrice = 3;

export const countOfCardPertavernTier = {
    [tavernTiers['☆']]: 3,
    [tavernTiers['☆☆']]: 4,
    [tavernTiers['☆☆☆']]: 4,
    [tavernTiers['☆☆☆☆']]: 5,
    [tavernTiers['☆☆☆☆☆']]: 6,
    [tavernTiers['☆☆☆☆☆☆']]: 7,
};

export const maxCountOfCardsInHand = 10;
export const maxCountOfCardsInDesk = 7;
