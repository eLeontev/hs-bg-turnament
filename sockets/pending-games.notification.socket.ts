import { Server } from 'Socket.IO';

import { pendingGamesRoomEventNames, socketRooms } from '../enums/socket.enums';

import { PendingGames } from '../models/pending-games.models';

export const notifyPendingGames = (io: Server, pendingGames: PendingGames) =>
    io
        .in(socketRooms.pendingGames)
        .emit(pendingGamesRoomEventNames.getPendingGames, pendingGames);
