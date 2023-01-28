import { Server } from 'Socket.IO';
import { playGamePhases } from '@prisma/client';

import { getPhaseDuration } from '../services/play-game.phase.service';

import { GameId } from '../../../models/common.models';

import { scheduleTaskWithoutCanceletion } from '../../../utils.ts/scheduled-time.utils';

const phaseSiquence = {
    [playGamePhases.initialisation]: playGamePhases.heroSelection,
    [playGamePhases.combat]: playGamePhases.recruit,

    [playGamePhases.heroSelection]: playGamePhases.recruit,
    [playGamePhases.recruit]: playGamePhases.recruit,
};

export const isPlayGameOver = (gameId: GameId) => {
    // check if at least 2 players alive
    return true;
};

export const finishPlayGame = (io: Server, gameId: GameId) => {
    // if has one player alive, notify that player is winner
};

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

export const performEndPreviousPhaseActivity = async (
    io: Server,
    gameId: GameId
) => {
    // -> calculate/check all players activities per phase
    // build all batte results
    // notify players to get battle results
};

export const performStartPhaseActivity = async (io: Server, gameId: GameId) => {
    // build new player pairs
    // notify phase is ready
};

export const togglePhase =
    (io: Server, gameId: string, phase: playGamePhases) => async () => {
        // perform start phase activity
        await performEndPreviousPhaseActivity(io, gameId);

        await performStartPhaseActivity(io, gameId);

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

export const togglePlayGameEngine = (
    io: Server,
    gameId: GameId,
    phase: playGamePhases,
    round: number
) => {
    scheduleTaskWithoutCanceletion(
        togglePhase(io, gameId, phaseSiquence[phase]),
        getPhaseDuration(phase, round)
    );
};
