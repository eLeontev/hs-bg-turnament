import { initPlayGameBodySchema } from '../schemas/play-game.schemas';
import { QueryInitPlayGameRequestArgs } from '../__generated__/resolvers-types';

export const initPlayGameValidator = (body: QueryInitPlayGameRequestArgs) =>
    initPlayGameBodySchema.parse(body);
