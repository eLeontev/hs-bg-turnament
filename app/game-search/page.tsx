'use client';

import { RefObject, useRef } from 'react';
import { maxCountOfPlayers } from '../../constants/game-config.constants';
import {
    useCreatePendingGame,
    useDeletePendingGame,
    usePendingGames,
} from '../../hooks/pending-games.hooks';
import { PendingGame } from '../../models/pending-games.models';
import { getPlayerId } from '../../utils.ts/storage.utils';

const PendingGameComponent = ({
    authorId,
    gameName,
    authorLogin,
    createdDate,
    countOfPlayers,
}: PendingGame) => {
    const canDeletePendingGame = authorId === getPlayerId();
    const onClick = useDeletePendingGame();

    return (
        <section>
            <b>game created:</b> {createdDate}
            <b>author login:</b> {authorLogin}
            <b>game name:</b> {gameName}
            <b>count of the players:</b> {countOfPlayers}/{maxCountOfPlayers}
            {canDeletePendingGame && (
                <button onClick={() => onClick()}>delete your own game</button>
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
