import { minionIds, minionTypes } from '@prisma/client';

import {
    SummonedMinionDetails,
    SummonedMinionsMap,
} from '../features/play-game/models/play-game.minion.models';
import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

export const minionsWithSummonSet = new Set<minionIds>([
    // beasts
    minionIds.alleycat,
    minionIds.sewerRat,
    minionIds.ratPack,
    minionIds.savannahHighmane,
    minionIds.ghastcoiler,
]);

export const summonedMinionsSet = new Set<minionIds>([
    minionIds.tabbycat,
    minionIds.turtle,
    minionIds.rat,
    minionIds.hyena,
]);

const tabbycatDetails: SummonedMinionDetails = {
    tavernTier: tavernTiers['☆'],
    minionType: minionTypes.beast,
    minionId: minionIds.tabbycat,
};

const turtleDetails: SummonedMinionDetails = {
    tavernTier: tavernTiers['☆'],
    minionType: minionTypes.beast,
    minionId: minionIds.turtle,
};

const ratDetails: SummonedMinionDetails = {
    tavernTier: tavernTiers['☆'],
    minionType: minionTypes.beast,
    minionId: minionIds.rat,
};

const hyenaDetails: SummonedMinionDetails = {
    tavernTier: tavernTiers['☆'],
    minionType: minionTypes.beast,
    minionId: minionIds.hyena,
};
export const summonedMinionMap: SummonedMinionsMap = new Map([
    //beasts
    [minionIds.alleycat, tabbycatDetails],
    [minionIds.sewerRat, turtleDetails],
    [minionIds.ratPack, ratDetails],
    [minionIds.savannahHighmane, hyenaDetails],
]);
