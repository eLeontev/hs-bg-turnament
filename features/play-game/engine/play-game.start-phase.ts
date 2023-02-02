import { Server } from 'Socket.IO';

import { getPlayGameOperation } from '../operations/play-game.operations';

import { setPlayerPairs } from './play-game.finish-hero-selection';

import { GameId } from '../../../models/common.models';

export const performStartPhaseActivity = async (io: Server, gameId: GameId) => {
    const { players } = await getPlayGameOperation(gameId);
    await setPlayerPairs(players);
    // prepare new data
    // notify phase is ready is it required?
};
