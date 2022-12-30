import { NextApiResponse } from 'next';
import { Server } from 'Socket.IO';
import { socketRoomIds, socketRooms } from '../enums/socket.enums';
import { GameId } from '../models/common.models';

export const getSocket = (res: NextApiResponse): Server =>
    (res?.socket as any)?.server?.io as Server;

export const getJoinLeavePendingGameEventName = (playerId: string) =>
    `${socketRoomIds.joinLeavePendingGame}: ${playerId}`;

export const getStartPendingGameEventName = (gameId: string) =>
    `${socketRoomIds.startPendingGame}: ${gameId}`;

export const getPlayersOnlineEventName = (gameId: string) =>
    `${socketRoomIds.onlinePlayers}: ${gameId}`;

export const getPlayerOfflineEventName = (gameId: string) =>
    `${socketRoomIds.offlinePlayer}: ${gameId}`;

export const getPendingGameRoom = (gameId: GameId) =>
    `${socketRooms.pendingGame}: ${gameId}`;
