'use client';

import { ReactElement } from 'react';

import { usePendingGamesSocketRoom } from '../../hooks/pending-games/pending-games.socket.hooks';

import { PrivateRouter } from '../../ui/routers/private-router';

export type PendingGamesLayoutProps = {
    children: ReactElement;
};

const PendingGamesSocketRegistration = ({
    children,
}: PendingGamesLayoutProps) => {
    usePendingGamesSocketRoom();
    return children;
};

const PendingGamesLayout = ({ children }: PendingGamesLayoutProps) => (
    <PrivateRouter>
        <PendingGamesSocketRegistration>
            {children}
        </PendingGamesSocketRegistration>
    </PrivateRouter>
);

export default PendingGamesLayout;