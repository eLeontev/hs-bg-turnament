import { minionIds, minionTypes } from '@prisma/client';

import { Minion } from '../../features/play-game/models/play-game.minion.models';

import { minionI18nKeys } from '../../i18n/enums/i18n.minion.enums';

const ballOfMinionsMinion: Minion = {
    countOfHitPoints: 5,
    attackPower: 5,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasBattleCry: false,
    hasUniqueBehavior: true,
    types: [minionTypes.all],
    avatarSrc: '/minion-avatars/all/ballOfMinions-avatar.png',
    avatarTripleSrc: '/minion-avatars/all/ballOfMinions-triple.avatar.png',
    minionId: minionIds.ballOfMinions,
    name: minionI18nKeys.ballOfMinionsName,
    powerDescription: minionI18nKeys.ballOfMinionsPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.ballOfMinionsTripleCardPowerDescription,
};

export const all1StartTavern = new Map<minionIds, Minion>([]);

export const all2StartTavern = new Map<minionIds, Minion>([]);

export const all3StartTavern = new Map<minionIds, Minion>([]);

export const all4StartTavern = new Map<minionIds, Minion>([
    [minionIds.ballOfMinions, ballOfMinionsMinion],
]);

export const all5StartTavern = new Map<minionIds, Minion>([]);

export const all6StartTavern = new Map<minionIds, Minion>([]);
