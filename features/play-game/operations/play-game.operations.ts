import { heroIds } from '@prisma/client';
import prisma from '../../../lib/prisma';

import {
    GameId,
    PlayerIdInGame,
    PlayerIdInGames,
} from '../../../models/common.models';
import { PlayGameData, PlayGamePhaseData } from '../models/play-game.models';
import { PlayGamePlayers } from '../../player/player.models';
import {
    CardId,
    CardIds,
} from '../../../data/minions/battle-cries/minions.battle-cries';
import { TripleCardTemplate } from '../services/play-game.triple.service';

export const startPlayGameOperation = (
    gameId: GameId,
    players: PlayGamePlayers,
    playGameData: PlayGameData
) =>
    prisma.playGame.create({
        data: {
            gameId,
            ...playGameData,
            players: { create: players },
            availableCards: { create: playGameData.availableCards },
        },
    });

export const getPlayGameOperation = (
    gameId: GameId,
    withAvailableCards?: boolean
) =>
    prisma.playGame.findFirstOrThrow({
        where: { gameId },
        include: { players: true, availableCards: withAvailableCards },
    });

export const getPlayGameWithoutPlayerOperation = (gameId: GameId) =>
    prisma.playGame.findFirstOrThrow({
        where: { gameId },
    });

export const changePlayGamePhaseOperation = (
    gameId: GameId,
    playGameData: PlayGamePhaseData
) =>
    prisma.playGame.update({
        where: { gameId },
        data: playGameData,
    });

export const deletePlayGameOperation = (gameId: GameId) =>
    prisma.playGame.delete({ where: { gameId } });

export const isPlayerInPlayGameOperation = (
    gameId: GameId,
    playerIdInGame: PlayerIdInGame
) =>
    prisma.playGame.findFirst({
        where: { gameId },
        include: { players: { where: { playerIdInGame } } },
    });

export const getPlayGamePlayerOperation = (playerIdInGame: PlayerIdInGame) =>
    prisma.playGamePlayer.findFirstOrThrow({ where: { playerIdInGame } });

export const getPlayGamePlayersOperation = (playGameGameId: GameId) =>
    prisma.playGamePlayer.findMany({ where: { playGameGameId } });

export const selectPlayGamePlayerHeroOperation = (
    playerIdInGame: PlayerIdInGame,
    selectedHeroId: heroIds
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { selectedHeroId },
    });

export const markCardAvailableOperation = (cardId: CardId) =>
    prisma.card.update({ where: { cardId }, data: { isInUse: false } });

export const markCardsAvailableOperation = (availableCardIds: CardIds) =>
    prisma.card.updateMany({
        where: { cardId: { in: availableCardIds } },
        data: { isInUse: false },
    });

export const markCardInUseOperation = (cardId: CardId) =>
    prisma.card.update({ where: { cardId }, data: { isInUse: true } });

export const markCardsInUseOperation = (availableCardIds: CardIds) =>
    prisma.card.updateMany({
        where: { cardId: { in: availableCardIds } },
        data: { isInUse: true },
    });

export const getCardsOperation = (cardsIds: CardIds) =>
    prisma.card.findMany({ where: { cardId: { in: cardsIds } } });

export const setGoldAmountToPlayersOperation = (
    playerIdsInGame: PlayerIdInGames,
    goldAmount: number
) =>
    prisma.playGamePlayer.updateMany({
        where: { playerIdInGame: { in: playerIdsInGame } },
        data: { goldAmount },
    });

export const selectedCardsOperation = (cardIds: CardIds) =>
    prisma.card.findMany({ where: { cardId: { in: cardIds } } });

export const getCardOperation = (cardId: CardId) =>
    prisma.card.findFirstOrThrow({ where: { cardId } });

export const createTripleCardOperation = (data: TripleCardTemplate) =>
    prisma.card.create({ data });
