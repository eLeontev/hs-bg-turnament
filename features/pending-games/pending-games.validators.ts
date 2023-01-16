import {
    CreatePendingGameBody,
    DeletePendingGameBody,
} from './pending-games.models';

import {
    createPendingGameBodySchema,
    deletePendingGameBodySchema,
    joinPendingGameBodySchema,
    leavePendingGameBodySchema,
} from './pending-games.schemas';

import {
    MutationCreatePendingGameRequestArgs,
    MutationDeletePendingGameRequestArgs,
    MutationJoinPendingGameRequestArgs,
    MutationLeavePendingGameRequestArgs,
} from '../../__generated__/resolvers-types';

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
