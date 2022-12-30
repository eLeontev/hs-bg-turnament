import { JoinedPendingGamePlayers } from './joined-pending-game.players.component';
import { LeavePendingGame } from './leave-pending-game.component';
import { StartPendingGame } from './start-pending-game.component';

import {
    PendingGame,
    PendingGames,
} from '../../../models/pending-games.models';
import { Player } from '../../../models/player-id.models';

import { getPlayerId } from '../../../utils.ts/storage.utils';

export type JoinedPendingGameContainerProps = { pendingGames: PendingGames };
export type JoinedPendingGameProps = { pendingGame: PendingGame };

const getJoinedPendingGame = (pendingGames: PendingGames) =>
    pendingGames.find(({ players }: PendingGame) =>
        players.some(({ playerId }: Player) => playerId === getPlayerId())
    );

export const JoinedPendingGameContainer = ({
    pendingGames,
}: JoinedPendingGameContainerProps) => {
    const joinedPendingGame = getJoinedPendingGame(pendingGames);

    return joinedPendingGame ? (
        <JoinedPendingGame pendingGame={joinedPendingGame}></JoinedPendingGame>
    ) : null;
};

export const JoinedPendingGame = ({ pendingGame }: JoinedPendingGameProps) => {
    const { authorId, gameId } = pendingGame;
    const isAuthor = authorId === getPlayerId();

    return (
        <>
            {isAuthor && <StartPendingGame gameId={gameId}></StartPendingGame>}
            {!isAuthor && <LeavePendingGame gameId={gameId}></LeavePendingGame>}
            <JoinedPendingGamePlayers
                players={pendingGame.players}
            ></JoinedPendingGamePlayers>
        </>
    );
};
