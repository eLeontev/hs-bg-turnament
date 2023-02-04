import { z } from 'zod';
import { minionIds, minionTypes } from '@prisma/client';

import { minionIdSchema } from '../schemas/play-game.minion.schemas';

import { minionI18nKeys } from '../../../i18n/enums/i18n.minion.enums';

import { tavernTiers } from './play-game.tavern.models';

export type MinionId = z.infer<typeof minionIdSchema>;
export type MinionIds = Array<MinionId>;

export enum minionUniqueBehaviorIds {
    uniqueBehaviorId,
}

export type Minion = {
    countOfHitPoints: number;
    attackPower: number;
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
    tripleCardPowerDescription: minionI18nKeys;
    uniqueBehaviorId?: minionUniqueBehaviorIds;
};

export type Minions = {
    [level in tavernTiers]: {
        [type in minionTypes]: Map<minionIds, Minion>;
    };
};
