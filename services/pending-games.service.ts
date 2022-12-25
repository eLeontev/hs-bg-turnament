import { MutationFn } from '../models/graphql.models';
import {
    CreatePendingGameBody,
    DeletePendingGameBody,
} from '../models/pending-games.models';

import { getLogin, getPlayerId } from '../utils.ts/storage.utils';
import { Message } from '../__generated__/resolvers-types';

export const createPendingGame = (
    createPendingGameHandler: MutationFn<Message, CreatePendingGameBody>
) =>
    createPendingGameHandler({
        variables: {
            authorId: getPlayerId() as string,
            authorLogin: getLogin() as string,
        },
    });

export const deletePendingGame = (
    deletePendingGameHandler: MutationFn<Message, DeletePendingGameBody>
) =>
    deletePendingGameHandler({
        variables: {
            authorId: getPlayerId() as string,
        },
    });
