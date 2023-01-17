import { playGamePhases, PendingGamePlayer } from '@prisma/client';

import { getPlayerHeroIdsMap } from './play-game.hero.service';

import {
    getPlayGameOperation,
    selectPlayGamePlayerHeroOperation,
    startPlayGameOperation,
} from '../operations/play-game.operations';

import { playerKeySchema } from '../../player/player.schemas';
import { heroIdsSchema } from '../schemas/play-game.hero.schemas';

import { PlayGamePlayer } from '../../player/player.models';
import { GameId } from '../../../models/common.models';
import {
    PlayGameBaseInput,
    PlayGameSelectHeroInput,
} from '../models/play-game.models';

import { getHashesFromValues } from '../../../utils.ts/hash-server.utils';

export const startPlayGame = async (
    gameId: GameId,
    pendingGamePlayers: Array<PendingGamePlayer>
) => {
    const playerIdsInGame = pendingGamePlayers.map(
        ({ playerIdInGame }) => playerIdInGame
    );

    const hashesFromPlayerIdsInGame = await getHashesFromValues(
        playerIdsInGame
    );
    const playerHeroIdsMap = getPlayerHeroIdsMap(playerIdsInGame);

    const playGamePlayers = pendingGamePlayers.map(
        ({ playerLogin, playerIdInGame }) => ({
            playerIdInGame,
            playerLogin,
            playerKey: playerKeySchema.parse(
                hashesFromPlayerIdsInGame.get(playerIdInGame)
            ),
            heroIds: heroIdsSchema.parse(playerHeroIdsMap.get(playerIdInGame)),
        })
    );

    await startPlayGameOperation(gameId, playGamePlayers, {
        phase: playGamePhases.heroSelection,
    });
};

export const getPlayGame = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { players, ...rest } = await getPlayGameOperation(
        gameId,
        playerIdInGame
    );

    return {
        ...rest,
        players: players.map(({ playerLogin, playerKey, selectedHeroId }) => ({
            playerLogin,
            playerKey,
            selectedHeroId,
        })),
    };
};

export const getPlayerHeroIds = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { phase, players } = await getPlayGameOperation(
        gameId,
        playerIdInGame
    );

    if (phase !== playGamePhases.heroSelection) {
        throw new Error('opeartion is not possible on this phase of game');
    }

    const { selectedHeroId, heroIds } = players.find(
        (player) => player.playerIdInGame === playerIdInGame
    ) as PlayGamePlayer;

    if (selectedHeroId) {
        throw new Error('the hero already selected');
    }

    return heroIds;
};

export const selectPlayGamePlayerHero = async ({
    gameId,
    playerIdInGame,
    heroId,
}: PlayGameSelectHeroInput) => {
    const { phase, players } = await getPlayGameOperation(
        gameId,
        playerIdInGame
    );

    if (phase !== playGamePhases.heroSelection) {
        throw new Error('opeartion is not possible on this phase of game');
    }

    const { selectedHeroId } = players.find(
        (player) => player.playerIdInGame === playerIdInGame
    ) as PlayGamePlayer;

    if (selectedHeroId) {
        throw new Error('the hero already selected');
    }

    await selectPlayGamePlayerHeroOperation(playerIdInGame, heroId);
};
