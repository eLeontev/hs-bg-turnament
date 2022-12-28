import { InitPlayGameVariables } from '../models/init-play-game.models';
import { initPlayGameBodySchema } from '../schemas/play-game.schemas';
import {
    getGameId,
    getPlayerId,
    getPrivatePlayerId,
} from '../utils.ts/storage.utils';

export const getInitPlayGameVariables = ():
    | InitPlayGameVariables
    | undefined => {
    const res = initPlayGameBodySchema.safeParse({
        gameId: getGameId(),
        playerId: getPlayerId(),
        privatePlayerId: getPrivatePlayerId(),
    });

    return res.success ? { variables: res.data } : undefined;
};
