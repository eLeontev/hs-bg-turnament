import { heroIds } from '@prisma/client';

import { herIdsValues } from '../schemas/play-game.hero.schemas';

import { countOfHeroIds } from '../../../constants/game-config.constants';

import { PlayerIdInGame } from '../../../models/common.models';

import { getExcludedRandom } from '../../../utils.ts/random.utils';

export const getPlayerHeroIdsMap = (playerIdsInGame: Array<PlayerIdInGame>) => {
    const playerHeroIdsMap = new Map<PlayerIdInGame, Array<heroIds>>();

    let randomHeroId: heroIds;
    let heroIdsToSelected = [...herIdsValues];

    new Array(countOfHeroIds).fill('').forEach(() => {
        [randomHeroId, heroIdsToSelected] =
            getExcludedRandom(heroIdsToSelected);

        playerIdsInGame.forEach((playerIdInGame: PlayerIdInGame) => {
            playerHeroIdsMap.set(playerIdInGame, [
                ...(playerHeroIdsMap.get(playerIdInGame) || []),
                randomHeroId,
            ]);
        });
    });

    return playerHeroIdsMap;
};
