import { NextApiResponse } from 'next';
import { Server } from 'Socket.IO';

import { socketRooms } from '../features/common/sockets/socket.enums';

import { GameId } from '../models/common.models';

const getOnlineGamePrefix = (isPlayGame?: boolean) =>
    isPlayGame ? 'play' : 'pending';

export const getSocket = (res: NextApiResponse): Server =>
    (res?.socket as any)?.server?.io as Server;

export const getOnlineGameRoom = (gameId: GameId, isPlayGame?: boolean) =>
    `${socketRooms.onlineGame}: ${getOnlineGamePrefix(isPlayGame)} ${gameId}`;

export const getPlayGameRoom = (gameId: GameId) =>
    `${socketRooms.playGame}: ${gameId}`;
