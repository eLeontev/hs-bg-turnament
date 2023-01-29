import { Server } from 'Socket.IO';
import { GameId } from '../../../models/common.models';
import { notifyPlayersInPlayGame } from '../sockets/play-game.notification.socket';

export const performEndPhaseActivity = async (io: Server, gameId: GameId) => {
    // -> calculate/check all players activities per phase
    // build all batte results
    // notify players to get battle results
    // notifyPlayersInPlayGame(io, gameId, {})
};
