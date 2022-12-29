import { Server } from 'Socket.IO';

import { socketRoomIds } from '../../enums/socket.enums';
import { GameId, PlayerId } from '../../models/common.models';
import { PendingGames } from '../../models/pending-games.models';
import {
    getJoinLeavePendingGameEventName,
    getPlayersOnlineEventName,
    getStartPendingGameEventName,
} from '../../utils.ts/socket.utils';
import {
    deleteOnlinePlayerIds,
    registerPlayerOnline,
} from './online.server.service';

export type SocketRoomData = {
    [socketRoomIds.gameSearch]: PendingGames;
    [socketRoomIds.joinLeavePendingGame]: never;
    [socketRoomIds.startPendingGame]: never;
    [socketRoomIds.onlinePlayers]: never;
    [socketRoomIds.offlinePlayer]: never;
    [socketRoomIds.joinGameOnlineStatus]: never;
    [socketRoomIds.leaveGameOnlineStatus]: never;
    [socketRoomIds.finishGameOnlineStatus]: never;
};

const emitData = <T extends socketRoomIds>(
    socketServer: Server,
    roomId: T,
    data: SocketRoomData[T]
) => socketServer.emit(roomId, data);

export const notifyPendingGames = (
    socketServer: Server,
    pendingGames: PendingGames
) => emitData(socketServer, socketRoomIds.gameSearch, pendingGames);

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

export const notifyStartPendingGame = (socketServer: Server, gameId: string) =>
    socketServer.emit(getStartPendingGameEventName(gameId), 'game started');

export const registerSocketListeners = (socketServer: Server) => {
    const onlinePlayerIdsPerGame = new Map<GameId, Set<PlayerId>>();

    socketServer.on('connection', (socket) => {
        socket.on(
            socketRoomIds.joinGameOnlineStatus,
            ({ gameId, playerId }) => {
                const onlinePlayersInGame = getPlayersOnlineEventName(gameId);

                const onlinePlayerIds = registerPlayerOnline(
                    onlinePlayerIdsPerGame,
                    gameId,
                    playerId
                );

                socket.join(onlinePlayersInGame);

                socketServer
                    .to(onlinePlayersInGame)
                    .emit(getPlayersOnlineEventName(gameId), onlinePlayerIds);

                const leaveEvent = () => {
                    socket.leave(onlinePlayersInGame);
                    socketServer
                        .to(onlinePlayersInGame)
                        .emit(socketRoomIds.leaveGameOnlineStatus, playerId);

                    deleteOnlinePlayerIds(onlinePlayerIdsPerGame, gameId);
                };

                socket.on(socketRoomIds.leaveGameOnlineStatus, leaveEvent);
                socket.on('disconnect', leaveEvent);
            }
        );
    });
};

export const notifyPendingGameFinished = (
    socketServer: Server,
    gameId: GameId
) => socketServer.emit(socketRoomIds.finishGameOnlineStatus, gameId);
