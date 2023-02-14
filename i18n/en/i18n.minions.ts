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
    alleycatPowerDescription: 'Summon a $(attack/hp) Cat.',
    alleycatTripleCardPowerDescription: 'Summon a $(attack/hp) Cat.',

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
    sewerRatPowerDescription: 'Summon a $(attack/hp) Turtle with Taunt.',
    sewerRatTripleCardPowerDescription:
        'Summon a $(attack/hp) Turtle with Taunt.',

    monstrousMacawName: 'Monstrous Macaw',
    monstrousMacawDescription: '',
    monstrousMacawPowerDescription: `After this attacks, trigger another friendly minion's Deathrattle.`,
    monstrousMacawTripleCardPowerDescription: `After this attacks, trigger another friendly minion's Deathrattle. Twice`,

    ratPackName: 'Rat Pack',
    ratPackDescription: `He's gonna do it his way.`,
    ratPackPowerDescription: `Summon a number of $(attack/hp) Rats equal to this minion's Attack.`,
    ratPackTripleCardPowerDescription: `Summon a number of $(attack/hp) Rats equal to this minion's Attack.`,

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
    savannahHighmanePowerDescription: 'Summon $(count) $(attack/hp) Hyenas.',
    savannahHighmaneTripleCardPowerDescription:
        'Summon $(count) $(attack/hp) Hyenas.',

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
    ghastcoilerPowerDescription: 'Summon $(count) random Deathrattle minions.',
    ghastcoilerTripleCardPowerDescription:
        'Summon $(count) random Deathrattle minions.',

    goldrinnName: 'Goldrinn, the Great Wolf',
    goldrinnDescription: '',
    goldrinnPowerDescription: 'Give your Beasts +5/+5.',
    goldrinnTripleCardPowerDescription: 'Give your Beasts +10/+10.',

    // beasts-summoned
    tabbycatName: 'Tabbycat',
    tabbycatDescription: '',
    tabbycatPowerDescription: '',
    tabbycatTripleCardPowerDescription: '',

    turtleName: 'Turtle',
    turtleDescription: '',
    turtlePowerDescription: 'Taunt',
    turtleTripleCardPowerDescription: 'Taunt',

    ratName: 'Rat',
    ratDescription: '',
    ratPowerDescription: '',
    ratTripleCardPowerDescription: '',

    hyenaName: 'Hyena',
    hyenaDescription: '',
    hyenaPowerDescription: '',
    hyenaTripleCardPowerDescription: '',

    // all
    ballOfMinionsName: 'Ball of Minions',
    ballOfMinionsDescription: '',
    ballOfMinionsPowerDescription:
        'When you sell this, give its stats to a random friendly minion.',
    ballOfMinionsTripleCardPowerDescription:
        'When you sell this, give its stats to two random friendly minions.',

    // no-type
    brannName: 'Brann Bronzebeard',
    brannDescription: 'Contains 75% more fiber than his brother Magni!',
    brannPowerDescription: 'Your Battlecries trigger twice.',
    brannTripleCardPowerDescription: 'Your Battlecries trigger three times.',

    // test
    testName: 'testName',
    testDescription: 'testDescription',
    testPowerDescription: 'testPowerDescription',
    testTripleCardPowerDescription: 'testTripleCardPowerDescription',
};
