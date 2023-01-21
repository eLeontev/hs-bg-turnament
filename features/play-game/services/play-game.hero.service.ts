import { heroIds } from '@prisma/client';

import { herIdsValues } from '../schemas/play-game.hero.schemas';

import { countOfHeroIds } from '../../../constants/game-config.constants';

import { PlayerIdInGame } from '../../../models/common.models';
import { HeroIds } from '../models/play-game.hero.models';

import { getExcludedRandom } from '../../../utils.ts/random.utils';

export const getPlayerHeroIdsMap = (playerIdsInGame: Array<PlayerIdInGame>) => {
    const playerHeroIdsMap = new Map<PlayerIdInGame, HeroIds>();

    let randomHeroId: heroIds;
    let heroIdsToSelected = [...herIdsValues];

    new Array(countOfHeroIds).fill('').forEach(() =>
        playerIdsInGame.forEach((playerIdInGame: PlayerIdInGame) => {
            [randomHeroId, heroIdsToSelected] =
                getExcludedRandom(heroIdsToSelected);

            playerHeroIdsMap.set(playerIdInGame, [
                ...(playerHeroIdsMap.get(playerIdInGame) || []),
                randomHeroId,
            ]);
        })
    );

    return playerHeroIdsMap;
};
