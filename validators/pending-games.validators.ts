import {
    CreatePendingGameBody,
    DeletePendingGameBody,
} from '../models/pending-games.models';

import {
    createPendingGameBodySchema,
    deletePendingGameBodySchema,
} from '../schemas/pending-games.schemas';

import {
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
} from '../__generated__/resolvers-types';

export const createPendingGameBodyValidator = (
    body: MutationCreatePendingGameRequestArgs
): CreatePendingGameBody => createPendingGameBodySchema.parse(body);

export const deletePendingGameBodyValidator = (
    body: MutationDeletePendingGameRequestArgs
): DeletePendingGameBody => deletePendingGameBodySchema.parse(body);
