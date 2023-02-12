import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const ruMinionMessages: I18nTransMessages<namespaces.minions> = {
    minionTypeBeasts: 'звери',
    minionTypeAll: 'все',
    minionTypeNoType: 'без типа',

    // powers
    deathrattle: 'Предсмертный хрип:',
    battlecry: 'Боевой клич:',

    // beasts
    alleycatName: 'Бродячий кот',
    alleycatDescription:
        'Всем плевать, что ты кот. Если хочешь чего-то добиться в Прибамбасске, нужны красивые цацки.',
    alleycatPowerDescription: 'призывает кошку $(attack/hp).',
    alleycatTripleCardPowerDescription: 'призывает кошку $(attack/hp).',

    scavengingHyenaName: 'Гиена-падальщица',
    scavengingHyenaDescription:
        'Гиены предпочитают питаться костями кодо или крылатых змеев, но на самом деле они едят практически все. Даже вареный лук.',
    scavengingHyenaPowerDescription:
        'Получает +2/+1, когда ваш зверь погибает.',
    scavengingHyenaTripleCardPowerDescription:
        'Получает +4/+2, когда ваш зверь погибает.',

    leapfroggerName: 'Попрыгуха',
    leapfroggerDescription: '',
    leapfroggerPowerDescription:
        'ваш зверь получает +1/+1 и этот «Предсмертный хрип».',
    leapfroggerTripleCardPowerDescription:
        'ваш зверь получает +2/+2 и этот «Предсмертный хрип».',

    rabidSauroliskName: 'Бешеный завролиск',
    rabidSauroliskDescription: '',
    rabidSauroliskPowerDescription:
        'После того как вы разыгрываете существо с «Предсмертным хрипом», получает +1/+2.',
    rabidSauroliskTripleCardPowerDescription:
        'После того как вы разыгрываете существо с «Предсмертным хрипом», получает +2/+4.',

    sewerRatName: 'Сточная крыса',
    sewerRatDescription: '',
    sewerRatPowerDescription:
        'призывает черепаху $(attack/hp) с «Провокацией».',
    sewerRatTripleCardPowerDescription:
        'призывает черепаху $(attack/hp) с «Провокацией».',

    monstrousMacawName: 'Страшный ара',
    monstrousMacawDescription: '',
    monstrousMacawPowerDescription:
        'После того как это существо атакует, вызывает срабатывание «Предсмертного хрипа» другого вашего существа.',
    monstrousMacawTripleCardPowerDescription:
        'После того как это существо атакует, дважды вызывает срабатывание «Предсмертного хрипа» другого вашего существа.',

    ratPackName: 'Крысиная стая',
    ratPackDescription:
        'Странники в ночи бывают разные, и не всегда прекрасные.',
    ratPackPowerDescription:
        'призывает крысу $(attack/hp) за каждую единицу атаки этого существа.',
    ratPackTripleCardPowerDescription:
        'призывает крысу $(attack/hp) за каждую единицу атаки этого существа.',

    caveHydraName: 'Пещерная гидра',
    caveHydraDescription: 'Можно улучшить до пещерного скрытня.',
    caveHydraPowerDescription:
        'Также наносит урон существам по обе стороны от цели.',
    caveHydraTripleCardPowerDescription:
        'Также наносит урон существам по обе стороны от цели.',

    reanimatingRattlerName: 'Оживляющая змея',
    reanimatingRattlerDescription: '',
    reanimatingRattlerPowerDescription: 'ваш зверь получает «Перерождение».',
    reanimatingRattlerTripleCardPowerDescription:
        'ваш зверь получает «Перерождение».',

    savannahHighmaneName: 'Высокогрив саванны',
    savannahHighmaneDescription:
        'Где-то в джунглях, в дремучих джунглях... льва сейчас доедают гиены.',
    savannahHighmanePowerDescription: 'призывает $(count) гиен $(attack/hp).',
    savannahHighmaneTripleCardPowerDescription:
        'призывает $(count) гиен $(attack/hp).',

    agamagganName: 'Агамагган, Великий Вепрь',
    agamagganDescription: '',
    agamagganPowerDescription: 'Ваши кровавые самоцветы дают еще +1/+1.',
    agamagganTripleCardPowerDescription:
        'Ваши кровавые самоцветы дают еще +2/+2.',

    mamaBearName: 'Мамаша-медведица',
    mamaBearDescription: '',
    mamaBearPowerDescription: 'Когда вы призываете зверя, он получает +5/+5.',
    mamaBearTripleCardPowerDescription:
        'Когда вы призываете зверя, он получает +10/+10.',

    ghastcoilerName: 'Гибельный змей',
    ghastcoilerDescription: '',
    ghastcoilerPowerDescription:
        'призывает $(count) случайных существ с «Предсмертным хрипом».',
    ghastcoilerTripleCardPowerDescription:
        'призывает $(count) случайных существ с «Предсмертным хрипом».',

    goldrinnName: 'Голдринн, Великий волк',
    goldrinnDescription: '',
    goldrinnPowerDescription: 'ваши звери получают +5/+5.',
    goldrinnTripleCardPowerDescription: 'ваши звери получают +10/+10.',

    // beasts-summoned
    tabbycatName: 'Домашняя кошка',
    tabbycatDescription: '',
    tabbycatPowerDescription: '',
    tabbycatTripleCardPowerDescription: '',

    turtleName: 'Черепашонок',
    turtleDescription: '',
    turtlePowerDescription: 'Провокация',
    turtleTripleCardPowerDescription: 'Провокация',

    ratName: 'Крысы',
    ratDescription: '',
    ratPowerDescription: '',
    ratTripleCardPowerDescription: '',

    hyenaName: 'Гиена',
    hyenaDescription: '',
    hyenaPowerDescription: '',
    hyenaTripleCardPowerDescription: '',

    // all
    ballOfMinionsName: 'Ворох существ',
    ballOfMinionsDescription: '',
    ballOfMinionsPowerDescription:
        'Когда вы продаете это существо, ваше случайное существо получает прибавку в размере его характеристик.',
    ballOfMinionsTripleCardPowerDescription:
        'Когда вы продаете это существо, два ваших случайных существа получают прибавку в размере его характеристик.',

    // test
    testName: 'testName',
    testDescription: 'testDescription',
    testPowerDescription: 'testPowerDescription',
    testTripleCardPowerDescription: 'testTripleCardPowerDescription',
};
