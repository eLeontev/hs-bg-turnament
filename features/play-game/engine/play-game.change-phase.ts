import { Server } from 'Socket.IO';

import { getPhaseData } from '../services/play-game.phase.service';

import {
    changePlayGamePhaseOperation,
    getPlayGameWithoutPlayerOperation,
} from '../operations/play-game.operations';

import { phaseSiquence, roundIncrement } from './play-game.engine.constants';

import { GameId } from '../../../models/common.models';
import { PlayGamePhaseData } from '../models/play-game.models';

import { dateInUtcString } from '../../../utils.ts/date.utils';

export const changePlayGamePhase = async (io: Server, gameId: GameId) => {
    const { round, phase } = await getPlayGameWithoutPlayerOperation(gameId);

    const playGameData: PlayGamePhaseData = getPhaseData(
        phaseSiquence[phase],
        dateInUtcString(),
        round + roundIncrement
    );
    await changePlayGamePhaseOperation(gameId, playGameData);

    // notifyPlayersInPlayGame(io, gameId, {
    //     action: playGameActions.phaseChangedTo,
    //     payload: playGameData,
    // });

    return round;
};
