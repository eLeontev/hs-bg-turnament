import { Server } from 'Socket.IO';

import { socketRoomIds } from '../../enums/socket.enums';
import { PendingGames } from '../../models/pending-games.models';
import { getJoinLeavePendingGameEventName } from '../../utils.ts/socket.utils';

export type SocketRoomData = {
    [socketRoomIds.gameSearch]: PendingGames;
    [socketRoomIds.joinLeavePendingGame]: never;
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

const notifyPlayerJoinLeavePendingGame = (
    socketServer: Server,
    playerId: string,
    gameId?: string
) => socketServer.emit(getJoinLeavePendingGameEventName(playerId), gameId);

export const notifyPlayerJoinPendingGame = (
    socketServer: Server,
    playerId: string,
    gameId: string
) => notifyPlayerJoinLeavePendingGame(socketServer, playerId, gameId);
export const notifyPlayerLeavePendingGame = (
    socketServer: Server,
    playerId: string
) => notifyPlayerJoinLeavePendingGame(socketServer, playerId);
