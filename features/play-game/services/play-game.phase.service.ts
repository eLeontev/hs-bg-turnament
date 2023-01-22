import { playGamePhases } from '@prisma/client';
import { PlayGamePhaseData } from '../models/play-game.models';

export const heroSelectionPhaseDurationInMs = 40000; // 40s
export const recruitPhaseDurationInMs = 20000; // 20s
export const combatPhaseDurationInMs = 10000; // 10s

export const pahsesDuration = {
    [playGamePhases.initialisation]: 100000000000,
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
export const getPhaseData = (
    phase: playGamePhases,
    round?: number
): PlayGamePhaseData => ({
    phase,
    round: round || 0,
    phaseDurationInMs:
        pahsesDuration[phase] + (round ? getRoundModificator(phase, round) : 0),
});
