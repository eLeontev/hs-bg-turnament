import { playGamePhases } from '@prisma/client';

export const phaseSequence = {
    [playGamePhases.heroSelection]: playGamePhases.recruit,
    [playGamePhases.combat]: playGamePhases.recruit,
    [playGamePhases.recruit]: playGamePhases.recruit,
};

export const roundIncrement = 1;
export const minimumCountOfAlivePlayersToContinuePlayGame = 2;
