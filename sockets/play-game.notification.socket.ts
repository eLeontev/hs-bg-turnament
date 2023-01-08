import { Server } from 'Socket.IO';

import { playGameEventNames } from '../enums/socket.enums';

import { GameId } from '../models/common.models';

import { getOnlineGameRoom } from '../utils.ts/socket.utils';

export const notifyOnlinePlayersPendingGameStarted = (
    io: Server,
    gameId: GameId
) =>
    io
        .in(getOnlineGameRoom(gameId, false))
        .emit(playGameEventNames.startPlayGame, gameId);
