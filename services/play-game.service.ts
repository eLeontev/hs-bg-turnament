import { startPlayGameBodyValidator } from '../validators/play-game.validators';

import { playGameBodySchema } from '../schemas/play-game.schemas';

import { PlayGameBody } from '../models/play-game.models';
import { GameId } from '../models/common.models';
import { MutationFn } from '../models/graphql.models';
import { StartPlayGameBody } from '../models/player.models';

import { PlayerIdInGameResponse } from '../__generated__/resolvers-types';

import {
    getGameId,
    getPlayerId,
    getPlayerIdInGame,
} from '../utils.ts/storage.utils';

export const getPlayGameVariables = (): PlayGameBody =>
    playGameBodySchema.parse({
        gameId: getGameId(),
        playerIdInGame: getPlayerIdInGame(),
    });

export const startPlayGame = (
    startPlayGameHandler: MutationFn<PlayerIdInGameResponse, StartPlayGameBody>,
    gameId: GameId
) =>
    startPlayGameHandler({
        variables: startPlayGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
        }),
    });
