import { useEffect } from 'react';

import { useSocket } from '../../../lib/socket.client';

import {
    onlineGameRoomEventNames,
    socketRoomChangesEventNames,
} from './socket.enums';

import { GameId } from '../../../models/common.models';
import { ListOfOnlinePlayerKeys } from './online-game.models';

import {
    getPlayerId,
    getPlayerIdInGame,
    getPlayerKey,
} from '../../../utils.ts/storage.utils';
import {
    setOnlinePlayersSelector,
    usePlayersStore,
} from '../../play-game/components/store/play-game.players.store';

export const useOnlineGameSocketRoom = (
    gameId: GameId,
    isPlayGame?: boolean
) => {
    const socket = useSocket();
    useEffect(() => {
        const playerId = isPlayGame ? getPlayerIdInGame() : getPlayerId();
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
    const setOnlinePlayers = usePlayersStore(setOnlinePlayersSelector);

    useEffect(() => {
        socket.on(
            onlineGameRoomEventNames.onlinePlayerKeys,
            (listOfOnlinePlayerKeys: ListOfOnlinePlayerKeys) =>
                setOnlinePlayers(new Set(listOfOnlinePlayerKeys))
        );

        return () => {
            socket.removeAllListeners(
                onlineGameRoomEventNames.onlinePlayerKeys
            );
        };
    }, [socket, setOnlinePlayers]);
};
