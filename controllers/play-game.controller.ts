import { NextApiResponse } from 'next';
import { playGamePhases } from '@prisma/client';

import {
    getPlayGame,
    startPlayGame,
} from '../services/server/play-game.service';
import {
    getPendingGames,
    deletePendingGame,
} from '../services/server/pending-game.server.service';
import { cancelDeletePendingGame } from '../services/pending-games.scheduled.service';

import {
    playGameValidator,
    startPlayGameBodyValidator,
} from '../validators/play-game.validators';

import {
    notifyOnlinePlayersPlayGameStarted,
    notifyPlayersInPlayGame,
} from '../sockets/play-game.notification.socket';
import { notifyPendingGames } from '../sockets/pending-games.notification.socket';

import { pendingGameStartMessage } from '../constants/pending-games.constants';

import { playGameActions } from '../enums/play-game.enums';

import {
    MutationStartPlayGameRequestArgs,
    QueryPlayGameArgs,
} from '../__generated__/resolvers-types';

import { withoutParent, withErrorHandler } from '../utils.ts/resolver.utils';
import { getSocket } from '../utils.ts/socket.utils';

const getPlayGameHandler = (playGameBody: QueryPlayGameArgs) => {
    const body = playGameValidator(playGameBody);
    return getPlayGame(body);
};

const startPlayGameHandler = async (
    body: MutationStartPlayGameRequestArgs,
    res: NextApiResponse
) => {
    const startPlayGameBody = startPlayGameBodyValidator(body);
    const { gameId, players } = await deletePendingGame(startPlayGameBody);

    await startPlayGame(gameId, players);

    const io = getSocket(res);
    notifyOnlinePlayersPlayGameStarted(io, startPlayGameBody.gameId);
    notifyPendingGames(io, getPendingGames());
    cancelDeletePendingGame(gameId);

    // TODO: remove after check
    setTimeout(() => {
        notifyPlayersInPlayGame(io, gameId, {
            action: playGameActions.phaseChangedTo,
            payload: { type: playGamePhases.heroSelection, duration: 20000 },
        });
    }, 10000);

    return pendingGameStartMessage;
};

export const getPlayGameRequest = withoutParent(
    withErrorHandler(getPlayGameHandler)
);

export const startPlayGameRequest = withoutParent(
    withErrorHandler(startPlayGameHandler)
);
