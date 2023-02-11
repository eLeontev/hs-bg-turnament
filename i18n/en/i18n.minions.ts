import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const enMinionMessages: I18nTransMessages<namespaces.minions> = {
    minionTypeBeasts: 'beasts',
    minionTypeAll: 'all',
    minionTypeNoType: 'no type',

    // powers
    deathrattle: 'Deathrattle:',
    battlecry: 'Battlecry:',

    // beasts
    alleycatName: 'Alleycat',
    alleycatDescription: 'To be a cool cat in Gadgetzan, you gotta have bling.',
    alleycatPowerDescription: 'Summon a 1/1 Cat.',
    alleycatTripleCardPowerDescription: 'Summon a 2/2 Cat.',

    scavengingHyenaName: 'Scavenging Hyena',
    scavengingHyenaDescription: `Hyenas prefer the bones of kodos or windserpents, but they'll eat pretty much anything. Even Brussels sprouts.`,
    scavengingHyenaPowerDescription:
        'Whenever a friendly Beast dies, gain +2/+1.',
    scavengingHyenaTripleCardPowerDescription:
        'Whenever a friendly Beast dies, gain +4/+2.',

    leapfroggerName: 'Leapfrogger',
    leapfroggerDescription: '',
    leapfroggerPowerDescription:
        'Give a friendly Beast +1/+1 and this Deathrattle.',
    leapfroggerTripleCardPowerDescription:
        'Give a friendly Beast +2/+2 and this Deathrattle.',

    rabidSauroliskName: 'Rabid Saurolisk',
    rabidSauroliskDescription: '',
    rabidSauroliskPowerDescription:
        'After you play a minion with Deathrattle, gain +1/+2.',
    rabidSauroliskTripleCardPowerDescription:
        'After you play a minion with Deathrattle, gain +2/+4.',

    sewerRatName: 'Sewer Rat',
    sewerRatDescription: '',
    sewerRatPowerDescription: 'Summon a 2/3 Turtle with Taunt.',
    sewerRatTripleCardPowerDescription: 'Summon a 4/6 Turtle with Taunt.',

    monstrousMacawName: 'Monstrous Macaw',
    monstrousMacawDescription: '',
    monstrousMacawPowerDescription: `After this attacks, trigger another friendly minion's Deathrattle.`,
    monstrousMacawTripleCardPowerDescription: `After this attacks, trigger another friendly minion's Deathrattle. Twice`,

    ratPackName: 'Rat Pack',
    ratPackDescription: `He's gonna do it his way.`,
    ratPackPowerDescription: `Summon a number of 1/1 Rats equal to this minion's Attack.`,
    ratPackTripleCardPowerDescription: `Summon a number of 2/2 Rats equal to this minion's Attack.`,

    caveHydraName: 'Cave Hydra',
    caveHydraDescription: 'Can be upgraded into a Cave Lurker.',
    caveHydraPowerDescription:
        'Also damages the minions next to whomever this attacks.',
    caveHydraTripleCardPowerDescription:
        'Also damages the minions next to whomever this attacks.',

    reanimatingRattlerName: 'Reanimating Rattler',
    reanimatingRattlerDescription: '',
    reanimatingRattlerPowerDescription: 'Give a friendly Beast Reborn.',
    reanimatingRattlerTripleCardPowerDescription:
        'Give a friendly Beast Reborn.',

    savannahHighmaneName: 'Savannah Highmane',
    savannahHighmaneDescription:
        'In the jungle, the mighty jungle, the lion gets slowly consumed by hyenas.',
    savannahHighmanePowerDescription: 'Summon two 2/2 Hyenas.',
    savannahHighmaneTripleCardPowerDescription: 'Summon two 4/4 Hyenas.',

    agamagganName: 'Agamaggan, the Great Boar',
    agamagganDescription: '',
    agamagganPowerDescription: 'Your Blood Gems give an extra +1/+1.',
    agamagganTripleCardPowerDescription: 'Your Blood Gems give an extra +2/+2.',

    mamaBearName: 'Mama Bear',
    mamaBearDescription: '',
    mamaBearPowerDescription: 'Whenever you summon a Beast, give it +5/+5.',
    mamaBearTripleCardPowerDescription:
        'Whenever you summon a Beast, give it +10/+10.',

    ghastcoilerName: 'Ghastcoiler',
    ghastcoilerDescription: '',
    ghastcoilerPowerDescription: 'Summon 2 random Deathrattle minions.',
    ghastcoilerTripleCardPowerDescription:
        'Summon 4 random Deathrattle minions.',

    goldrinnName: 'Goldrinn, the Great Wolf',
    goldrinnDescription: '',
    goldrinnPowerDescription: 'Give your Beasts +5/+5.',
    goldrinnTripleCardPowerDescription: 'Give your Beasts +10/+10.',

    // all
    ballOfMinionsName: 'Ball of Minions',
    ballOfMinionsDescription: '',
    ballOfMinionsPowerDescription:
        'When you sell this, give its stats to a random friendly minion.',
    ballOfMinionsTripleCardPowerDescription:
        'When you sell this, give its stats to two random friendly minions.',

    // test
    testName: 'testName',
    testDescription: 'testDescription',
    testPowerDescription: 'testPowerDescription',
    testTripleCardPowerDescription: 'testTripleCardPowerDescription',
};
