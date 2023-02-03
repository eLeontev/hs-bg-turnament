import { minionTypes } from '@prisma/client';

import {
    beast1StartTavern,
    beast2StartTavern,
    beast3StartTavern,
    beast4StartTavern,
    beast5StartTavern,
    beast6StartTavern,
} from './minions/beasts';

import { Minions } from '../features/play-game/models/play-game.minion.models';
import { tavernTiers } from '../features/play-game/models/play-game.tavern.models';

export const minions: Minions = {
    [tavernTiers['☆']]: {
        [minionTypes.beast]: beast1StartTavern,
    },
    [tavernTiers['☆☆']]: {
        [minionTypes.beast]: beast2StartTavern,
    },
    [tavernTiers['☆☆☆']]: {
        [minionTypes.beast]: beast3StartTavern,
    },
    [tavernTiers['☆☆☆☆']]: {
        [minionTypes.beast]: beast4StartTavern,
    },
    [tavernTiers['☆☆☆☆☆']]: {
        [minionTypes.beast]: beast5StartTavern,
    },
    [tavernTiers['☆☆☆☆☆☆']]: {
        [minionTypes.beast]: beast6StartTavern,
    },
};
