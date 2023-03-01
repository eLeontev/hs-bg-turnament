import {
    initialAmounOfGoldPerRound,
    maxAmountOfGoldPerRound,
} from '../../../constants/play-game.config.constants';

export const getAmountOfGoldOnRoundStart = (round: number): number => {
    const suggestedAmountOfGold = initialAmounOfGoldPerRound + round;

    return suggestedAmountOfGold > maxAmountOfGoldPerRound
        ? maxAmountOfGoldPerRound
        : suggestedAmountOfGold;
};
