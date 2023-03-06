import { Card, Flex } from '@mantine/core';

import { PairComponent } from '../../common/components/pair.component';
import { PlayersCounter } from './players-counter.component';
import {
    durationFormats,
    Timer,
} from '../../common/components/timer.component';
import { DeletePendingGame } from './delete-pending-game.component';
import { JoinPendingGame } from './join-pending-game.component';

import { useFormatDistance } from '../hooks/pending-games.time.hooks';

import { pendingGameLiveDurationInMs } from '../pending-games.constants';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

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
    const t = useI18nLabelTranslate();

    const dateDistance = useFormatDistance(createdDate);
    const { classes } = useStyles();

    const isAuthor = authorId === getPlayerId();

    return (
        <Card className={classes.pendingGame}>
            <Timer
                className={classes.timer}
                timeLeftUTC={createdDate}
                durationInMs={pendingGameLiveDurationInMs}
                durationFormat={durationFormats.minutes}
            ></Timer>
            <Flex key={gameId} direction="row" justify="space-between">
                <PlayersCounter players={players}></PlayersCounter>
                <PairComponent
                    label={t(labelI18nKeys.pendingGameAuthor)}
                    value={authorLogin}
                ></PairComponent>
                <PairComponent
                    label={t(labelI18nKeys.pendingGameGameName)}
                    value={gameName}
                ></PairComponent>
                <PairComponent
                    label={t(labelI18nKeys.pendingGameCreationTime)}
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
