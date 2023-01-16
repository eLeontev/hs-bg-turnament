import { Center, Group, Title } from '@mantine/core';

import { PendingGameComponent } from './pending-game.component';

import { PendingGame, PendingGames } from '../pending-games.models';

export type PendingGamesProps = {
    pendingGames: PendingGames;
    isInGame: boolean;
};

export const PendingGamesComponent = ({
    pendingGames,
    isInGame,
}: PendingGamesProps) =>
    pendingGames.length ? (
        <Group>{getPendingGames(pendingGames, isInGame)}</Group>
    ) : (
        <Center>
            <Title order={3}>No games found</Title>
        </Center>
    );

export const getPendingGames = (
    pendingGames: PendingGames,
    isInGame: boolean
) =>
    pendingGames.map((pendingGame: PendingGame) => (
        <PendingGameComponent
            key={pendingGame.gameId}
            isInGame={isInGame}
            pendingGame={pendingGame}
        ></PendingGameComponent>
    ));
