import { Flex, Space } from '@mantine/core';

import { JoinedPendingGamePlayers } from './joined-pending-game.players.component';
import { LeavePendingGame } from './leave-pending-game.component';
import { StartPendingGame } from './start-pending-game.component';
import { PlayersCounter } from './players-counter.component';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerIds,
} from '../../../hooks/online-game.socket.hooks';

import {
    PendingGame,
    PendingGames,
} from '../../../models/pending-games.models';
import { Player } from '../../../models/player-id.models';

import { getPlayerId } from '../../../utils.ts/storage.utils';
import { DeletePendingGame } from './delete-pending-game.component';
import { GameId } from '../../../models/common.models';
import { ReactElement } from 'react';

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
    useOnlineGameSocketRoom(pendingGame.gameId);
    const onlinePlayerIds = useOnlinePlayerIds();

    const { authorId, gameId, players } = pendingGame;
    const isAuthor = authorId === getPlayerId();

    return (
        <Flex direction="column">
            <Flex align="center" justify="space-between">
                <AuthorActions isAuthor={isAuthor} gameId={gameId}>
                    <PlayersCounter players={players}></PlayersCounter>
                </AuthorActions>
                {!isAuthor && (
                    <LeavePendingGame gameId={gameId}></LeavePendingGame>
                )}
            </Flex>
            <Space h="xl"></Space>
            <JoinedPendingGamePlayers
                onlinePlayerIds={onlinePlayerIds}
                players={pendingGame.players}
            ></JoinedPendingGamePlayers>
        </Flex>
    );
};
