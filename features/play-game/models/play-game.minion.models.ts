import { z } from 'zod';
import { minionIds, minionTypes } from '@prisma/client';

import { minionIdSchema } from '../schemas/play-game.minion.schemas';

import { minionI18nKeys } from '../../../i18n/enums/i18n.minion.enums';

import { tavernTiers } from './play-game.tavern.models';

export type MinionId = z.infer<typeof minionIdSchema>;
export type MinionIds = Array<MinionId>;

export type Minion = {
    countOfHitPoints: number;
    attackPower: number;
    tripleCountOfHitPoints: number;
    tripleAttackPower: number;
    isTaunt: boolean;
    hasWindFury: boolean;
    hasReborn: boolean;
    hasDivineShield: boolean;
    hasDeathRattle: boolean;
    hasUniqueBehavior: boolean;
    hasBattleCry: boolean;
    types: Array<minionTypes>;
    minionId: MinionId;
    avatarSrc: string;
    avatarTripleSrc: string;
    name: minionI18nKeys;
    description?: minionI18nKeys;
    powerDescription: minionI18nKeys;
    isTriple: boolean;
    tripleCardPowerDescription: minionI18nKeys;
};

export type SummonedMinion = {
    isSummoned: boolean;
    tavernTier: tavernTiers;
    minionType: minionTypes;
    minionId: minionIds;
};

export type SummonedMinions = Array<SummonedMinion>;

export type MinionsWithSummonMap = Map<
    minionIds,
    (minion: Minion, tavernTier: tavernTiers) => SummonedMinions
>;

export type MinionMap = Map<minionIds, Minion>;

export type Minions = {
    [level in tavernTiers]: {
        [type in minionTypes]: MinionMap;
    };
};
