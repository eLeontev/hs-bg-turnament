import { Flex } from '@mantine/core';

import { DeletePendingGame } from './delete-pending-game.component';
import { JoinPendingGame } from './join-pending-game.component';
import { PendingGameDetails } from './pending-game.details.component';

import { PendingGame } from '../../../models/pending-games.models';

import { getPlayerId } from '../../../utils.ts/storage.utils';

export type PendingGameProps = { key: string; pendingGame: PendingGame };

export const PendingGameComponent = ({ pendingGame }: PendingGameProps) => {
    const { authorId, gameId } = pendingGame;
    const isAuthor = authorId === getPlayerId();

    return (
        <Flex align="center">
            {isAuthor && (
                <DeletePendingGame gameId={gameId}></DeletePendingGame>
            )}
            {!isAuthor && <JoinPendingGame gameId={gameId}></JoinPendingGame>}
            <PendingGameDetails pendingGame={pendingGame}></PendingGameDetails>
        </Flex>
    );
};
