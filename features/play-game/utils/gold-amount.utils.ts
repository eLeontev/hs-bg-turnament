import {
    initialAmountOfGoldPerRound,
    maxAmountOfGoldPerRound,
} from '../../../constants/play-game.config.constants';

export const getAmountOfGoldOnRoundStart = (round: number): number => {
    const suggestedAmountOfGold = initialAmountOfGoldPerRound + round;

    return suggestedAmountOfGold > maxAmountOfGoldPerRound
        ? maxAmountOfGoldPerRound
        : suggestedAmountOfGold;
};
