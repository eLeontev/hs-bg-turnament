import { Server } from 'Socket.IO';

import { socketRoomIds } from '../../enums/socket.enums';
import { PendingGames } from '../../models/pending-games.models';

export type SocketRoomData = {
    [socketRoomIds.gameSearch]: PendingGames;
};
const emitData = <T extends socketRoomIds>(
    socketServer: Server,
    roomId: T,
    data: SocketRoomData[T]
) => socketServer.emit(roomId, data);

export const notifyPendingGames = (
    socketServer: Server,
    pendingGames: PendingGames
) => {
    emitData(socketServer, socketRoomIds.gameSearch, pendingGames);
};
