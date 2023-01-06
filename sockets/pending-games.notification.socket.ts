import { Server } from 'Socket.IO';

import { pendingGamesRoomEventNames, socketRooms } from '../enums/socket.enums';

import { PendingGames } from '../models/pending-games.models';

export const notifyPendingGames = async (
    io: Server,
    pendingGamesPromise: Promise<PendingGames>
) => {
    const pendingGames = await pendingGamesPromise;
    io.in(socketRooms.pendingGames).emit(
        pendingGamesRoomEventNames.getPendingGames,
        pendingGames
    );
};
