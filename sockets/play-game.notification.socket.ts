import { Server } from 'Socket.IO';

import { playGameEventNames } from '../enums/socket.enums';

import { GameId } from '../models/common.models';
import { PlayGameAction } from '../models/play-game.models';

import { getOnlineGameRoom } from '../utils.ts/socket.utils';

// should notify players in pending game that they need to be redirected to play game
export const notifyOnlinePlayersPlayGameStarted = (
    io: Server,
    gameId: GameId
) =>
    io
        .in(getOnlineGameRoom(gameId, false))
        .emit(playGameEventNames.startPlayGame, gameId);

export const notifyPlayersInPlayGame = <T>(
    io: Server,
    gameId: GameId,
    action: PlayGameAction<T>
) => {
    io.in(getOnlineGameRoom(gameId, false)).emit(
        playGameEventNames.gameAction,
        action
    );
};
