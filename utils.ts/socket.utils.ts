import { NextApiResponse } from 'next';
import { Server } from 'Socket.IO';
import { socketRooms } from '../enums/socket.enums';
import { GameId } from '../models/common.models';

export const getSocket = (res: NextApiResponse): Server =>
    (res?.socket as any)?.server?.io as Server;

export const getPendingGameRoom = (gameId: GameId) =>
    `${socketRooms.pendingGame}: ${gameId}`;
