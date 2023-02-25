import { playGamePhases } from '@prisma/client';
import { initialAmounOfGoldPerRound } from '../../../constants/play-game.config.constants';
import { PlayGamePhaseData } from '../models/play-game.models';
import { getAmountOfGoldOnRoundStart } from './play-game.gold.service';

export const heroSelectionPhaseDurationInMs = 40000; // 40s
export const recruitPhaseDurationInMs = 20000; // 20s
export const combatPhaseDurationInMs = 10000; // 10s

export const pahsesDuration = {
    [playGamePhases.heroSelection]: heroSelectionPhaseDurationInMs,
    [playGamePhases.recruit]: recruitPhaseDurationInMs,
    [playGamePhases.combat]: combatPhaseDurationInMs,
};

export const baseRoundModificatorInMs = 10000; // 10s
export const maxRecruitRoundModificatorInMs = 120000; // 120s

const getRoundModificator = (phase: playGamePhases, round: number) => {
    if (phase === playGamePhases.recruit) {
        return round < 8
            ? round * baseRoundModificatorInMs
            : maxRecruitRoundModificatorInMs;
    }

    return 0;
};

export const getPhaseDuration = (phase: playGamePhases, round?: number) =>
    pahsesDuration[phase] + (round ? getRoundModificator(phase, round) : 0);

export const getPhaseData = (
    phase: playGamePhases,
    phaseStartDate: string,
    round?: number
): PlayGamePhaseData => ({
    phase,
    phaseStartDate,
    round: round || 0,
    phaseDurationInMs: getPhaseDuration(phase, round),
});
