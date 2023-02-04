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

import { Minions } from '../features/play-game/models/play-game.minion.models';
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
