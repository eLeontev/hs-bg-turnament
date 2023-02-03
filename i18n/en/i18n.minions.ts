import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const enMinionMessages: I18nTransMessages<namespaces.minions> = {
    alleycatName: 'Alleycat',
    alleycatDescription: 'To be a cool cat in Gadgetzan, you gotta have bling.',
    alleycatPowerDescription: 'Battlecry: Summon a 1/1 Cat.',
    alleycatTripleCardPowerDescription: 'Battlecry: Summon a 2/2 Cat.',

    scavengingHyenaName: 'Scavenging Hyena',
    scavengingHyenaDescription: `Hyenas prefer the bones of kodos or windserpents, but they'll eat pretty much anything. Even Brussels sprouts.`,
    scavengingHyenaPowerDescription:
        'Whenever a friendly Beast dies, gain +2/+1.',
    scavengingHyenaTripleCardPowerDescription:
        'Whenever a friendly Beast dies, gain +4/+2.',
};
