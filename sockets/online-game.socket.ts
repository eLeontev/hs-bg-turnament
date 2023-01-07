import { Server } from 'Socket.IO';
import { Socket } from 'Socket.IO/dist/socket';

import {
    builtInSocketEventNames,
    onlineGameRoomEventNames,
    socketRoomChangesEventNames,
} from '../enums/socket.enums';
import { GameId } from '../models/common.models';

import { JoinLeaveOnlineRoomPayload } from '../models/online-game.models';
import { operations } from '../prisma/operations/pending-games';
import {
    getListOfOnlinePlayerIds,
    joinPlayerIdToTheRoom,
    leavePlayerIdToTheRoom,
} from '../services/online-game.service';

import { getOnlineGameRoom } from '../utils.ts/socket.utils';

const emitOnlinePlayers = (
    io: Server,
    onlineRoomName: string,
    gameId: GameId
) => {
    const listOfOnlinePlayerIds = getListOfOnlinePlayerIds(gameId);
    io.in(onlineRoomName).emit(
        onlineGameRoomEventNames.onlinePlayerIds,
        listOfOnlinePlayerIds
    );
};

const leavePlayerFromOnlineRoom = (
    socket: Socket,
    io: Server,
    payload: JoinLeaveOnlineRoomPayload
) => {
    const { gameId } = payload;
    leavePlayerIdToTheRoom(payload);

    const onlineRoomName = getOnlineGameRoom(gameId);
    socket.leave(onlineRoomName);

    emitOnlinePlayers(io, onlineRoomName, gameId);
};

export const initOnlineGameRoom = (io: Server, socket: Socket) => {
    let joinLeaveOnlineRoomPayload: JoinLeaveOnlineRoomPayload | undefined;

    socket.on(
        socketRoomChangesEventNames.joinOnlineGameRoom,
        async (payload: JoinLeaveOnlineRoomPayload) => {
            const { gameId, playerId } = payload;

            if (!(await operations.getPlayerInPendingGame(gameId, playerId))) {
                throw new Error(
                    `palyer: ${playerId} cannot join to this game: ${gameId}`
                );
            }

            joinLeaveOnlineRoomPayload = payload;

            joinPlayerIdToTheRoom(payload);

            const onlineRoomName = getOnlineGameRoom(gameId);
            socket.join(onlineRoomName);

            emitOnlinePlayers(io, onlineRoomName, gameId);
        }
    );

    socket.on(
        socketRoomChangesEventNames.leaveOnlineGameRoom,
        (payload: JoinLeaveOnlineRoomPayload) => {
            joinLeaveOnlineRoomPayload = undefined;
            leavePlayerFromOnlineRoom(socket, io, payload);
        }
    );

    socket.on(builtInSocketEventNames.disconnect, () => {
        if (joinLeaveOnlineRoomPayload) {
            leavePlayerFromOnlineRoom(socket, io, joinLeaveOnlineRoomPayload);
        }
    });
};
