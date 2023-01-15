import { playGameBaseInputSchema } from '../schemas/play-game.schemas';

import { PlayGameBaseInput } from '../models/play-game/play-game.models';
import { GameId } from '../models/common.models';
import { MutationFn } from '../models/graphql.models';
import { StartPlayGameInput } from '../models/player.models';

import { PlayerIdInGameResponse } from '../__generated__/resolvers-types';

import {
    getGameId,
    getPlayerId,
    getPlayerIdInGame,
} from '../utils.ts/storage.utils';

export const getPlayGameVariables = (): PlayGameBaseInput =>
    playGameBaseInputSchema.parse({
        gameId: getGameId(),
        playerIdInGame: getPlayerIdInGame(),
    });
