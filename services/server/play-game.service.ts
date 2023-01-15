import { heroIds, playGamePhases } from '@prisma/client';

import {
    getPlayGameOperation,
    selectPlayGamePlayerHeroOperation,
    startPlayGameOperation,
} from '../../prisma/operations/play-game';

import { GameId } from '../../models/common.models';
import {
    PlayGameBaseInput,
    PlayGameSelectHeroInput,
} from '../../models/play-game/play-game.models';

import { PendingGamePlayer } from '@prisma/client';
import { getHashesFromValues } from '../../utils.ts/hash-server.utils';
import { PlayGamePlayer } from '../../models/player.models';

export const startPlayGame = async (
    gameId: GameId,
    pendingGamePlayers: Array<PendingGamePlayer>
) => {
    const playGamePlayers = pendingGamePlayers.map(
        ({ playerLogin, playerIdInGame }) => ({
            playerIdInGame,
            playerLogin,
            heroIds: [heroIds.afkay, heroIds.alexstrasza, heroIds.alkair], // TODO! add logic
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

    const hashesFromPlayerIdsInGame = await getHashesFromValues(
        players.map(({ playerIdInGame }) => playerIdInGame)
    );

    return {
        ...rest,
        players: players.map(({ playerLogin, playerIdInGame }) => ({
            playerLogin,
            key: hashesFromPlayerIdsInGame.get(playerIdInGame) || '',
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
        (player) => player.playGameGameId === playerIdInGame
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

    const { selectedHeroId, heroIds } = players.find(
        (player) => player.playGameGameId === playerIdInGame
    ) as PlayGamePlayer;

    if (selectedHeroId) {
        throw new Error('the hero already selected');
    }

    await selectPlayGamePlayerHeroOperation(playerIdInGame, heroId);
};
