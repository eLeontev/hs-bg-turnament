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
import { getPhaseData } from '../services/play-game.phase.service';
import { notifyPlayersInPlayGame } from '../sockets/play-game.notification.socket';
import { PlayGamePhaseData } from '../models/play-game.models';
import { phaseSequence, roundIncrement } from './play-game.engine.constants';
import { phaseInitializationService } from '../services/play-game.phase-initialization.service';
import { goldService } from '../services/play-game.gold.service';

export const performStartPhaseActivity = async (
    io: Server,
    gameId: GameId,
    phase: playGamePhases
) => {
    const { players, round } = await getPlayGameOperation(gameId);
    await setPlayerPairs(players);
    await phaseInitializationService.initRecruitPhase(gameId);

    const playGameData: PlayGamePhaseData = getPhaseData(
        phaseSequence[phase],
        dateInUtcString(),
        round + roundIncrement
    );

    await changePlayGamePhaseOperation(gameId, playGameData);
    await goldService.setGoldOnPhaseInit(gameId, playGameData.round);

    notifyPlayersInPlayGame(io, gameId, {
        action: playGameActions.phaseChangedTo,
        payload: playGameData,
    });

    return playGameData.round;
};
