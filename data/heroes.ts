import {
    Hero,
    Heroes,
} from '../features/play-game/models/play-game.hero.models';

const afkayHero: Hero = {
    heroId: 'afkay',
    name: 'A. F. Kay',
    avatarUrl: './hero-avatars/afkay.avatar.png',
    powerDescription:
        'Passive Skip your first two turns. Start with two minions from Tavern Tier 3.',
};

const alkairHero: Hero = {
    heroId: 'alkair',
    name: `Al'Akir`,
    avatarUrl: './hero-avatars/alkair.avatar.png',
    powerDescription:
        'Passive Start of Combat: Give your left-most minion Windfury, Divine Shield, and Taunt.',
};

const alexstraszaHero: Hero = {
    heroId: 'alexstrasza',
    name: `Alexstrasza`,
    avatarUrl: './hero-avatars/alexstrasza.avatar.png',
    powerDescription: `Passive After you upgrade Bob's Tavern to Tavern Tier 5, Discover two Dragons.`,
};

export const heroes: Heroes = new Map([
    [afkayHero.heroId, afkayHero],
    [alkairHero.heroId, alkairHero],
    [alexstraszaHero.heroId, alexstraszaHero],
]);
