'use client';

import { ReactElement } from 'react';

import { PrivateContentInfo } from '../private-content-info';
import { SocketConnector } from '../socket-connector';

import { useSetPlayerId } from '../../../player/player-id.hook';

import { getPlayerId } from '../../../../utils.ts/storage.utils';

import {
    isLoggedInSelector,
    useLoginStore,
} from '../../../login/components/store/login.store';

export type PrivateRouterProps = {
    children: ReactElement;
};

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
    useSetPlayerId();

    const isLoggedIn = useLoginStore(isLoggedInSelector);
    const hasPlayerId = getPlayerId();

    if (isLoggedIn && hasPlayerId) {
        return <SocketConnector>{children}</SocketConnector>;
    }

    return <PrivateContentInfo></PrivateContentInfo>;
};
