import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

// TODO: add ru lang
export const ruHeroMessages: I18nTransMessages<namespaces.heroes> = {
    heroNameAfkay: `A. F. Kay`,
    heroPowerDescriptionAfkay: `Passive Skip your first two turns. Start with two minions from Tavern Tier 3.`,

    heroNameAlkair: `Al'Akir`,
    heroPowerDescriptionAlkair: `Passive Start of Combat: Give your left-most minion Windfury, Divine Shield, and Taunt.`,

    heroNameAlexstrasza: `Alexstrasza`,
    heroPowerDescriptionAlexstrasza: `Passive After you upgrade Bob's Tavern to Tavern Tier 5, Discover two Dragons.`,

    heroNameAmbassadorFaelin: `Ambassador Faelin`,
    heroPowerDescriptionAmbassadorFaelin: `Passive. Skip your first turn. Discover a Tier 2, 4, and 6 minion to get at those Tiers.`,

    heroNameArannaStarseeker: `Aranna Starseeker`,
    heroPowerDescriptionArannaStarseeker: `Passive After you Refresh 5 times, Bob always has 7 minions. ( left!)`,

    heroNameArchVillainRafaam: `Arch-Villain Rafaam`,
    heroPowerDescriptionArchVillainRafaam: `Next combat, add a plain copy of the first minion you kill to your hand.`,

    heroNameBrukan: `Bru'kan`,
    heroPowerDescriptionBrukan: `Choose an Element. Start of Combat: Call upon that Element.`,

    heroNameCthun: `C'Thun`,
    heroPowerDescriptionCthun: `At end of turn, give a friendly minion +1/+1. Repeat (time, times). (Upgrades each turn!)`,

    heroNameCaptain: `Captain Eudora`,
    heroPowerDescriptionCaptain: `Dig for a Golden minion! ( (Dig, Digs) left.)`,
};
