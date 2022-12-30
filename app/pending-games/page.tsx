'use client';

import { usePendingGames } from '../../hooks/pending-games/pending-games.hooks';

import { CreatePendingGame } from '../../ui/components/pending-games/create-pending-game.component';
import { JoinedPendingGameContainer } from '../../ui/components/pending-games/joined-pending-game.component';
import { PendingGamesComponent } from '../../ui/components/pending-games/pending-games.component';

const PendingGamesPage = () => {
    const pendingGames = usePendingGames();

    return (
        <>
            <CreatePendingGame></CreatePendingGame>
            <PendingGamesComponent
                pendingGames={pendingGames}
            ></PendingGamesComponent>
            <JoinedPendingGameContainer
                pendingGames={pendingGames}
            ></JoinedPendingGameContainer>
        </>
    );
};

export default PendingGamesPage;
