'use client';

import { ReactElement } from 'react';

import { PrivateContentInfo } from '../components/private-content-info';
import { SocketConnector } from '../components/socket-connector';

import { useSetPlayerId } from '../../hooks/player-id.hook';

import { getLogin, getPlayerId } from '../../utils.ts/storage.utils';

export type PrivateRouterProps = {
    children: ReactElement;
};

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
    useSetPlayerId();

    const isLoggedIn = getLogin();
    const hasPlayerId = getPlayerId();

    if (isLoggedIn && hasPlayerId) {
        return <SocketConnector>{children}</SocketConnector>;
    }

    return <PrivateContentInfo></PrivateContentInfo>;
};
