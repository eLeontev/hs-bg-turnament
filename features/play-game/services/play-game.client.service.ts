import { playGameBaseInputSchema } from '../schemas/play-game.schemas';

import {
    PlayGameBaseInput,
    PlayGameDetailsPlayers,
    PlayGamePlayerWithSelectedHeroId,
} from '../models/play-game.models';

import { getGameId, getPlayerIdInGame } from '../../../utils.ts/storage.utils';

export const getPlayGameVariables = (): PlayGameBaseInput =>
    playGameBaseInputSchema.parse({
        gameId: getGameId(),
        playerIdInGame: getPlayerIdInGame(),
    });

export const formSelectedHeroIds = (players: PlayGameDetailsPlayers) =>
    new Map(
        players
            .filter((player): player is PlayGamePlayerWithSelectedHeroId =>
                Boolean(player.selectedHeroId)
            )
            .map(({ playerKey, selectedHeroId }) => [playerKey, selectedHeroId])
    );
