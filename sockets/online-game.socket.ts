import { Socket } from 'Socket.IO/dist/socket';

import { socketRoomChangesEventNames } from '../enums/socket.enums';

import { GameId } from '../models/common.models';

import { getOnlineGameRoom } from '../utils.ts/socket.utils';

export const initOnlineGameRoom = (socket: Socket) => {
    socket.on(
        socketRoomChangesEventNames.joinOnlineGameRoom,
        (gameId: GameId) => socket.join(getOnlineGameRoom(gameId))
    );
    socket.on(
        socketRoomChangesEventNames.leaveOnlineGameRoom,
        (gameId: GameId) => socket.leave(getOnlineGameRoom(gameId))
    );
};
