import { heroIds } from '@prisma/client';

import { heroIdsValues } from '../schemas/play-game.hero.schemas';

import { countOfHeroIds } from '../../../constants/game-config.constants';

import { PlayerIdInGame } from '../../../models/common.models';
import { Hero, HeroIds } from '../models/play-game.hero.models';

import { getExcludedRandom } from '../../../utils.ts/random.utils';

import { heroes } from '../../../data/heroes';

export const getPlayerHeroIdsMap = (playerIdsInGame: Array<PlayerIdInGame>) => {
    const playerHeroIdsMap = new Map<PlayerIdInGame, HeroIds>();

    let randomHeroId: heroIds;
    let heroIdsToSelected = [...heroIdsValues];

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

export const getHeroesFromId = (heroIds: Array<heroIds>) =>
    heroIds
        .map((heroId: heroIds) => heroes.get(heroId))
        .filter((hero: Hero | undefined): hero is Hero => Boolean(hero));
