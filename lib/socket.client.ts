import { useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { socketRoomIds } from '../enums/socket.enums';
import { PendingGames } from '../models/pending-games.models';
import { playerIdSchema } from '../schemas/player.schemas';
import { getJoinLeavePendingGameEventName } from '../utils.ts/socket.utils';
import { getPlayerId } from '../utils.ts/storage.utils';

let _socket: Socket;

const initSocketConnection = async (setConnected: (socket: Socket) => void) => {
    await fetch('http://localhost:3000/api/socket');

    if (!_socket) {
        _socket = io();
        _socket.on('connect', () => setConnected(_socket));
    }
};

export const useSocket = () => useMemo(() => _socket, []);

export const useSocketInitialization = () => {
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        initSocketConnection(setSocket);
        return () => {
            socket && socket.off();
        };
    }, [socket]);

    return socket;
};

export const useSocketGameSearch = (
    setPendingGames: (pendingGames: PendingGames) => void
) => {
    const socket = useSocket();

    useEffect(() => {
        socket.on(socketRoomIds.gameSearch, setPendingGames);

        return () => {
            socket.off(socketRoomIds.gameSearch);
        };
    }, [socket, setPendingGames]);
};

export const useSocketJoinLeavePendingGame = (pendingGames: PendingGames) => {
    const [joinedGameId, setJoinedGameId] = useState('');
    const socket = useSocket();
    useEffect(() => {
        const eventName = getJoinLeavePendingGameEventName(
            playerIdSchema.parse(getPlayerId())
        );
        socket.on(eventName, setJoinedGameId);

        return () => {
            socket.off(eventName);
        };
    }, [socket, setJoinedGameId]);

    const joinedGame =
        joinedGameId &&
        pendingGames.find(({ gameId }) => gameId === joinedGameId);

    return joinedGame;
};
