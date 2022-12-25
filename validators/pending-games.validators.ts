import {
    createPendingGameBody,
    CreatePendingGameBody,
    DeletePendingGameBody,
    deletePendingGameBody,
} from '../models/pending-games.models';

import {
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
} from '../__generated__/resolvers-types';

export const createPendingGameBodyValidator = (
    body: MutationCreatePendingGameRequestArgs
): CreatePendingGameBody => createPendingGameBody.parse(body);

export const deletePendingGameBodyValidator = (
    body: MutationDeletePendingGameRequestArgs
): DeletePendingGameBody => deletePendingGameBody.parse(body);
