'use client';

import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';

import { maxCountOfPlayers } from '../../constants/game-config.constants';
import { usePendingGames } from '../../hooks/pending-games.hook';
import { PendingGame } from '../../models/pending-games.models';
import { createPendingGame } from '../../services/pending-games.service';
import { getPlayerId } from '../../utils.ts/storage.utils';

// TODO:switch to mutations
const PendingGameComponent = ({
    authorId,
    authorLogin,
    createdDate,
    countOfPlayers,
}: PendingGame) => {
    const canDeletePendingGame = authorId === getPlayerId();

    return (
        <section>
            <b>game created:</b> {createdDate}
            <b>author login:</b> {authorLogin}
            <b>count of the players:</b> {countOfPlayers}/{maxCountOfPlayers}
            {canDeletePendingGame && (
                <button onClick={() => {}}>delete your own game</button>
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

const CreateGame = () => {
    const onClick = async () => {
        await createPendingGame();
        alert('new game has been created');
    };

    return <button onClick={onClick}>create new game</button>;
};

const GameSearch = () => (
    <section>
        <CreateGame></CreateGame>
        <PendingGamesComponent></PendingGamesComponent>
    </section>
);

export default GameSearch;
