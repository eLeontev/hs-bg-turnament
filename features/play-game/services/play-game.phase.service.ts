import { playGamePhases } from '@prisma/client';
import { PlayGamePhaseData } from '../models/play-game.models';

export const heroSelectionPhaseDurationInMs = 40000; // 40s
export const recruitPhaseDurationInMs = 20000; // 20s
export const combatPhaseDurationInMs = 10000; // 10s

export const phasesDuration = {
    [playGamePhases.heroSelection]: heroSelectionPhaseDurationInMs,
    [playGamePhases.recruit]: recruitPhaseDurationInMs,
    [playGamePhases.combat]: combatPhaseDurationInMs,
};

export const baseRoundModifierInMs = 10000; // 10s
export const maxRecruitRoundModifierInMs = 120000; // 120s

const getRoundModifier = (phase: playGamePhases, round: number) => {
    if (phase === playGamePhases.recruit) {
        return round < 8
            ? round * baseRoundModifierInMs
            : maxRecruitRoundModifierInMs;
    }

    return 0;
};

export const getPhaseDuration = (phase: playGamePhases, round?: number) =>
    phasesDuration[phase] + (round ? getRoundModifier(phase, round) : 0);

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
