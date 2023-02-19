import { Server } from 'Socket.IO';
import { playGamePhases } from '@prisma/client';

import { getPhaseDuration } from '../services/play-game.phase.service';

import { finishHeroSelection } from './play-game.finish-hero-selection';
import { changePlayGamePhase } from './play-game.change-phase';
import { finishPlayGame } from './play-game.finish-game';
import { GameId } from '../../../models/common.models';
import { performEndPhaseActivity } from './play-game.end-phase';
import { performStartPhaseActivity } from './play-game.start-phase';

import { isPlayGameOver } from './play-game.game-over.validation';

import { phaseSiquence } from './play-game.engine.constants';

import { scheduleTaskWithoutCanceletion } from '../../../utils.ts/scheduled-time.utils';

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

        const { isGameOver, winner } = await isPlayGameOver(gameId);
        if (isGameOver && round > 4) {
            // TODO: temporary mock
            return finishPlayGame(io, gameId, winner);
        }

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
