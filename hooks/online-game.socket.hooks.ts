import { useEffect } from 'react';

import { useSocket } from '../lib/socket.client';

import { socketRoomChangesEventNames } from '../enums/socket.enums';

import { GameId } from '../models/common.models';

export const useOnlineGameSocketRoom = (gameId: GameId) => {
    const socket = useSocket();
    useEffect(() => {
        socket.emit(socketRoomChangesEventNames.joinOnlineGameRoom, gameId);

        return () => {
            socket.emit(
                socketRoomChangesEventNames.leaveOnlineGameRoom,
                gameId
            );
        };
    }, [socket, gameId]);
};
