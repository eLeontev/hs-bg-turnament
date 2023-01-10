import { useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { getBaseUrl } from '../utils.ts/url.utils';

let _socket: Socket;

const initSocketConnection = async (setConnected: (socket: Socket) => void) => {
    await fetch(`${getBaseUrl()}/api/socket`);

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
