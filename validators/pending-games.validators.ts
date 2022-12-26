import {
    CreatePendingGameBody,
    DeletePendingGameBody,
} from '../models/pending-games.models';

import {
    createPendingGameBodySchema,
    deletePendingGameBodySchema,
    joinPendingGameBodySchema,
    leavePendingGameBodySchema,
    startPendingGameBodySchema,
} from '../schemas/pending-games.schemas';

import {
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
    MutationJoinPendingGameRequestArgs,
    MutationLeavePendingGameRequestArgs,
    MutationStartPendingGameRequestArgs,
} from '../__generated__/resolvers-types';

export const createPendingGameBodyValidator = (
    body: MutationCreatePendingGameRequestArgs
): CreatePendingGameBody => createPendingGameBodySchema.parse(body);

export const deletePendingGameBodyValidator = (
    body: MutationDeletePendingGameRequestArgs
): DeletePendingGameBody => deletePendingGameBodySchema.parse(body);

export const joinPendingGameBodyValidator = (
    body: MutationJoinPendingGameRequestArgs
) => joinPendingGameBodySchema.parse(body);

export const leavePendingGameBodyValidator = (
    body: MutationLeavePendingGameRequestArgs
) => leavePendingGameBodySchema.parse(body);

export const startPendingGameBodyValidator = (
    body: MutationStartPendingGameRequestArgs
) => startPendingGameBodySchema.parse(body);
