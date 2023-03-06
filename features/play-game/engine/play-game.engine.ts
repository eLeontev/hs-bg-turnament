import { Server } from 'Socket.IO';
import { playGamePhases } from '@prisma/client';

import { getPhaseDuration } from '../services/play-game.phase.service';

import { finishHeroSelection } from './play-game.finish-hero-selection';
import { finishPlayGame } from './play-game.finish-game';
import { GameId } from '../../../models/common.models';
import { performStartPhaseActivity } from './play-game.start-phase';

import { isPlayGameOver } from './play-game.game-over.validation';

import { phaseSequence } from './play-game.engine.constants';

import { scheduleTaskWithoutCancellation } from '../../../utils.ts/scheduled-time.utils';

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

        const round = await performStartPhaseActivity(io, gameId, phase);

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
    scheduleTaskWithoutCancellation(
        togglePhase(
            io,
            gameId,
            phaseSequence[phase],
            shouldFinishHeroSelection
        ),
        getPhaseDuration(phase, round)
    );
};
