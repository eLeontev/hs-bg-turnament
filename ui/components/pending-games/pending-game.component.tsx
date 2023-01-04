import { Flex } from '@mantine/core';

import { DeletePendingGame } from './delete-pending-game.component';
import { JoinPendingGame } from './join-pending-game.component';
import { PendingGameDetails } from './pending-game.details.component';

import { PendingGame } from '../../../models/pending-games.models';

import { getPlayerId } from '../../../utils.ts/storage.utils';

import { useStyles } from '../../styles/pending-games.styles';

export type PendingGameProps = { key: string; pendingGame: PendingGame };

export const PendingGameComponent = ({ pendingGame }: PendingGameProps) => {
    const { classes } = useStyles();

    const { authorId, gameId } = pendingGame;
    const isAuthor = authorId === getPlayerId();

    return (
        <Flex className={classes.pendingGame}>
            {isAuthor && (
                <DeletePendingGame gameId={gameId}></DeletePendingGame>
            )}
            {!isAuthor && <JoinPendingGame gameId={gameId}></JoinPendingGame>}
            <PendingGameDetails pendingGame={pendingGame}></PendingGameDetails>
        </Flex>
    );
};
