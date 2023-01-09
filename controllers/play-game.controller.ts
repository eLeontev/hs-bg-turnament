import { getPlayGame } from '../services/server/play-game.service';

import { playGameValidator } from '../validators/play-game.validators';

import { withoutParent, withErrorHandler } from '../utils.ts/resolver.utils';

import { QueryPlayGameArgs } from '../__generated__/resolvers-types';

const getPlayGameHandler = (playGameBody: QueryPlayGameArgs) => {
    const body = playGameValidator(playGameBody);
    return getPlayGame(body);
};

export const getPlayGameRequest = withoutParent(
    withErrorHandler(getPlayGameHandler)
);
