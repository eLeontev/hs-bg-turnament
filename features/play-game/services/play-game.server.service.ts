import { playGamePhases, PendingGamePlayer, Card } from '@prisma/client';

import { getPlayerHeroIdsMap } from './play-game.hero.service';
import { getPhaseData } from './play-game.phase.service';
import {
    getAvailableMinions,
    getSelectedMinionTypes,
} from './play-game.select-minion-types.service';

import {
    getCardsOperation,
    getPlayGameOperation,
    getPlayGamePlayerOperation,
    selectPlayGamePlayerHeroOperation,
    startPlayGameOperation,
} from '../operations/play-game.operations';

import { playerKeySchema } from '../../player/player.schemas';
import { heroIdsSchema } from '../schemas/play-game.hero.schemas';

import { initialRound } from '../../../constants/play-game.config.constants';

import {
    PlayGamePlayer,
    PlayGamePlayerData,
    PlayGamePlayers,
    PlayGamePlayerWithCards,
} from '../../player/player.models';
import { GameId, PlayerIdInGame } from '../../../models/common.models';
import { PlayGameBaseInput } from '../models/play-game.models';
import { SelectHeroPlayerInput } from '../models/play-game.player-actions.models';

import { getHashesFromValues } from '../../../utils.ts/hash-server.utils';
import { dateInUtcString } from '../../../utils.ts/date.utils';
import { initPlayGamePlayer } from './play-game.player.service';

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
        ({ playerLogin, playerIdInGame }) =>
            initPlayGamePlayer({
                playerLogin,
                playerIdInGame,
                playerKey: playerKeySchema.parse(
                    hashesFromPlayerIdsInGame.get(playerIdInGame)
                ),
                heroIds: heroIdsSchema.parse(
                    playerHeroIdsMap.get(playerIdInGame)
                ),
            })
    );

    const phaseData = getPhaseData(
        playGamePhases.heroSelection,
        dateInUtcString(),
        initialRound
    );

    const minionTypes = getSelectedMinionTypes();
    const availableCards = await getAvailableMinions(minionTypes);

    await startPlayGameOperation(gameId, playGamePlayers, {
        ...phaseData,
        minionTypes,
        availableCards,
        round: initialRound,
    });

    return phaseData;
};

export const getPlayerAndAwailableCards = async (
    { gameId, playerIdInGame }: PlayGameBaseInput,
    withAvailableCards?: boolean
) => {
    const { players, availableCards } = await getPlayGameOperation(
        gameId,
        withAvailableCards
    );

    const player = isPlayerInGameValidator(players, playerIdInGame);

    return { player, availableCards };
};

export const getPlayGame = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { players, ...rest } = await getPlayGameOperation(gameId);

    isPlayerInGameValidator(players, playerIdInGame);

    return {
        ...rest,
        playerKey: getPlayGamePlayerKey(players, playerIdInGame),
        players: players.map(
            ({
                playerLogin,
                playerKey,
                selectedHeroId,
                isWonLastTime,
                opponentKey,
                countOfArmor,
                countOfHitPoints,
                tavernTier,
                tavernCardIds,
                handCardIds,
                deskCardIds,
            }) => ({
                playerLogin,
                playerKey,
                selectedHeroId,
                countOfArmor,
                countOfHitPoints,
                isWonLastTime,
                opponentKey,
                tavernTier,
                tavernCardIds, // TODO send only desk card ids
                handCardIds,
                deskCardIds,
            })
        ),
    };
};

const getPlayGamePlayerKey = (
    players: PlayGamePlayers,
    playerIdInGame: PlayerIdInGame
) => {
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

export const isPlayerInGameValidator = <
    T extends { playerIdInGame: PlayerIdInGame }
>(
    players: Array<T>,
    playerIdInGame: PlayerIdInGame
): T => {
    const playGamePlayer = players.find(
        (player) => player.playerIdInGame === playerIdInGame
    );

    if (!playGamePlayer) {
        throw new Error('the player not found');
    }

    return playGamePlayer;
};

export const isHeroSelectedValidator = (playGamePlayer: PlayGamePlayer) => {
    if (playGamePlayer.selectedHeroId) {
        throw new Error('the hero already selected');
    }
};

export const getPlayerHeroIds = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { phase, players } = await getPlayGameOperation(gameId);

    const playGamePlayer = isPlayerInGameValidator(players, playerIdInGame);

    isSelectHeroPhaseValidator(phase);
    isHeroSelectedValidator(playGamePlayer);

    return playGamePlayer.heroIds;
};

export const selectPlayGamePlayerHero = async ({
    gameId,
    playerIdInGame,
    heroId,
}: SelectHeroPlayerInput) => {
    const { phase, players } = await getPlayGameOperation(gameId);

    const playGamePlayer = isPlayerInGameValidator(players, playerIdInGame);

    isSelectHeroPhaseValidator(phase);
    isHeroSelectedValidator(playGamePlayer);

    await selectPlayGamePlayerHeroOperation(playerIdInGame, heroId);
};

export const getPlayGameRecruitPhaseInitialData = async (
    playGameBaseInput: PlayGameBaseInput
) => {
    const { phase, phaseDurationInMs, phaseStartDate, round } =
        await getPlayGame(playGameBaseInput);
    return { phase, phaseDurationInMs, phaseStartDate, round };
};

export const getPlayGamePlayer = async ({
    playerIdInGame,
}: PlayGameBaseInput): Promise<PlayGamePlayerWithCards> => {
    // TODO: is player in gameId check required?
    const { playGameGameId, ...playGamePlayer } =
        await getPlayGamePlayerOperation(playerIdInGame);
    const { tavernCardIds, handCardIds, deskCardIds } = playGamePlayer;
    const cards = await getCardsOperation([
        ...tavernCardIds,
        ...handCardIds,
        ...deskCardIds,
    ]);
    return {
        ...playGamePlayer,
        cards: cards.map(({ playGameGameId, ...card }: Card) => ({
            ...card,
            buffs: [],
        })),
        opponentId: null,
    };
};
