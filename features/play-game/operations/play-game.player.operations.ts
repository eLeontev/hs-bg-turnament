import { heroIds } from '@prisma/client';
import prisma from '../../../lib/prisma';

import { PlayerIdInGame } from '../../../models/common.models';
import {
    PlayGamePlayerWithSelectedHero,
    PlayGamePlayerWithSelectedHeros,
} from '../../player/player.models';

export const setHeroToPlayer = (
    playerIdInGame: PlayerIdInGame,
    selectedHeroId: heroIds
) =>
    prisma.playGamePlayer.update({
        where: { playerIdInGame },
        data: { selectedHeroId },
    });

export const setHeroToPlayers = (
    playGamePlayers: PlayGamePlayerWithSelectedHeros
) =>
    Promise.all(
        playGamePlayers.map(
            ({
                playerIdInGame,
                selectedHeroId,
            }: PlayGamePlayerWithSelectedHero) =>
                setHeroToPlayer(playerIdInGame, selectedHeroId)
        )
    );
