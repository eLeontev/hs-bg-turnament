import { useEffect, useState } from 'react';

import { useSocket } from '../../../lib/socket.client';

import {
    onlineGameRoomEventNames,
    socketRoomChangesEventNames,
} from './socket.enums';

import { GameId } from '../../../models/common.models';
import { ListOfOnlinePlayerKeys, OnlinePlayerKeys } from './online-game.models';

import { getPlayerId, getPlayerKey } from '../../../utils.ts/storage.utils';

export const useOnlineGameSocketRoom = (
    gameId: GameId,
    isPlayGame?: boolean
) => {
    const socket = useSocket();
    useEffect(() => {
        const playerId = getPlayerId();
        const playerKey = getPlayerKey();
        socket.emit(socketRoomChangesEventNames.joinOnlineGameRoom, {
            gameId,
            playerId,
            playerKey,
            isPlayGame,
        });

        return () => {
            socket.emit(socketRoomChangesEventNames.leaveOnlineGameRoom, {
                gameId,
                playerId,
                playerKey,
                isPlayGame,
            });
        };
    }, [socket, gameId, isPlayGame]);
};

export const useOnlinePlayerKeys = () => {
    const socket = useSocket();
    const [onlinePlayerKeys, setOnlinePlayerKeys] = useState<OnlinePlayerKeys>(
        new Set()
    );

    useEffect(() => {
        socket.on(
            onlineGameRoomEventNames.onlinePlayerKeys,
            (listOfOnlinePlayerKeys: ListOfOnlinePlayerKeys) =>
                setOnlinePlayerKeys(new Set(listOfOnlinePlayerKeys))
        );

        return () => {
            socket.removeAllListeners(
                onlineGameRoomEventNames.onlinePlayerKeys
            );
        };
    }, [socket, setOnlinePlayerKeys]);

    return onlinePlayerKeys;
};