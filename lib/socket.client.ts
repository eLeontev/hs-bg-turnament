import { useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { socketRoomIds } from '../enums/socket.enums';
import { PendingGames } from '../models/pending-games.models';

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
