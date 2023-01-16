'use client';

import { ReactElement } from 'react';

import { usePendingGamesSocketRoom } from '../../features/pending-games/hooks/pending-games.socket.hooks';
import { useStartPlayGameFromSocket } from '../../features/play-game/hooks/play-game.socket.hooks';

import { PrivateRouter } from '../../features/common/components/routers/private-router';

export type PendingGamesLayoutProps = {
    children: ReactElement;
};

const PendingGamesSocketRegistration = ({
    children,
}: PendingGamesLayoutProps) => {
    usePendingGamesSocketRoom();
    useStartPlayGameFromSocket();

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
