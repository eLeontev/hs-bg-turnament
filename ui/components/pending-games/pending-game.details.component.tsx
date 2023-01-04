import { Card, Flex } from '@mantine/core';

import { PairComponent } from '../pair.component';
import { PlayersCounter } from './players-counter.component';

import { useFormatDistance } from '../../../hooks/pending-games/pending-games.time.hooks';

import { PendingGame } from '../../../models/pending-games.models';

import { useStyles } from '../../styles/pending-games.styles';

export type PendingGameDetailsProps = { pendingGame: PendingGame };

export const PendingGameDetails = ({
    pendingGame: { gameId, createdDate, authorLogin, gameName, players },
}: PendingGameDetailsProps) => {
    const dateDistance = useFormatDistance(createdDate);
    const { classes } = useStyles();

    return (
        <Card className={classes.pendingGameCard}>
            <Flex key={gameId} direction="row" justify="space-between">
                <PairComponent
                    label="Time created"
                    value={dateDistance}
                ></PairComponent>
                <PlayersCounter players={players}></PlayersCounter>
                <PairComponent
                    label="Author"
                    value={authorLogin}
                ></PairComponent>
                <PairComponent
                    label="Game name"
                    value={gameName}
                ></PairComponent>
            </Flex>
        </Card>
    );
};
