import { Socket } from 'Socket.IO/dist/socket';

import { isPlayerInPlayGameOperation } from '../operations/play-game.operations';

import {
    builtInSocketEventNames,
    socketRoomChangesEventNames,
} from '../../common/sockets/socket.enums';

import { PlayGameJoinLeavePayload } from '../models/play-game.models';

import { getPlayGameRoom } from '../../../utils.ts/socket.utils';

export const initPlayGame = (socket: Socket) => {
    socket.on(
        socketRoomChangesEventNames.joinPlayGameRoom,
        async ({ playerIdInGame, gameId }: PlayGameJoinLeavePayload) => {
            const playGameRoomId = getPlayGameRoom(gameId);

            if (!(await isPlayerInPlayGameOperation(gameId, playerIdInGame))) {
                return;
            }

            socket.join(playGameRoomId);

            socket.once(socketRoomChangesEventNames.leaveOnlineGameRoom, () =>
                socket.leave(playGameRoomId)
            );
            socket.once(builtInSocketEventNames.disconnect, () =>
                socket.leave(playGameRoomId)
            );
        }
    );
};
