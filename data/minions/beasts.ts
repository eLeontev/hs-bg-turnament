import { minionIds, minionTypes } from '@prisma/client';

import { minionI18nKeys } from '../../i18n/enums/i18n.minion.enums';

import { Minion } from '../../features/play-game/models/play-game.minion.models';

const alleycatMinion: Minion = {
    countOfHitPoints: 1,
    attackPower: 1,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    types: [minionTypes.beast],
    avatarSrc: '/minion-avatars/beasts/alleycat-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/alleycat-triple.avatar.png',
    minionId: minionIds.alleycat,
    name: minionI18nKeys.alleycatName,
    powerDescription: minionI18nKeys.alleycatPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.alleycatTripleCardPowerDescription,
};

const scavengingHyenaMinion: Minion = {
    countOfHitPoints: 2,
    attackPower: 2,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    types: [minionTypes.beast],
    minionId: minionIds.scavengingHyena,
    avatarSrc: '/minion-avatars/beasts/scavenginghyena-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/scavenginghyena-triple.avatar.png',
    name: minionI18nKeys.scavengingHyenaName,
    powerDescription: minionI18nKeys.scavengingHyenaPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.scavengingHyenaTripleCardPowerDescription,
};

export const beast1StartTavern = new Map<minionIds, Minion>([
    [minionIds.alleycat, alleycatMinion],
    [minionIds.scavengingHyena, scavengingHyenaMinion],
]);

export const beast2StartTavern = new Map<minionIds, Minion>();

export const beast3StartTavern = new Map<minionIds, Minion>();

export const beast4StartTavern = new Map<minionIds, Minion>();

export const beast5StartTavern = new Map<minionIds, Minion>();

export const beast6StartTavern = new Map<minionIds, Minion>();
