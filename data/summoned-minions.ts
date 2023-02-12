import { minionIds, minionTypes } from '@prisma/client';

import {
    Minion,
    MinionsWithSummonMap,
    SummonedMinions,
} from '../features/play-game/models/play-game.minion.models';
import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

import { getRandom } from '../utils.ts/random.utils';

import { minionIdsWithDeathRattle } from './minions';

export const summonedMinionsSet = new Set<minionIds>([
    minionIds.tabbycat,
    minionIds.turtle,
    minionIds.rat,
    minionIds.hyena,
]);

const tabbycatSummonHandler = (): SummonedMinions => [
    {
        isSummoned: true,
        tavernTier: tavernTiers['☆'],
        minionType: minionTypes.beast,
        minionId: minionIds.tabbycat,
    },
];

const turtleSummonHandler = (): SummonedMinions => [
    {
        isSummoned: true,
        tavernTier: tavernTiers['☆'],
        minionType: minionTypes.beast,
        minionId: minionIds.turtle,
    },
];

const ratSummonHandler = ({ attackPower }: Minion): SummonedMinions =>
    new Array(attackPower).fill({
        isSummoned: true,
        tavernTier: tavernTiers['☆'],
        minionType: minionTypes.beast,
        minionId: minionIds.rat,
    });

const hyenaSummonHandler = (): SummonedMinions =>
    new Array(2).fill({
        isSummoned: true,
        tavernTier: tavernTiers['☆'],
        minionType: minionTypes.beast,
        minionId: minionIds.hyena,
    });

const deathRattleSummonHandler = (
    { isTriple }: Minion,
    playerTavernTier: tavernTiers
): SummonedMinions => {
    const allowedMinionsToSummon = minionIdsWithDeathRattle.filter(
        ({ tavernTier, minionId }) =>
            playerTavernTier >= tavernTier && minionId !== minionIds.ghastcoiler
    );
    const countOfSummonedMinions = isTriple ? 4 : 2;

    return new Array(countOfSummonedMinions)
        .fill('')
        .map(() => getRandom(allowedMinionsToSummon));
};

export const minionsWithSummonMap: MinionsWithSummonMap = new Map([
    //beasts
    [minionIds.alleycat, tabbycatSummonHandler],
    [minionIds.sewerRat, turtleSummonHandler],
    [minionIds.ratPack, ratSummonHandler],
    [minionIds.savannahHighmane, hyenaSummonHandler],
    [minionIds.ghastcoiler, deathRattleSummonHandler],
]);
