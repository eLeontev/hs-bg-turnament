import { NextApiResponse } from 'next';
import { Server } from 'Socket.IO';

import { socketRooms } from '../enums/socket.enums';

import { GameId } from '../models/common.models';

const getOnlineGamePrefix = (isPlayGame?: boolean) =>
    isPlayGame ? 'online' : 'pending';

export const getSocket = (res: NextApiResponse): Server =>
    (res?.socket as any)?.server?.io as Server;

export const getOnlineGameRoom = (gameId: GameId, isPlayGame?: boolean) =>
    `${socketRooms.onlineGame}: ${getOnlineGamePrefix(isPlayGame)} ${gameId}`;
