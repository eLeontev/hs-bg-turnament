'use client';

import { Grid } from '@mantine/core';
import { usePendingGames } from '../../hooks/pending-games/pending-games.hooks';

import { CreatePendingGame } from '../../ui/components/pending-games/create-pending-game.component';
import { JoinedPendingGameContainer } from '../../ui/components/pending-games/joined-pending-game.component';
import { PendingGamesComponent } from '../../ui/components/pending-games/pending-games.component';

const PendingGamesPage = () => {
    const { pendingGames, isInGame } = usePendingGames();

    return (
        <Grid>
            <Grid.Col span={8}>
                <PendingGamesComponent
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
