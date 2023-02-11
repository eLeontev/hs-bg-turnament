import { minionIds, minionTypes } from '@prisma/client';

import { minionI18nKeys } from '../../i18n/enums/i18n.minion.enums';

import { Minion } from '../../features/play-game/models/play-game.minion.models';

const tabbycatMinion: Minion = {
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
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    avatarSrc: '/minion-avatars/beasts/tabbycat-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/tabbycat-triple.avatar.png',
    minionId: minionIds.tabbycat,
    name: minionI18nKeys.tabbycatName,
    description: minionI18nKeys.tabbycatDescription,
    powerDescription: minionI18nKeys.tabbycatPowerDescription,
    tripleCardPowerDescription:
        minionI18nKeys.tabbycatTripleCardPowerDescription,
};

const turtleMinion: Minion = {
    countOfHitPoints: 3,
    tripleCountOfHitPoints: 6,
    attackPower: 2,
    tripleAttackPower: 4,
    isTaunt: true,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    avatarSrc: '/minion-avatars/beasts/turtle-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/turtle-triple.avatar.png',
    minionId: minionIds.turtle,
    name: minionI18nKeys.turtleName,
    description: minionI18nKeys.turtleDescription,
    powerDescription: minionI18nKeys.turtlePowerDescription,
    tripleCardPowerDescription: minionI18nKeys.turtleTripleCardPowerDescription,
};

const ratMinion: Minion = {
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
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    avatarSrc: '/minion-avatars/beasts/rat-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/rat-triple.avatar.png',
    minionId: minionIds.rat,
    name: minionI18nKeys.ratName,
    description: minionI18nKeys.ratDescription,
    powerDescription: minionI18nKeys.ratPowerDescription,
    tripleCardPowerDescription: minionI18nKeys.ratTripleCardPowerDescription,
};

const hyenaMinion: Minion = {
    countOfHitPoints: 2,
    tripleCountOfHitPoints: 4,
    attackPower: 2,
    tripleAttackPower: 4,
    isTaunt: false,
    hasWindFury: false,
    hasReborn: false,
    hasDivineShield: false,
    hasDeathRattle: false,
    hasUniqueBehavior: false,
    hasBattleCry: false,
    isTriple: false,
    types: [minionTypes.beast],
    avatarSrc: '/minion-avatars/beasts/hyena-avatar.png',
    avatarTripleSrc: '/minion-avatars/beasts/hyena-triple.avatar.png',
    minionId: minionIds.hyena,
    name: minionI18nKeys.hyenaName,
    description: minionI18nKeys.hyenaDescription,
    powerDescription: minionI18nKeys.hyenaPowerDescription,
    tripleCardPowerDescription: minionI18nKeys.hyenaTripleCardPowerDescription,
};

export const beastSummoned1StartTavern = new Map<minionIds, Minion>([
    [minionIds.tabbycat, tabbycatMinion],
    [minionIds.turtle, turtleMinion],
    [minionIds.rat, ratMinion],
    [minionIds.hyena, hyenaMinion],
]);

export const beastSummoned2StartTavern = new Map<minionIds, Minion>([]);

export const beastSummoned3StartTavern = new Map<minionIds, Minion>([]);

export const beastSummoned4StartTavern = new Map<minionIds, Minion>([]);

export const beastSummoned5StartTavern = new Map<minionIds, Minion>([]);

export const beastSummoned6StartTavern = new Map<minionIds, Minion>([]);
