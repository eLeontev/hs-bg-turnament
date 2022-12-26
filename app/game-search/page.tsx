'use client';

import { RefObject, useRef } from 'react';
import { maxCountOfPlayers } from '../../constants/game-config.constants';
import {
    useCreatePendingGame,
    useDeletePendingGame,
    useJoinPendingGame,
    useLeavePendingGame,
    usePendingGames,
    useStartPendingGame,
} from '../../hooks/pending-games.hooks';
import { useSocketJoinLeavePendingGame } from '../../lib/socket.client';
import { PendingGame, PendingGames } from '../../models/pending-games.models';
import { getPlayerId } from '../../utils.ts/storage.utils';

const PendingGameComponent = ({
    authorId,
    gameName,
    gameId,
    authorLogin,
    createdDate,
    players,
}: PendingGame) => {
    const playerId = getPlayerId();

    const canDeletePendingGame = authorId === playerId;
    const canJoinPendingGame = authorId !== playerId;

    const deletePendingGame = useDeletePendingGame();
    const joinPendingGame = useJoinPendingGame();
    const startPendingGame = useStartPendingGame();

    return (
        <section>
            <b>game created:</b> {createdDate}
            <b>author login:</b> {authorLogin}
            <b>game name:</b> {gameName}
            <b>count of the players:</b> {players.length}/{maxCountOfPlayers}
            {canDeletePendingGame && (
                <section>
                    <button onClick={startPendingGame}>start the game</button>
                    <button onClick={() => deletePendingGame(gameId)}>
                        delete your own game
                    </button>
                </section>
            )}
            {canJoinPendingGame && (
                <button onClick={() => joinPendingGame(gameId)}>
                    join to the game
                </button>
            )}
        </section>
    );
};

const RefreshPendinGames = ({
    refreshPendingGames,
}: {
    refreshPendingGames: () => Promise<void>;
}) => <button onClick={refreshPendingGames}>refresh pending games</button>;

const PendingGamesComponent = () => {
    const { pendingGames, loading, refreshPendingGames } = usePendingGames();

    return (
        <section>
            <RefreshPendinGames
                refreshPendingGames={refreshPendingGames}
            ></RefreshPendinGames>
            <h3>pending games</h3>
            {loading ? (
                <b>loading...</b>
            ) : pendingGames.length ? (
                <ul>
                    {pendingGames.map((pendingGame: PendingGame) => (
                        <PendingGameComponent
                            key={pendingGame.gameId}
                            {...pendingGame}
                        ></PendingGameComponent>
                    ))}
                </ul>
            ) : (
                <b>no games found</b>
            )}
            <JoinedPendingGame pendingGames={pendingGames}></JoinedPendingGame>
        </section>
    );
};

const CreateGameWithName = () => {
    const gameNameRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <label>
                Please enter game name before to create it:
                <input type="text" ref={gameNameRef} />
            </label>
            <CreateGame gameNameRef={gameNameRef}></CreateGame>
        </>
    );
};

const JoinedPendingGame = ({
    pendingGames,
}: {
    pendingGames: PendingGames;
}) => {
    const pendingGame = useSocketJoinLeavePendingGame(pendingGames);
    return pendingGame ? (
        <JoinedGameDetails {...pendingGame}></JoinedGameDetails>
    ) : (
        <>you do not have joined to any game yet</>
    );
};

const JoinedGameDetails = ({
    authorId,
    gameName,
    players,
    gameId,
}: PendingGame) => {
    const playerId = getPlayerId();

    const leavePendingGame = useLeavePendingGame(gameId);
    const canLeavePendingGame = authorId !== playerId;

    return (
        <section>
            {canLeavePendingGame && (
                <button onClick={() => leavePendingGame()}>
                    leave the game
                </button>
            )}
            <p>
                <b>Game name:</b> {gameName}
            </p>
            <p>List of players</p>
            <ul>
                {players.map(({ playerLogin, playerId: gamePlayerId }) => (
                    <li key={gamePlayerId}>
                        <b>{playerLogin}</b>
                        {gamePlayerId === playerId ? '- it is you' : null}
                    </li>
                ))}
            </ul>
        </section>
    );
};

const CreateGame = ({
    gameNameRef,
}: {
    gameNameRef: RefObject<HTMLInputElement>;
}) => {
    const onClick = useCreatePendingGame(gameNameRef);
    return <button onClick={onClick}>create new game</button>;
};

const GameSearch = () => (
    <section>
        <CreateGameWithName></CreateGameWithName>
        <PendingGamesComponent></PendingGamesComponent>
    </section>
);

export default GameSearch;
