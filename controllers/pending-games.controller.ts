import {
    createPendingGame,
    deletePendingGame,
    getPendingGames,
    joinPendingGame,
    leavePendingGame,
    startPendingGame,
} from '../services/server/pending-game.server.service';

import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
    joinPendingGameBodyValidator,
    leavePendingGameBodyValidator,
    startPendingGameBodyValidator,
} from '../validators/pending-games.validators';

import { withErrorHandler, withoutParent } from '../utils.ts/resolver.utils';

import {
    Message,
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
    MutationJoinPendingGameRequestArgs,
    MutationLeavePendingGameRequestArgs,
    MutationStartPendingGameRequestArgs,
} from '../__generated__/resolvers-types';
import {
    pendingGameCreatedMessage,
    pendingGameDeletedMessage,
    pendingGameJoinMessage,
    pendingGameLeaveMessage,
    pendingGameStartMessage,
} from '../constants/pending-games.constants';
import { NextApiResponse } from 'next';
import { getSocket } from '../utils.ts/socket.utils';
import { startPlayGame } from '../services/server/play-game.service';
import { notifyPendingGames } from '../sockets/pending-games.notification.socket';

export const createPendingGameHandler = async (
    body: MutationCreatePendingGameRequestArgs,
    res: NextApiResponse
): Promise<Message> => {
    const createPendingGameBody = createPendingGameBodyValidator(body);
    await createPendingGame(createPendingGameBody);

    const socketServer = getSocket(res);
    notifyPendingGames(socketServer, getPendingGames());

    return pendingGameCreatedMessage;
};

export const deletePendingGameHandler = (
    body: MutationDeletePendingGameRequestArgs,
    res: NextApiResponse
): Message => {
    const deletePendingGameBody = deletePendingGameBodyValidator(body);
    deletePendingGame(deletePendingGameBody);

    const socketServer = getSocket(res);
    notifyPendingGames(socketServer, getPendingGames());

    return pendingGameDeletedMessage;
};

export const joinPendingGameHandler = (
    body: MutationJoinPendingGameRequestArgs,
    res: NextApiResponse
): Message => {
    const joinPendingGameBody = joinPendingGameBodyValidator(body);

    joinPendingGame(joinPendingGameBody);

    const socketServer = getSocket(res);
    notifyPendingGames(socketServer, getPendingGames());

    return pendingGameJoinMessage;
};

export const leavePendingGameHandler = (
    body: MutationLeavePendingGameRequestArgs,
    res: NextApiResponse
): Message => {
    const leavePendingGameBody = leavePendingGameBodyValidator(body);
    leavePendingGame(leavePendingGameBody);

    const socketServer = getSocket(res);
    notifyPendingGames(socketServer, getPendingGames());

    return pendingGameLeaveMessage;
};

export const startPendingGameHandler = (
    body: MutationStartPendingGameRequestArgs,
    res: NextApiResponse
) => {
    const startPendingGameBody = startPendingGameBodyValidator(body);
    const { gameId, players } = startPendingGame(startPendingGameBody);

    startPlayGame(gameId, players);

    const socketServer = getSocket(res);
    notifyPendingGames(socketServer, getPendingGames());

    return pendingGameStartMessage;
};

export const getPendingGamesRequest = getPendingGames;

export const createPendingGameRequest = withoutParent(
    withErrorHandler(createPendingGameHandler)
);
export const deletePendingGameRequest = withoutParent(
    withErrorHandler(deletePendingGameHandler)
);

export const joinPendingGameRequest = withoutParent(
    withErrorHandler(joinPendingGameHandler)
);
export const leavePendingGameRequest = withoutParent(
    withErrorHandler(leavePendingGameHandler)
);

export const startPendingGameRequest = withoutParent(
    withErrorHandler(startPendingGameHandler)
);
