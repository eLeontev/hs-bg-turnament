import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

export const defaultCountOfHitPoints = 40;
export const initialTavernTier = 1;

export const countOfMinionsPerDeck = 5; // how many minion with the same ID will be available per game

export const initialRound = 0;

export const defaultMinionsRollPrice = 1;
export const defaultMinionPurchasePrice = 3;
export const defaultMinionSellPrice = 1;

export const defaultCountOfCardsToTriple = 3;

export const initialAmountOfGoldPerRound = 2;
export const maxAmountOfGoldPerRound = 10;

export const initialTavernTierUpgradePrice = 3;

export const countOfCardPerTavernTier = {
    [tavernTiers['☆']]: 3,
    [tavernTiers['☆☆']]: 4,
    [tavernTiers['☆☆☆']]: 4,
    [tavernTiers['☆☆☆☆']]: 5,
    [tavernTiers['☆☆☆☆☆']]: 6,
    [tavernTiers['☆☆☆☆☆☆']]: 7,
};

export const maxCountOfCardsInHand = 10;
export const maxCountOfCardsInDesk = 7;
