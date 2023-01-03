import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
    joinPendingGameBodyValidator,
    leavePendingGameBodyValidator,
    startPendingGameBodyValidator,
} from '../validators/pending-games.validators';

import { pendingGameNameErrorMessage } from '../constants/pending-games.constants';

import { gameNameSchema } from '../schemas/pending-games.schemas';

import { MutationFn } from '../models/graphql.models';
import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    JoinPendingGameBody,
    LeavePendingGameBody,
    StartPendingGameBody,
} from '../models/pending-games.models';

import { getPlayerId, getLogin } from '../utils.ts/storage.utils';

import { Message } from '../__generated__/resolvers-types';

export const createPendingGame = (
    createPendingGameHandler: MutationFn<Message, CreatePendingGameBody>,
    gameName: string
) =>
    createPendingGameHandler({
        variables: createPendingGameBodyValidator({
            gameName,
            playerId: getPlayerId(),
            playerLogin: getLogin(),
        }),
    });

export const deletePendingGame = (
    deletePendingGameHandler: MutationFn<Message, DeletePendingGameBody>,
    gameId: string
) =>
    deletePendingGameHandler({
        variables: deletePendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
        }),
    });

export const joinPendingGame = (
    joinPendingGameHandler: MutationFn<Message, JoinPendingGameBody>,
    gameId: string
) =>
    joinPendingGameHandler({
        variables: joinPendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
            playerLogin: getLogin(),
        }),
    });

export const leavePendingGame = (
    leavePendingGameHandler: MutationFn<Message, LeavePendingGameBody>,
    gameId: string
) =>
    leavePendingGameHandler({
        variables: leavePendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
        }),
    });

export const startPendingGame = (
    startPendingGameHandler: MutationFn<Message, StartPendingGameBody>,
    gameId: string
) =>
    startPendingGameHandler({
        variables: startPendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
        }),
    });

export const createPendingGameValidator = (value: string) =>
    gameNameSchema.safeParse(value.trim()).success
        ? null
        : pendingGameNameErrorMessage;
