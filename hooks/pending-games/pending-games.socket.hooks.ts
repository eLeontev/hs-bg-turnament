import { useEffect } from 'react';

import { useSocket } from '../../lib/socket.client';

import {
    socketRoomChangesEventNames,
    pendingGamesRoomEventNames,
} from '../../enums/socket.enums';

import { GameId } from '../../models/common.models';
import { PendingGames } from '../../models/pending-games.models';

export const usePendingGamesSocketRoom = () => {
    const socket = useSocket();
    useEffect(() => {
        socket.emit(socketRoomChangesEventNames.joinPendingGamesRoom);

        return () => {
            socket.emit(socketRoomChangesEventNames.leavePendingGamesRoom);
        };
    }, [socket]);
};

export const usePendingGameSocketRoom = (gameId: GameId) => {
    const socket = useSocket();
    useEffect(() => {
        socket.emit(socketRoomChangesEventNames.joinPendingGameRoom, gameId);

        return () => {
            socket.emit(
                socketRoomChangesEventNames.leavePendingGameRoom,
                gameId
            );
        };
    }, [socket, gameId]);
};

export const usePendingGamesFromSocket = (
    setPendingGames: (pendingGames: PendingGames) => void
) => {
    const socket = useSocket();
    useEffect(() => {
        socket.on(pendingGamesRoomEventNames.getPendingGames, setPendingGames);

        return () => {
            socket.removeAllListeners(
                pendingGamesRoomEventNames.getPendingGames
            );
        };
    }, [socket, setPendingGames]);
};
