import { heroIds } from '@prisma/client';
import { CardIds } from '../../../data/minions/battle-cries/minions.battle-cries';
import prisma from '../../../lib/prisma';

import { PlayerIdInGame } from '../../../models/common.models';
import {
    PlayGamePlayer,
    PlayGamePlayers,
    PlayGamePlayerWithSelectedHero,
    PlayGamePlayerWithSelectedHeroes,
} from '../../player/player.models';
import { tavernTiers } from '../models/play-game.tavern.models';

export const setHeroToPlayerOperation = (
    playerIdInGame: PlayerIdInGame,
    selectedHeroId: heroIds
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { selectedHeroId },
    });

export const setHeroToPlayersOperation = (
    playGamePlayers: PlayGamePlayerWithSelectedHeroes
) =>
    Promise.all(
        playGamePlayers.map(
            ({
                playerIdInGame,
                selectedHeroId,
            }: PlayGamePlayerWithSelectedHero) =>
                setHeroToPlayerOperation(playerIdInGame, selectedHeroId)
        )
    );

const setPlayerOpponentOperation = ({
    playerIdInGame,
    opponentId,
    opponentKey,
}: PlayGamePlayer) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { opponentId, opponentKey },
    });

export const setPlayersOpponentsOperation = (
    playGamePlayers: PlayGamePlayers
) =>
    Promise.all(
        playGamePlayers.map((player) => setPlayerOpponentOperation(player))
    );

export const updatePlayerCardsOperation = (
    playerIdInGame: PlayerIdInGame,
    tavernCardIds: CardIds,
    goldAmount: number
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { tavernCardIds, goldAmount },
    });

export const sellPlayerCardOperation = (
    playerIdInGame: PlayerIdInGame,
    deskCardIds: CardIds,
    goldAmount: number
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { deskCardIds, goldAmount },
    });

export const playPlayerCardOperation = (
    playerIdInGame: PlayerIdInGame,
    handCardIds: CardIds,
    deskCardIds: CardIds
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { handCardIds, deskCardIds },
    });

export const addCardToPlayerHandCardsOperation = (
    playerIdInGame: PlayerIdInGame,
    tavernCardIds: CardIds,
    handCardIds: CardIds,
    frozenCardIds: CardIds,
    goldAmount: number
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { tavernCardIds, handCardIds, frozenCardIds, goldAmount },
    });

export const upgradePlayerTavernTierOperation = (
    playerIdInGame: PlayerIdInGame,
    tavernTier: tavernTiers,
    goldAmount: number
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { tavernTier, goldAmount },
    });

export const updateFrozenPlayerCardsOperation = (
    playerIdInGame: PlayerIdInGame,
    frozenCardIds: CardIds
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { frozenCardIds },
    });
