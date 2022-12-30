import { Socket } from 'Socket.IO/dist/socket';

import {
    socketRoomChangesEventNames,
    socketRooms,
} from '../enums/socket.enums';

import { GameId } from '../models/common.models';

import { getPendingGameRoom } from '../utils.ts/socket.utils';

export const initPendingGamesRoom = (socket: Socket) => {
    socket.on(socketRoomChangesEventNames.joinPendingGamesRoom, () =>
        socket.join(socketRooms.pendingGames)
    );
    socket.on(socketRoomChangesEventNames.leavePendingGamesRoom, () =>
        socket.leave(socketRooms.pendingGames)
    );
};

export const initPendingGameRoom = (socket: Socket) => {
    socket.on(
        socketRoomChangesEventNames.joinPendingGameRoom,
        (gameId: GameId) => socket.join(getPendingGameRoom(gameId))
    );
    socket.on(
        socketRoomChangesEventNames.leavePendingGameRoom,
        (gameId: GameId) => socket.leave(getPendingGameRoom(gameId))
    );
};
