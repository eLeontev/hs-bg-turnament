import { Server } from 'Socket.IO';
import { Socket } from 'Socket.IO/dist/socket';

import {
    builtInSocketEventNames,
    onlineGameRoomEventNames,
    socketRoomChangesEventNames,
} from './socket.enums';
import { GameId, PlayerId } from '../../../models/common.models';

import {
    getListOfOnlinePlayerIds,
    joinPlayerIdToTheRoom,
    leavePlayerKeyfromTheRoom,
} from './online-game.service';

import { isPlayerInPlayGameOperation } from '../../play-game/operations/play-game.operations';
import { getPlayerInPendingGameOperation } from '../../pending-games/operations/pending-games.operations';

import { JoinLeaveOnlineRoomPayload } from './online-game.models';

import { getOnlineGameRoom } from '../../../utils.ts/socket.utils';

const emitOnlinePlayers = (
    io: Server,
    onlineRoomName: string,
    gameId: GameId
) => {
    const listOfOnlinePlayerIds = getListOfOnlinePlayerIds(gameId);
    io.in(onlineRoomName).emit(
        onlineGameRoomEventNames.onlinePlayerKeys,
        listOfOnlinePlayerIds
    );
};

const leavePlayerFromOnlineRoom = (
    socket: Socket,
    io: Server,
    payload: JoinLeaveOnlineRoomPayload
) => {
    const { gameId } = payload;
    leavePlayerKeyfromTheRoom(payload);

    const onlineRoomName = getOnlineGameRoom(gameId, payload.isPlayGame);
    socket.leave(onlineRoomName);

    emitOnlinePlayers(io, onlineRoomName, gameId);
};

const isPlayerInGame = async (
    gameId: GameId,
    playerId: PlayerId,
    isPlayGame?: boolean
) => {
    const isPLayerInGame = isPlayGame
        ? isPlayerInPlayGameOperation
        : getPlayerInPendingGameOperation;

    if (!(await isPLayerInGame(gameId, playerId))) {
        throw new Error(
            `palyer: ${playerId} cannot join to this game: ${gameId}`
        );
    }
};
export const initOnlineGameRoom = (io: Server, socket: Socket) => {
    socket.on(
        socketRoomChangesEventNames.joinOnlineGameRoom,
        async (payload: JoinLeaveOnlineRoomPayload) => {
            const { gameId, playerId, isPlayGame } = payload;

            await isPlayerInGame(gameId, playerId, isPlayGame);

            joinPlayerIdToTheRoom(payload);

            const onlineRoomName = getOnlineGameRoom(
                gameId,
                payload.isPlayGame
            );
            socket.join(onlineRoomName);

            emitOnlinePlayers(io, onlineRoomName, gameId);

            const leaveRoomCallback = (eventName: string) => () => {
                socket.removeAllListeners(eventName);
                leavePlayerFromOnlineRoom(socket, io, payload);
            };
            socket.once(
                socketRoomChangesEventNames.leaveOnlineGameRoom,
                leaveRoomCallback(builtInSocketEventNames.disconnect)
            );

            socket.once(
                builtInSocketEventNames.disconnect,
                leaveRoomCallback(
                    socketRoomChangesEventNames.leaveOnlineGameRoom
                )
            );
        }
    );
};
