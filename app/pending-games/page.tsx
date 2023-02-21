'use client';

import { useEffect } from 'react';

import { Grid } from '@mantine/core';

import { usePendingGames } from '../../features/pending-games/hooks/pending-games.hooks';

import { CreatePendingGame } from '../../features/pending-games/components/create-pending-game.component';
import { JoinedPendingGameContainer } from '../../features/pending-games/components/joined-pending-game.component';
import { PendingGamesComponent } from '../../features/pending-games/components/pending-games.component';
import { OverlayLoader } from '../../features/common/components/loader.component';

import {
    hideOverlaySelector,
    isWaitingForPlayGameSelector,
    useWaitingPlayGameStore,
} from '../../features/pending-games/components/stores/pending-game.waiting-game.store';

const PendingGamesPage = () => {
    const { pendingGames, isInGame } = usePendingGames();
    const hideOverlay = useWaitingPlayGameStore(hideOverlaySelector);
    const isWaitingForPlayGame = useWaitingPlayGameStore(
        isWaitingForPlayGameSelector
    );

    useEffect(() => hideOverlay, [hideOverlay]);

    return (
        <Grid>
            <Grid.Col span={8}>
                <PendingGamesComponent
                    isInGame={isInGame}
                    pendingGames={pendingGames}
                ></PendingGamesComponent>
            </Grid.Col>
            {isInGame ? (
                <Grid.Col span={4}>
                    <JoinedPendingGameContainer
                        pendingGames={pendingGames}
                    ></JoinedPendingGameContainer>
                </Grid.Col>
            ) : (
                <Grid.Col span={4}>
                    <CreatePendingGame></CreatePendingGame>
                </Grid.Col>
            )}
            <OverlayLoader visible={isWaitingForPlayGame}></OverlayLoader>
        </Grid>
    );
};

export default PendingGamesPage;
