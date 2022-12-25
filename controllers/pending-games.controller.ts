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

export const createPendingGameHandler = async (
    body: MutationCreatePendingGameRequestArgs
): Promise<Message> => {
    const createPendingGameBody = createPendingGameBodyValidator(body);
    await createPendingGame(createPendingGameBody);

    return pendingGameCreatedMessage;
};

export const deletePendingGameHandler = (
    body: MutationDeletePendingGameRequestArgs
): Message => {
    const deletePendingGameBody = deletePendingGameBodyValidator(body);
    deletePendingGame(deletePendingGameBody);

    return pendingGameDeletedMessage;
};

export const getPendingGamesRequest = getPendingGames;
export const createPendingGameRequest = withoutParent(
    withErrorHandler(createPendingGameHandler)
);
export const deletePendingGameRequest = withoutParent(
    withErrorHandler(deletePendingGameHandler)
);
