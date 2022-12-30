import { Server } from 'Socket.IO';
import { Socket } from 'Socket.IO/dist/socket';

import { builtInSocketEventNames } from '../enums/socket.enums';

import {
    initPendingGameRoom,
    initPendingGamesRoom,
} from './pending-games.socket';

export const registeCommunication = (io: Server) => {
    io.on(builtInSocketEventNames.connection, (socket: Socket) => {
        initPendingGamesRoom(socket);
        initPendingGameRoom(socket);
    });
};
