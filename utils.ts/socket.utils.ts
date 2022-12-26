import { NextApiResponse } from 'next';
import { Server } from 'Socket.IO';
import { socketRoomIds } from '../enums/socket.enums';

export const getSocket = (res: NextApiResponse): Server =>
    (res?.socket as any)?.server?.io as Server;

export const getJoinLeavePendingGameEventName = (playerId: string) =>
    `${socketRoomIds.joinLeavePendingGame}: ${playerId}`;
