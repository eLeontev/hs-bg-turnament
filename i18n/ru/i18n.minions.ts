import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const ruMinionMessages: I18nTransMessages<namespaces.minions> = {
    alleycatName: 'Бродячий кот',
    alleycatDescription:
        'Всем плевать, что ты кот. Если хочешь чего-то добиться в Прибамбасске, нужны красивые цацки.',
    alleycatPowerDescription: 'Боевой клич: призывает кошку 1/1.',
    alleycatTripleCardPowerDescription: 'Боевой клич: призывает кошку 2/2.',

    scavengingHyenaName: 'Гиена-падальщица',
    scavengingHyenaDescription:
        'Гиены предпочитают питаться костями кодо или крылатых змеев, но на самом деле они едят практически все. Даже вареный лук.',
    scavengingHyenaPowerDescription:
        'Получает +2/+1, когда ваш зверь погибает.',
    scavengingHyenaTripleCardPowerDescription:
        'Получает +4/+2, когда ваш зверь погибает.',
};
