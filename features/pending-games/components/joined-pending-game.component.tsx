import { ReactElement } from 'react';

import { Card, Flex, Space } from '@mantine/core';

import { JoinedPendingGamePlayers } from './joined-pending-game.players.component';
import { LeavePendingGame } from './leave-pending-game.component';
import { StartPendingGame } from './start-pending-game.component';
import { PlayersCounter } from './players-counter.component';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerKeys,
} from '../../common/sockets/online-game.socket.hooks';
import { useSetPendingGameId } from '../hooks/pending-games.hooks';

import { PendingGame, PendingGames } from '../pending-games.models';
import { PublicPlayer } from '../../player/player.models';

import { getPlayerId, getPlayerKey } from '../../../utils.ts/storage.utils';
import { DeletePendingGame } from './delete-pending-game.component';
import { GameId } from '../../../models/common.models';

export type JoinedPendingGameContainerProps = { pendingGames: PendingGames };
export type JoinedPendingGameProps = { pendingGame: PendingGame };

const getJoinedPendingGame = (pendingGames: PendingGames) =>
    pendingGames.find(({ players }: PendingGame) =>
        players.some(
            ({ playerKey }: PublicPlayer) => playerKey === getPlayerKey()
        )
    );

export const JoinedPendingGameContainer = ({
    pendingGames,
}: JoinedPendingGameContainerProps) => {
    const joinedPendingGame = getJoinedPendingGame(pendingGames);

    return joinedPendingGame ? (
        <JoinedPendingGame pendingGame={joinedPendingGame}></JoinedPendingGame>
    ) : null;
};

export type AuthorActionsProps = {
    isAuthor: boolean;
    gameId: GameId;
    children: ReactElement;
};

export const AuthorActions = ({
    isAuthor,
    gameId,
    children,
}: AuthorActionsProps) => (
    <>
        {isAuthor && <DeletePendingGame gameId={gameId}></DeletePendingGame>}
        {children}
        {isAuthor && <StartPendingGame gameId={gameId}></StartPendingGame>}
    </>
);

export const JoinedPendingGame = ({ pendingGame }: JoinedPendingGameProps) => {
    const { authorId, gameId, players } = pendingGame;

    useOnlineGameSocketRoom(gameId);
    useSetPendingGameId(gameId);
    useOnlinePlayerKeys();

    const isAuthor = authorId === getPlayerId();

    return (
        <Flex direction="column">
            <Card>
                <Flex align="center" justify="space-between">
                    <AuthorActions isAuthor={isAuthor} gameId={gameId}>
                        <PlayersCounter players={players}></PlayersCounter>
                    </AuthorActions>
                    {!isAuthor && (
                        <LeavePendingGame gameId={gameId}></LeavePendingGame>
                    )}
                </Flex>
            </Card>
            <Space h="md"></Space>
            <JoinedPendingGamePlayers
                players={pendingGame.players}
            ></JoinedPendingGamePlayers>
        </Flex>
    );
};
