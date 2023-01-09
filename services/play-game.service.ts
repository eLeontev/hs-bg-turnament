import { playGameBodySchema } from '../schemas/play-game.schemas';

import { PlayGameBody } from '../models/play-game.models';

import { getGameId, getPlayerIdInGame } from '../utils.ts/storage.utils';

export const getPlayGameVariables = (): PlayGameBody =>
    playGameBodySchema.parse({
        gameId: getGameId(),
        playerId: getPlayerIdInGame(),
    });
