import { maxCountOfPlayers } from '../../../constants/game-config.constants';

import { PendingGame } from '../../../models/pending-games.models';

export type PendingGameDetailsProps = { pendingGame: PendingGame };

export const PendingGameDetails = ({
    pendingGame,
}: PendingGameDetailsProps) => (
    <ul key={pendingGame.gameId}>
        <li>Time created: {pendingGame.createdDate}</li>
        <li>Author: {pendingGame.authorLogin}</li>
        <li>Game name: {pendingGame.gameName}</li>
        <li>
            Count of players: {pendingGame.players.length}/{maxCountOfPlayers}
        </li>
    </ul>
);
