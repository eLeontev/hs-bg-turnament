import { playGameBodySchema } from '../schemas/play-game.schemas';

import { QueryPlayGamePhaseArgs } from '../__generated__/resolvers-types';

export const playGameValidator = (body: QueryPlayGamePhaseArgs) =>
    playGameBodySchema.parse(body);
