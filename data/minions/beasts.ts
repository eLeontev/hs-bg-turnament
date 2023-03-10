import { minionIds, minionTypes } from '@prisma/client';

import { minionI18nKeys } from '../../i18n/enums/i18n.minion.enums';

import { Minion } from '../../features/play-game/models/play-game.minion.models';

const alleycatMinion: Minion = {
    countOfHitPoints: 1,
    tripleCountOfHitPoints: 2,
    attackPower: 1,
    tripleAttackPower: 2,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: false,
    hasBattleCry: true,
    isTriple: false,
    types: [minionTypes.beast],
    avatarSrc: '/minion-avatars/beasts/alleycat-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/alleycat-triple.avatar.png',
    minionId: minionIds.alleycat,
    name: minionI18nKeys.alleycatName,
    description: minionI18nKeys.alleycatDescription,
    powerDescription: minionI18nKeys.alleycatPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.alleycatTripleCardPowerDescription,
};

const scavengingHyenaMinion: Minion = {
    countOfHitPoints: 2,
    tripleCountOfHitPoints: 4,
    attackPower: 2,
    tripleAttackPower: 4,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: true,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.scavengingHyena,
    avatarSrc: '/minion-avatars/beasts/scavenginghyena-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/scavenginghyena-triple.avatar.png',
    name: minionI18nKeys.scavengingHyenaName,
    description: minionI18nKeys.scavengingHyenaDescription,
    powerDescription: minionI18nKeys.scavengingHyenaPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.scavengingHyenaTripleCardPowerDescription,
};

const leapfroggerMinion: Minion = {
    countOfHitPoints: 3,
    tripleCountOfHitPoints: 3,
    attackPower: 3,
    tripleAttackPower: 3,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: true,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.leapfrogger,
    avatarSrc: '/minion-avatars/beasts/leapfrogger-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/leapfrogger-triple.avatar.png',
    name: minionI18nKeys.leapfroggerName,
    powerDescription: minionI18nKeys.leapfroggerPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.leapfroggerTripleCardPowerDescription,
};

const rabidSauroliskMinion: Minion = {
    countOfHitPoints: 2,
    tripleCountOfHitPoints: 4,
    attackPower: 3,
    tripleAttackPower: 6,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: true,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.rabidSaurolisk,
    avatarSrc: '/minion-avatars/beasts/rabidSaurolisk-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/rabidSaurolisk-triple.avatar.png',
    name: minionI18nKeys.rabidSauroliskName,
    powerDescription: minionI18nKeys.rabidSauroliskPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.rabidSauroliskTripleCardPowerDescription,
};

const sewerRatMinion: Minion = {
    countOfHitPoints: 2,
    tripleCountOfHitPoints: 4,
    attackPower: 3,
    tripleAttackPower: 6,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: true,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.sewerRat,
    avatarSrc: '/minion-avatars/beasts/sewerRat-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/sewerRat-triple.avatar.png',
    name: minionI18nKeys.sewerRatName,
    powerDescription: minionI18nKeys.sewerRatPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.sewerRatTripleCardPowerDescription,
};

const monstrousMacawMinion: Minion = {
    countOfHitPoints: 3,
    tripleCountOfHitPoints: 6,
    attackPower: 5,
    tripleAttackPower: 10,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: true,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.monstrousMacaw,
    avatarSrc: '/minion-avatars/beasts/monstrousMacaw-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/monstrousMacaw-triple.avatar.png',
    name: minionI18nKeys.monstrousMacawName,
    powerDescription: minionI18nKeys.monstrousMacawPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.monstrousMacawTripleCardPowerDescription,
};

const ratPackMinion: Minion = {
    countOfHitPoints: 2,
    tripleCountOfHitPoints: 4,
    attackPower: 2,
    tripleAttackPower: 4,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: true,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.ratPack,
    avatarSrc: '/minion-avatars/beasts/ratPack-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/ratPack-triple.avatar.png',
    name: minionI18nKeys.ratPackName,
    description: minionI18nKeys.ratPackDescription,
    powerDescription: minionI18nKeys.ratPackPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.ratPackTripleCardPowerDescription,
};

const caveHydraMinion: Minion = {
    countOfHitPoints: 4,
    tripleCountOfHitPoints: 8,
    attackPower: 2,
    tripleAttackPower: 4,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: true,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.caveHydra,
    avatarSrc: '/minion-avatars/beasts/caveHydra-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/caveHydra-triple.avatar.png',
    name: minionI18nKeys.caveHydraName,
    description: minionI18nKeys.caveHydraDescription,
    powerDescription: minionI18nKeys.caveHydraPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.caveHydraTripleCardPowerDescription,
};

