import {
    playGamePhases,
    PendingGamePlayer,
    PlayGamePlayer,
} from '@prisma/client';

import { getPlayerHeroIdsMap } from './play-game.hero.service';

import {
    getPlayGameOperation,
    selectPlayGamePlayerHeroOperation,
    startPlayGameOperation,
} from '../operations/play-game.operations';

import { playerKeySchema } from '../../player/player.schemas';
import { heroIdsSchema } from '../schemas/play-game.hero.schemas';

import { PlayGamePlayers } from '../../player/player.models';
import { GameId, PlayerIdInGame } from '../../../models/common.models';
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
            playGameGameId: gameId,
            selectedHeroId: null,
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

export const getPlayGamePlayerKey = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { players } = await getPlayGameOperation(gameId, playerIdInGame);

    const playerKey = players.find(
        (player) => player.playerIdInGame === playerIdInGame
    )?.playerKey;

    return playerKeySchema.parse(playerKey);
};

export const isSelectHeroPhaseValidator = (phase: playGamePhases) => {
    if (phase !== playGamePhases.heroSelection) {
        throw new Error('operation is not possible on this phase of game');
    }
};

export const getPlayGamePlayer = (
    players: PlayGamePlayers,
    playerIdInGame: PlayerIdInGame
) => {
    const playGamePlayer = players.find(
        (player) => player.playerIdInGame === playerIdInGame
    );

    if (!playGamePlayer) {
        throw new Error('the player not found');
    }

    return playGamePlayer;
};
export const isPlayerSelectedValidator = (playGamePlayer: PlayGamePlayer) => {
    if (playGamePlayer.selectedHeroId) {
        throw new Error('the hero already selected');
    }
};

export const getPlayerHeroIds = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { phase, players } = await getPlayGameOperation(
        gameId,
        playerIdInGame
    );

    const playGamePlayer = getPlayGamePlayer(players, playerIdInGame);

    isSelectHeroPhaseValidator(phase);
    isPlayerSelectedValidator(playGamePlayer);

    return playGamePlayer.heroIds;
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

    const playGamePlayer = getPlayGamePlayer(players, playerIdInGame);

    isSelectHeroPhaseValidator(phase);
    isPlayerSelectedValidator(playGamePlayer);

    await selectPlayGamePlayerHeroOperation(playerIdInGame, heroId);
};
