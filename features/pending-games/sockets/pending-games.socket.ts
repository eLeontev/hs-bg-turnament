import { Socket } from 'Socket.IO/dist/socket';

import {
    socketRoomChangesEventNames,
    socketRooms,
} from '../../common/sockets/socket.enums';

export const initPendingGamesRoom = (socket: Socket) => {
    socket.on(socketRoomChangesEventNames.joinPendingGamesRoom, () =>
        socket.join(socketRooms.pendingGames)
    );
    socket.on(socketRoomChangesEventNames.leavePendingGamesRoom, () =>
        socket.leave(socketRooms.pendingGames)
    );
};
