import { Server } from 'Socket.IO';
import { playGamePhases } from '@prisma/client';

import { getPhaseDuration } from '../services/play-game.phase.service';

import { GameId } from '../../../models/common.models';

import {
    actionTypes,
    scheduleTask,
} from '../../../utils.ts/scheduled-time.utils';

const phaseSiquence = {
    [playGamePhases.initialisation]: playGamePhases.heroSelection,
    [playGamePhases.combat]: playGamePhases.recruit,

    [playGamePhases.heroSelection]: playGamePhases.recruit,
    [playGamePhases.recruit]: playGamePhases.recruit,
};

export const isPlayGameOver = (gameId: GameId) => {
    return true;
};

export const finishPlayGame = (io: Server, gameId: GameId) => {};

export const changePlayGamePhase = async (
    io: Server,
    gameId: GameId,
    phase: playGamePhases
) => {
    // changePhaseOperation
    // notifyPhaseChanged -> only if recruit phase completed
    const round = 123; //
    return round;
};

export const performEndPhaseActivity = async (
    gameId: GameId,
    phase: playGamePhases
) => {
    // recruit phase
    // -> calculate/check all players activities per phase
    // combat phase
    // build all batte results
    // -> build new player pairs
};

export const togglePhase =
    (io: Server, gameId: string, phase: playGamePhases) => async () => {
        // perform end phase activity
        await performEndPhaseActivity(gameId, phase);

        // change phase to another phase
        const round = await changePlayGamePhase(
            io,
            gameId,
            phaseSiquence[phase]
        );

        // check if game not over
        if (await isPlayGameOver(gameId)) {
            return finishPlayGame(io, gameId);
        }

        // schedule new phase event
        togglePlayGameEngine(io, gameId, phase, round);
    };

export const recruitPhaseInitialization = async (
    io: Server,
    gameId: GameId
) => {
    // build new player pairs
    // notify phase is ready
};

export const togglePlayGameEngine = (
    io: Server,
    gameId: GameId,
    phase: playGamePhases,
    round: number
) => {
    // perform start phase activities
    recruitPhaseInitialization(io, gameId);

    scheduleTask(
        togglePhase(io, gameId, phaseSiquence[phase]),
        `${actionTypes.togglePhaseInPlayGame}: toggle phase`,
        getPhaseDuration(phase, round)
    );
};
