import { useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';

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
    const [socket, setSocket] = useState(_socket);
    useEffect(() => {
        initSocketConnection(setSocket);
        return () => {
            socket && socket.off();
        };
    }, [socket]);

    return socket;
};
