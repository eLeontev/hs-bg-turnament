import { NextApiResponse } from 'next';

import {
    createPendingGame,
    deletePendingGame,
    getPendingGames,
    joinPendingGame,
    leavePendingGame,
} from './services/pending-game.server.service';

import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
    joinPendingGameBodyValidator,
    leavePendingGameBodyValidator,
} from './pending-games.validators';

import { withErrorHandler, withoutParent } from '../../utils.ts/resolver.utils';

import {
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
    MutationJoinPendingGameRequestArgs,
    MutationLeavePendingGameRequestArgs,
} from '../../__generated__/resolvers-types';
import {
    pendingGameDeletedMessage,
    pendingGameLeaveMessage,
} from './pending-games.constants';

import { notifyPendingGames } from './sockets/pending-games.notification.socket';

import { Message, PlayerIdInGameResponse } from '../../models/graphql.models';

import { getSocket } from '../../utils.ts/socket.utils';
import {
    cancelDeletePendingGame,
    schedulePendingGameDelition,
} from './services/pending-games.scheduled.service';

export const createPendingGameHandler = async (
    body: MutationCreatePendingGameRequestArgs,
    res: NextApiResponse
): Promise<PlayerIdInGameResponse> => {
    const createPendingGameBody = createPendingGameBodyValidator(body);
    const { playerIdInGame, gameId, playerKey } = await createPendingGame(
        createPendingGameBody
    );

    const io = getSocket(res);
    notifyPendingGames(io, getPendingGames());
    schedulePendingGameDelition(io, createPendingGameBody.playerId, gameId);

    return { playerIdInGame, playerKey };
};

export const deletePendingGameHandler = async (
    body: MutationDeletePendingGameRequestArgs,
    res: NextApiResponse
): Promise<Message> => {
    const deletePendingGameBody = deletePendingGameBodyValidator(body);

    await deletePendingGame(deletePendingGameBody);

    const io = getSocket(res);
    notifyPendingGames(io, getPendingGames());
    cancelDeletePendingGame(deletePendingGameBody.gameId);

    return pendingGameDeletedMessage;
};

export const joinPendingGameHandler = async (
    body: MutationJoinPendingGameRequestArgs,
    res: NextApiResponse
): Promise<PlayerIdInGameResponse> => {
    const joinPendingGameBody = joinPendingGameBodyValidator(body);

    const { playerIdInGame, playerKey } = await joinPendingGame(
        joinPendingGameBody
    );

    const io = getSocket(res);
    notifyPendingGames(io, getPendingGames());

    return { playerIdInGame, playerKey };
};

export const leavePendingGameHandler = async (
    body: MutationLeavePendingGameRequestArgs,
    res: NextApiResponse
): Promise<Message> => {
    const leavePendingGameBody = leavePendingGameBodyValidator(body);
    await leavePendingGame(leavePendingGameBody);

    const io = getSocket(res);
    notifyPendingGames(io, getPendingGames());

    return pendingGameLeaveMessage;
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
