import { Server } from 'Socket.IO';
import { Socket } from 'Socket.IO/dist/socket';

import { initOnlineGameRoom } from './online-game.socket';
import { initPendingGamesRoom } from './pending-games.socket';

import { builtInSocketEventNames } from '../enums/socket.enums';
import { initPlayGame } from './play-game.socket';

export const registerCommunication = (io: Server) => {
    io.on(builtInSocketEventNames.connection, (socket: Socket) => {
        initPendingGamesRoom(socket);
        initOnlineGameRoom(io, socket);
        initPlayGame(socket);
    });
};
