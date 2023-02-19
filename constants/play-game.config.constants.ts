import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

export const defaultCountOfHitPoints = 40;
export const initialTavernTier = 1;

export const countOfMinionsPerDeck = 5;

export const initialRound = 0;

export const defaultTavernUpdatePrice = 1;
export const defaultCardPurchasePrice = 3;
export const defaultCountOfGoldForSell = 1;

export const initialAmounOfGoldPerRound = 3;
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
