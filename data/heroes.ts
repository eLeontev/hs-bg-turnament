import { heroIds } from '@prisma/client';
import {
    Hero,
    Heroes,
} from '../features/play-game/models/play-game.hero.models';

const afkayHero: Hero = {
    heroId: heroIds.afkay,
    name: 'A. F. Kay',
    avatarUrl: '../public/hero-avatars/afkay.avatar.png',
    powerDescription:
        'Passive Skip your first two turns. Start with two minions from Tavern Tier 3.',
};

const alkairHero: Hero = {
    heroId: heroIds.alkair,
    name: `Al'Akir`,
    avatarUrl: '../public/hero-avatars/alkair.avatar.png',
    powerDescription:
        'Passive Start of Combat: Give your left-most minion Windfury, Divine Shield, and Taunt.',
};

const alexstraszaHero: Hero = {
    heroId: heroIds.alexstrasza,
    name: 'Alexstrasza',
    avatarUrl: '../public/hero-avatars/alexstrasza.avatar.png',
    powerDescription: `Passive After you upgrade Bob's Tavern to Tavern Tier 5, Discover two Dragons.`,
};

const ambassadorHero: Hero = {
    heroId: heroIds.ambassadorFaelin,
    name: 'Ambassador Faelin',
    avatarUrl: '../public/hero-avatars/ambassador.avatar.png',
    powerDescription: `Passive. Skip your first turn. Discover a Tier 2, 4, and 6 minion to get at those Tiers.`,
};

const arannaHero: Hero = {
    heroId: heroIds.arannaStarseeker,
    name: 'Aranna Starseeker',
    avatarUrl: '../public/hero-avatars/aranna.avatar.png',
    powerDescription: `Passive After you Refresh 5 times, Bob always has 7 minions. ( left!)`,
};

const archVillainRafaamHero: Hero = {
    heroId: heroIds.archVillainRafaam,
    name: 'Arch-Villain Rafaam',
    avatarUrl: '../public/hero-avatars/alexstrasza.avatar.png',
    powerDescription: `Next combat, add a plain copy of the first minion you kill to your hand.`,
};

const brukanHeor: Hero = {
    heroId: heroIds.brukan,
    name: `Bru'kan`,
    avatarUrl: '../public/hero-avatars/brukan.avatar.png',
    powerDescription: `Choose an Element. Start of Combat: Call upon that Element.`,
};

const cthunHeor: Hero = {
    heroId: heroIds.cthun,
    name: `C'Thun`,
    avatarUrl: '../public/hero-avatars/cthun.avatar.png',
    powerDescription: `At end of turn, give a friendly minion +1/+1. Repeat (time, times). (Upgrades each turn!)`,
};

const captainHeor: Hero = {
    heroId: heroIds.cthun,
    name: 'Captain Eudora',
    avatarUrl: '../public/hero-avatars/captain.avatar.png',
    powerDescription: `Dig for a Golden minion! ( (Dig, Digs) left.)`,
};

export const heroes: Heroes = new Map([
    [afkayHero.heroId, afkayHero],
    [alkairHero.heroId, alkairHero],
    [alexstraszaHero.heroId, alexstraszaHero],
    [ambassadorHero.heroId, ambassadorHero],
    [arannaHero.heroId, arannaHero],
    [archVillainRafaamHero.heroId, archVillainRafaamHero],
    [brukanHeor.heroId, brukanHeor],
    [cthunHeor.heroId, cthunHeor],
    [captainHeor.heroId, captainHeor],
]);
