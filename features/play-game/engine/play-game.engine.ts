import { Server } from 'Socket.IO';
import { playGamePhases } from '@prisma/client';

import { getPhaseDuration } from '../services/play-game.phase.service';

import { finishHeroSelection } from './play-game.finish-hero-selection';
import { changePlayGamePhase } from './play-game.change-phase';

import { GameId } from '../../../models/common.models';

import { phaseSiquence } from './play-game.engine.constants';

import { scheduleTaskWithoutCanceletion } from '../../../utils.ts/scheduled-time.utils';
import { performEndPhaseActivity } from './play-game.end-phase';
import { performStartPhaseActivity } from './play-game.start-phase';

export const isPlayGameOver = (gameId: GameId) => {
    // check if at least 2 players alive
    return false;
};

export const finishPlayGame = (io: Server, gameId: GameId) => {
    // if has one player alive, notify that player is winner
};

export const togglePhase =
    (
        io: Server,
        gameId: string,
        phase: playGamePhases,
        shouldFinishHeroSelection?: boolean
    ) =>
    async () => {
        if (shouldFinishHeroSelection) {
            await finishHeroSelection(gameId);
        }
        await performEndPhaseActivity(io, gameId, shouldFinishHeroSelection);

        await performStartPhaseActivity(io, gameId);

        const round = await changePlayGamePhase(io, gameId);

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
    round: number,
    shouldFinishHeroSelection?: boolean
) => {
    scheduleTaskWithoutCanceletion(
        togglePhase(
            io,
            gameId,
            phaseSiquence[phase],
            shouldFinishHeroSelection
        ),
        getPhaseDuration(phase, round)
    );
};
