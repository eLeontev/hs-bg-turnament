import { minionTypes } from '@prisma/client';

import {
    beast1StartTavern,
    beast2StartTavern,
    beast3StartTavern,
    beast4StartTavern,
    beast5StartTavern,
    beast6StartTavern,
} from './minions/beasts';

import {
    all1StartTavern,
    all2StartTavern,
    all3StartTavern,
    all4StartTavern,
    all5StartTavern,
    all6StartTavern,
} from './minions/all';

import {
    noType1StartTavern,
    noType2StartTavern,
    noType3StartTavern,
    noType4StartTavern,
    noType5StartTavern,
    noType6StartTavern,
} from './minions/no-type';

import {
    beastSummoned1StartTavern,
    beastSummoned2StartTavern,
    beastSummoned3StartTavern,
    beastSummoned4StartTavern,
    beastSummoned5StartTavern,
    beastSummoned6StartTavern,
} from './minions/beasts.summoned';

import {
    noTypeSummoned1StartTavern,
    noTypeSummoned2StartTavern,
    noTypeSummoned3StartTavern,
    noTypeSummoned4StartTavern,
    noTypeSummoned5StartTavern,
    noTypeSummoned6StartTavern,
} from './minions/no-type.summoned';

import {
    allSummoned1StartTavern,
    allSummoned2StartTavern,
    allSummoned3StartTavern,
    allSummoned4StartTavern,
    allSummoned5StartTavern,
    allSummoned6StartTavern,
} from './minions/all.summoned';

import {
    Minions,
    SummonedMinions,
} from '../features/play-game/models/play-game.minion.models';
import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

export const minions: Minions = {
    [tavernTiers['☆']]: {
        [minionTypes.beast]: beast1StartTavern,
        [minionTypes.all]: all1StartTavern,
        [minionTypes.noType]: noType1StartTavern,
    },
    [tavernTiers['☆☆']]: {
        [minionTypes.beast]: beast2StartTavern,
        [minionTypes.all]: all2StartTavern,
        [minionTypes.noType]: noType2StartTavern,
    },
    [tavernTiers['☆☆☆']]: {
        [minionTypes.beast]: beast3StartTavern,
        [minionTypes.all]: all3StartTavern,
        [minionTypes.noType]: noType3StartTavern,
    },
    [tavernTiers['☆☆☆☆']]: {
        [minionTypes.beast]: beast4StartTavern,
        [minionTypes.all]: all4StartTavern,
        [minionTypes.noType]: noType4StartTavern,
    },
    [tavernTiers['☆☆☆☆☆']]: {
        [minionTypes.beast]: beast5StartTavern,
        [minionTypes.all]: all5StartTavern,
        [minionTypes.noType]: noType5StartTavern,
    },
    [tavernTiers['☆☆☆☆☆☆']]: {
        [minionTypes.beast]: beast6StartTavern,
        [minionTypes.all]: all6StartTavern,
        [minionTypes.noType]: noType6StartTavern,
    },
};

export const summonedMinions: Minions = {
    [tavernTiers['☆']]: {
        [minionTypes.beast]: beastSummoned1StartTavern,
        [minionTypes.all]: allSummoned1StartTavern,
        [minionTypes.noType]: noTypeSummoned1StartTavern,
    },
    [tavernTiers['☆☆']]: {
        [minionTypes.beast]: beastSummoned2StartTavern,
        [minionTypes.all]: allSummoned2StartTavern,
        [minionTypes.noType]: noTypeSummoned2StartTavern,
    },
    [tavernTiers['☆☆☆']]: {
        [minionTypes.beast]: beastSummoned3StartTavern,
        [minionTypes.all]: allSummoned3StartTavern,
        [minionTypes.noType]: noTypeSummoned3StartTavern,
    },
    [tavernTiers['☆☆☆☆']]: {
        [minionTypes.beast]: beastSummoned4StartTavern,
        [minionTypes.all]: allSummoned4StartTavern,
        [minionTypes.noType]: noTypeSummoned4StartTavern,
    },
    [tavernTiers['☆☆☆☆☆']]: {
        [minionTypes.beast]: beastSummoned5StartTavern,
        [minionTypes.all]: allSummoned5StartTavern,
        [minionTypes.noType]: noTypeSummoned5StartTavern,
    },
    [tavernTiers['☆☆☆☆☆☆']]: {
        [minionTypes.beast]: beastSummoned6StartTavern,
        [minionTypes.all]: allSummoned6StartTavern,
        [minionTypes.noType]: noTypeSummoned6StartTavern,
    },
};

export const minionIdsWithDeathRattle: SummonedMinions = [];

Object.entries(minions).forEach(([tavernTier, minionTypesObject]) => {
    Object.entries(minionTypesObject).forEach(
        ([minionType, minionsTavernMap]) => {
            Array.from(minionsTavernMap).forEach(
                ([minionId, { hasDeathRattle }]) => {
                    if (hasDeathRattle) {
                        minionIdsWithDeathRattle.push({
                            isSummoned: false,
                            minionId,
                            minionType: minionType as minionTypes,
                            tavernTier: Number(tavernTier) as tavernTiers,
                        });
                    }
                }
            );
        }
    );
});
