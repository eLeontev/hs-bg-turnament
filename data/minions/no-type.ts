import { minionIds, minionTypes } from '@prisma/client';

import { minionI18nKeys } from '../../i18n/enums/i18n.minion.enums';

import { Minion } from '../../features/play-game/models/play-game.minion.models';

const brannMinion: Minion = {
    countOfHitPoints: 4,
    tripleCountOfHitPoints: 8,
    attackPower: 2,
    tripleAttackPower: 4,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasBattleCry: false,
    hasUniqueBehavior: true,
    isTriple: false,
    types: [minionTypes.noType],
    avatarSrc: '/minion-avatars/no-type/brann-avatar.png',
    avatarTripleSrc: '/minion-avatars/no-type/brann-triple.avatar.png',
    minionId: minionIds.brann,
    name: minionI18nKeys.brannName,
    powerDescription: minionI18nKeys.brannPowerDescription,
    tripleCardPowerDescription: minionI18nKeys.brannTripleCardPowerDescription,
};

export const noType1StartTavern = new Map<minionIds, Minion>([]);

export const noType2StartTavern = new Map<minionIds, Minion>([]);

export const noType3StartTavern = new Map<minionIds, Minion>([]);

export const noType4StartTavern = new Map<minionIds, Minion>([]);

export const noType5StartTavern = new Map<minionIds, Minion>([
    [minionIds.brann, brannMinion],
]);

export const noType6StartTavern = new Map<minionIds, Minion>([]);
