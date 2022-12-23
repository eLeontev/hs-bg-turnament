import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useGameSubscription = (socket: Socket) => {
    const [data, setGameData] = useState();

    useEffect(() => {
        socket.on('game-data', setGameData);

        return () => {
            socket.off('game-data');
        };
    }, [socket]);

    return data;
};

const initSocketConnection = async (setConnected: (socket: Socket) => void) => {
    await fetch('http://localhost:3000/api/socket');
    const socket = io();
    socket.on('connect', () => setConnected(socket));
};

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        if (!socket) {
            initSocketConnection(setSocket);
            return;
        }

        return () => {
            // TODO:list of disconnections
        };
    }, [socket]);

    return socket;
};
