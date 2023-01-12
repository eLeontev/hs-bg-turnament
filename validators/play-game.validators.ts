import {
    playGameBodySchema,
    startPlayGameBodySchema,
} from '../schemas/play-game.schemas';

import {
    MutationStartPlayGameRequestArgs,
    QueryPlayGameArgs,
} from '../__generated__/resolvers-types';

export const playGameValidator = (body: QueryPlayGameArgs) =>
    playGameBodySchema.parse(body);

export const startPlayGameBodyValidator = (
    body: MutationStartPlayGameRequestArgs
) => startPlayGameBodySchema.parse(body);
