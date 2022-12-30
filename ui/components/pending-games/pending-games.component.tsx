import { PendingGameComponent } from './pending-game.component';

import {
    PendingGame,
    PendingGames,
} from '../../../models/pending-games.models';

export type PendingGamesProps = { pendingGames: PendingGames };

export const PendingGamesComponent = ({ pendingGames }: PendingGamesProps) =>
    pendingGames.length ? (
        <section>{getPendingGames(pendingGames)}</section>
    ) : (
        <h3>no games found</h3>
    );

export const getPendingGames = (pendingGames: PendingGames) =>
    pendingGames.map((pendingGame: PendingGame) => (
        <PendingGameComponent
            key={pendingGame.gameId}
            pendingGame={pendingGame}
        ></PendingGameComponent>
    ));