const reanimatingRattlerMinion: Minion = {
    countOfHitPoints: 3,
    tripleCountOfHitPoints: 6,
    attackPower: 5,
    tripleAttackPower: 10,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: false,
    hasBattleCry: true,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.reanimatingRattler,
    avatarSrc: '/minion-avatars/beasts/reanimatingRattler-avatar.png',
    avatarTripleSrc:
        '/minion-avatars/beasts/reanimatingRattler-triple.avatar.png',
    name: minionI18nKeys.reanimatingRattlerName,
    powerDescription: minionI18nKeys.reanimatingRattlerPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.reanimatingRattlerTripleCardPowerDescription,
};

const savannahHighmaneMinion: Minion = {
    countOfHitPoints: 5,
    tripleCountOfHitPoints: 10,
    attackPower: 6,
    tripleAttackPower: 12,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: true,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.savannahHighmane,
    avatarSrc: '/minion-avatars/beasts/savannahHighmane-avatar.png',
    avatarTripleSrc:
        '/minion-avatars/beasts/savannahHighmane-triple.avatar.png',
    name: minionI18nKeys.savannahHighmaneName,
    description: minionI18nKeys.savannahHighmaneDescription,
    powerDescription: minionI18nKeys.savannahHighmanePowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.savannahHighmaneTripleCardPowerDescription,
};

const agamagganMinion: Minion = {
    countOfHitPoints: 6,
    tripleAttackPower: 12,
    attackPower: 6,
    tripleCountOfHitPoints: 12,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: true,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.agamaggan,
    avatarSrc: '/minion-avatars/beasts/agamaggan-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/agamaggan-triple.avatar.png',
    name: minionI18nKeys.agamagganName,
    powerDescription: minionI18nKeys.agamagganPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.agamagganTripleCardPowerDescription,
};

const mamaBearMinion: Minion = {
    countOfHitPoints: 5,
    tripleCountOfHitPoints: 10,
    attackPower: 5,
    tripleAttackPower: 10,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: true,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.mamaBear,
    avatarSrc: '/minion-avatars/beasts/mamaBear-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/mamaBear-triple.avatar.png',
    name: minionI18nKeys.mamaBearName,
    powerDescription: minionI18nKeys.mamaBearPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.mamaBearTripleCardPowerDescription,
};

const ghastcoilerMinion: Minion = {
    countOfHitPoints: 7,
    tripleCountOfHitPoints: 14,
    attackPower: 7,
    tripleAttackPower: 14,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: true,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.ghastcoiler,
    avatarSrc: '/minion-avatars/beasts/ghastcoiler-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/ghastcoiler-triple.avatar.png',
    name: minionI18nKeys.ghastcoilerName,
    powerDescription: minionI18nKeys.ghastcoilerPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.ghastcoilerTripleCardPowerDescription,
};

const goldrinnMinion: Minion = {
    countOfHitPoints: 4,
    tripleCountOfHitPoints: 4,
    attackPower: 4,
    tripleAttackPower: 4,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: true,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    minionId: minionIds.goldrinn,
    avatarSrc: '/minion-avatars/beasts/goldrinn-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/goldrinn-triple.avatar.png',
    name: minionI18nKeys.goldrinnName,
    powerDescription: minionI18nKeys.goldrinnPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.goldrinnTripleCardPowerDescription,
};

export const beast1StartTavern = new Map<minionIds, Minion>([
    [minionIds.alleycat, alleycatMinion],
    [minionIds.scavengingHyena, scavengingHyenaMinion],
]);

export const beast2StartTavern = new Map<minionIds, Minion>([
    [minionIds.leapfrogger, leapfroggerMinion],
    [minionIds.rabidSaurolisk, rabidSauroliskMinion],
    [minionIds.sewerRat, sewerRatMinion],
]);

export const beast3StartTavern = new Map<minionIds, Minion>([
    [minionIds.monstrousMacaw, monstrousMacawMinion],
    [minionIds.ratPack, ratPackMinion],
]);

export const beast4StartTavern = new Map<minionIds, Minion>([
    [minionIds.caveHydra, caveHydraMinion],
    [minionIds.reanimatingRattler, reanimatingRattlerMinion],
    [minionIds.savannahHighmane, savannahHighmaneMinion],
]);

export const beast5StartTavern = new Map<minionIds, Minion>([
    [minionIds.agamaggan, agamagganMinion],
    [minionIds.mamaBear, mamaBearMinion],
]);

export const beast6StartTavern = new Map<minionIds, Minion>([
    [minionIds.ghastcoiler, ghastcoilerMinion],
    [minionIds.goldrinn, goldrinnMinion],
]);
