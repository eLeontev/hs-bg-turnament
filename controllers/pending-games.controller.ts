import {
    createPendingGame,
    deletePendingGame,
    getPendingGames,
} from '../services/server/pending-game.server.service';

import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
} from '../validators/pending-games.validators';

import { withErrorHandler, withoutParent } from '../utils.ts/resolver.utils';

import {
    Message,
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
} from '../__generated__/resolvers-types';
import {
    pendingGameCreatedMessage,
    pendingGameDeletedMessage,
} from '../constants/pending-games.constants';
import { NextApiResponse } from 'next';
import { getSocket } from '../utils.ts/socket.utils';
import { notifyPendingGames } from '../services/server/socket-notification.server.service';

export const createPendingGameHandler = async (
    body: MutationCreatePendingGameRequestArgs,
    res: NextApiResponse
): Promise<Message> => {
    const createPendingGameBody = createPendingGameBodyValidator(body);
    await createPendingGame(createPendingGameBody);
    notifyPendingGames(getSocket(res), getPendingGames());

    return pendingGameCreatedMessage;
};

export const deletePendingGameHandler = (
    body: MutationDeletePendingGameRequestArgs,
    res: NextApiResponse
): Message => {
    const deletePendingGameBody = deletePendingGameBodyValidator(body);
    deletePendingGame(deletePendingGameBody);
    notifyPendingGames(getSocket(res), getPendingGames());

    return pendingGameDeletedMessage;
};

export const getPendingGamesRequest = getPendingGames;
export const createPendingGameRequest = withoutParent(
    withErrorHandler(createPendingGameHandler)
);
export const deletePendingGameRequest = withoutParent(
    withErrorHandler(deletePendingGameHandler)
);
