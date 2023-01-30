import { Server } from 'Socket.IO';
import { playGamePhases } from '@prisma/client';

import { notifyPlayersInPlayGame } from '../sockets/play-game.notification.socket';

import { getPhaseDuration } from '../services/play-game.phase.service';

import { playGameActions } from '../play-game.enums';

import { GameId } from '../../../models/common.models';

import { dateInUtcString } from '../../../utils.ts/date.utils';

export const performEndPhaseActivity = async (
    io: Server,
    gameId: GameId,
    shouldFinishHeroSelection?: boolean
) => {
    // -> calculate/check all players activities per phase
    // build all batte results
    // notify players to get battle results

    const phase = shouldFinishHeroSelection
        ? playGamePhases.recruit
        : playGamePhases.combat;

    notifyPlayersInPlayGame(io, gameId, {
        action: playGameActions.phaseChangedTo,
        payload: {
            phase,
            phaseDurationInMs: getPhaseDuration(phase),
            phaseStartDate: dateInUtcString(),
            round: 0,
        },
    });
};
