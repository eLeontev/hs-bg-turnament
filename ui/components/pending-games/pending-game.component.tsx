import { Card, Flex } from '@mantine/core';

import { PairComponent } from '../pair.component';
import { PlayersCounter } from './players-counter.component';

import { useFormatDistance } from '../../../hooks/pending-games/pending-games.time.hooks';

import { PendingGame } from '../../../models/pending-games.models';

import { useStyles } from '../../styles/pending-games.styles';
import { getPlayerId } from '../../../utils.ts/storage.utils';
import { DeletePendingGame } from './delete-pending-game.component';
import { JoinPendingGame } from './join-pending-game.component';

export type PendingGameProps = { pendingGame: PendingGame; isInGame: boolean };

export const PendingGameComponent = ({
    pendingGame: {
        authorId,
        gameId,
        createdDate,
        authorLogin,
        gameName,
        players,
    },
    isInGame,
}: PendingGameProps) => {
    const dateDistance = useFormatDistance(createdDate);
    const { classes } = useStyles();

    const isAuthor = authorId === getPlayerId();

    return (
        <Card className={classes.pendingGame}>
            <Flex key={gameId} direction="row" justify="space-between">
                <PlayersCounter players={players}></PlayersCounter>
                <PairComponent
                    label="Author"
                    value={authorLogin}
                ></PairComponent>
                <PairComponent
                    label="Game name"
                    value={gameName}
                ></PairComponent>
                <PairComponent
                    label="Time created"
                    value={dateDistance}
                ></PairComponent>
                {isAuthor && (
                    <DeletePendingGame gameId={gameId}></DeletePendingGame>
                )}
                {!isAuthor && (
                    <JoinPendingGame
                        gameId={gameId}
                        isInGame={isInGame}
                    ></JoinPendingGame>
                )}
            </Flex>
        </Card>
    );
};
