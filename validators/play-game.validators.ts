import { playGameBodySchema } from '../schemas/play-game.schemas';

import { QueryPlayGameArgs } from '../__generated__/resolvers-types';

export const playGameValidator = (body: QueryPlayGameArgs) =>
    playGameBodySchema.parse(body);
