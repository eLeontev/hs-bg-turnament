'use client';

import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

import { PrivateContentInfo } from '../components/private-content-info';
import { SocketConnector } from '../components/socket-connector';

import { useSetPlayerId } from '../../hooks/player-id.hook';

import { getPlayerId } from '../../utils.ts/storage.utils';

import { playerLoginState } from '../atoms/player-login.atom';

export type PrivateRouterProps = {
    children: ReactElement;
};

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
    useSetPlayerId();

    const isLoggedIn = useRecoilValue(playerLoginState);
    const hasPlayerId = getPlayerId();

    if (isLoggedIn && hasPlayerId) {
        return <SocketConnector>{children}</SocketConnector>;
    }

    return <PrivateContentInfo></PrivateContentInfo>;
};
