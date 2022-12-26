import { MutationFn } from '../models/graphql.models';
import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    PendingGameMutationConfig,
} from '../models/pending-games.models';

import { getLogin, getPlayerId } from '../utils.ts/storage.utils';
import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
} from '../validators/pending-games.validators';

import { Message } from '../__generated__/resolvers-types';

export const createPendingGame = (
    createPendingGameHandler: MutationFn<Message, CreatePendingGameBody>,
    config: PendingGameMutationConfig<CreatePendingGameBody> | undefined
) =>
    createPendingGameHandler({
        variables: createPendingGameBodyValidator({
            ...config,
            authorId: getPlayerId(),
            authorLogin: getLogin(),
        }),
    });

export const deletePendingGame = (
    deletePendingGameHandler: MutationFn<Message, DeletePendingGameBody>
) =>
    deletePendingGameHandler({
        variables: deletePendingGameBodyValidator({ authorId: getPlayerId() }),
    });
