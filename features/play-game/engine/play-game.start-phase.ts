import { Server } from 'Socket.IO';

import {
    changePlayGamePhaseOperation,
    getPlayGameOperation,
} from '../operations/play-game.operations';

import { setPlayerPairs } from './play-game.finish-hero-selection';

import { GameId } from '../../../models/common.models';
import { playGamePhases } from '@prisma/client';
import { dateInUtcString } from '../../../utils.ts/date.utils';
import { playGameActions } from '../play-game.enums';
import {
    getPhaseData,
    getPhaseDuration,
} from '../services/play-game.phase.service';
import { notifyPlayersInPlayGame } from '../sockets/play-game.notification.socket';
import { PlayGamePhaseData } from '../models/play-game.models';
import { phaseSiquence, roundIncrement } from './play-game.engine.constants';
import { phaseInitializationService } from '../services/play-game.phase-initialization.service';

export const performStartPhaseActivity = async (
    io: Server,
    gameId: GameId,
    phase: playGamePhases
) => {
    const { players, round } = await getPlayGameOperation(gameId);
    await setPlayerPairs(players);
    await phaseInitializationService.initRecruitPhase(gameId);

    const playGameData: PlayGamePhaseData = getPhaseData(
        phaseSiquence[phase],
        dateInUtcString(),
        round + roundIncrement
    );

    await changePlayGamePhaseOperation(gameId, playGameData);

    notifyPlayersInPlayGame(io, gameId, {
        action: playGameActions.phaseChangedTo,
        payload: playGameData,
    });

    return playGameData.round;
};
