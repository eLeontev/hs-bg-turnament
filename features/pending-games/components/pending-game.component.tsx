import { Card, Flex } from '@mantine/core';

import { PairComponent } from '../../common/components/pair.component';
import { PlayersCounter } from './players-counter.component';
import { Timer } from '../../common/components/timer.component';
import { DeletePendingGame } from './delete-pending-game.component';
import { JoinPendingGame } from './join-pending-game.component';

import { useFormatDistance } from '../hooks/pending-games.time.hooks';

import { pendginGameLiveDurationInMs } from '../pending-games.constants';

import { PendingGame } from '../pending-games.models';

import { useStyles } from './styles/pending-games.styles';

import { getPlayerId } from '../../../utils.ts/storage.utils';

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
            <Timer
                className={classes.timer}
                timeLeftUTC={createdDate}
                durationInMs={pendginGameLiveDurationInMs}
            ></Timer>
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
