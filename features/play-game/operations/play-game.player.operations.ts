import { heroIds } from '@prisma/client';
import prisma from '../../../lib/prisma';

import { PlayerIdInGame } from '../../../models/common.models';
import {
    PlayGamePlayer,
    PlayGamePlayers,
    PlayGamePlayerWithSelectedHero,
    PlayGamePlayerWithSelectedHeros,
} from '../../player/player.models';

export const setHeroToPlayerOperation = (
    playerIdInGame: PlayerIdInGame,
    selectedHeroId: heroIds
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { selectedHeroId },
    });

export const setHeroToPlayersOperation = (
    playGamePlayers: PlayGamePlayerWithSelectedHeros
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
