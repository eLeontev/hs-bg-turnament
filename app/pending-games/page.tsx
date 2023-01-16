'use client';

import { Grid } from '@mantine/core';
import { usePendingGames } from '../../features/pending-games/hooks/pending-games.hooks';

import { CreatePendingGame } from '../../features/pending-games/components/create-pending-game.component';
import { JoinedPendingGameContainer } from '../../features/pending-games/components/joined-pending-game.component';
import { PendingGamesComponent } from '../../features/pending-games/components/pending-games.component';

const PendingGamesPage = () => {
    const { pendingGames, isInGame } = usePendingGames();

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
        </Grid>
    );
};

export default PendingGamesPage;
