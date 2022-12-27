'use client';

import { ReactElement } from 'react';

import { useSocketInitialization } from '../../lib/socket.client';

export type SocketConnectorProps = {
    children: ReactElement;
};

export const SocketConnector = ({ children }: SocketConnectorProps) => {
    const socket = useSocketInitialization();
    return socket ? children : <>loading...</>;
};
