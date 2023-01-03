import { Center, Group, Title } from '@mantine/core';

import { PendingGameComponent } from './pending-game.component';

import {
    PendingGame,
    PendingGames,
} from '../../../models/pending-games.models';

export type PendingGamesProps = { pendingGames: PendingGames };

export const PendingGamesComponent = ({ pendingGames }: PendingGamesProps) =>
    pendingGames.length ? (
        <Group>{getPendingGames(pendingGames)}</Group>
    ) : (
        <Center>
            <Title order={3}>No games found</Title>
        </Center>
    );

export const getPendingGames = (pendingGames: PendingGames) =>
    pendingGames.map((pendingGame: PendingGame) => (
        <PendingGameComponent
            key={pendingGame.gameId}
            pendingGame={pendingGame}
        ></PendingGameComponent>
    ));
