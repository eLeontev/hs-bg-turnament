import { initPlayGameMessage } from '../constants/play-game.constants';
import { initPlayGame } from '../services/server/play-game.service';
import { withoutParent, withErrorHandler } from '../utils.ts/resolver.utils';
import { initPlayGameValidator } from '../validators/play-game.validators';
import { QueryInitPlayGameRequestArgs } from '../__generated__/resolvers-types';

const initPlayGameHandler = (body: QueryInitPlayGameRequestArgs) => {
    const initPlayGameBody = initPlayGameValidator(body);
    initPlayGame(initPlayGameBody);

    return initPlayGameMessage;
};

export const initPlayGameRequest = withoutParent(
    withErrorHandler(initPlayGameHandler)
);
