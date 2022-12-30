import { useEffect, useState } from 'react';

import { useSocket } from '../lib/socket.client';

import {
    onlineGameRoomEventNames,
    socketRoomChangesEventNames,
} from '../enums/socket.enums';

import { GameId } from '../models/common.models';
import {
    ListOfOnlinePlayerIds,
    OnlinePlayerIds,
} from '../models/online-game.models';
import { getPlayerId } from '../utils.ts/storage.utils';

export const useOnlineGameSocketRoom = (gameId: GameId) => {
    const socket = useSocket();
    useEffect(() => {
        const playerId = getPlayerId();
        socket.emit(socketRoomChangesEventNames.joinOnlineGameRoom, {
            gameId,
            playerId,
        });

        return () => {
            socket.emit(socketRoomChangesEventNames.leaveOnlineGameRoom, {
                gameId,
                playerId,
            });
        };
    }, [socket, gameId]);
};

export const useOnlinePlayerIds = () => {
    const socket = useSocket();
    const [onlinePlayerIds, setOnlinePlayerIds] = useState<OnlinePlayerIds>(
        new Set()
    );

    useEffect(() => {
        socket.on(
            onlineGameRoomEventNames.onlinePlayerIds,
            (listOfOnlinePlayerIds: ListOfOnlinePlayerIds) =>
                setOnlinePlayerIds(new Set(listOfOnlinePlayerIds))
        );

        return () => {
            socket.removeAllListeners(onlineGameRoomEventNames.onlinePlayerIds);
        };
    }, [socket, setOnlinePlayerIds]);

    return onlinePlayerIds;
};
