import { heroIds } from '@prisma/client';
import {
    Hero,
    Heroes,
} from '../features/play-game/models/play-game.hero.models';
import { heroI18nKeys } from '../i18n/enums/i18n.hero.enums';

const afkayHero: Hero = {
    heroId: heroIds.afkay,
    avatarSrc: '/hero-avatars/afkay.avatar.png',
    name: heroI18nKeys.heroNameAfkay,
    powerDescription: heroI18nKeys.heroPowerDescriptionAfkay,
};

const alkairHero: Hero = {
    heroId: heroIds.alkair,
    avatarSrc: '/hero-avatars/alkair.avatar.png',
    name: heroI18nKeys.heroNameAlkair,
    powerDescription: heroI18nKeys.heroPowerDescriptionAlkair,
};

const alexstraszaHero: Hero = {
    heroId: heroIds.alexstrasza,
    avatarSrc: '/hero-avatars/alexstrasza.avatar.png',
    name: heroI18nKeys.heroNameAlexstrasza,
    powerDescription: heroI18nKeys.heroPowerDescriptionAlexstrasza,
};

const ambassadorFaelinHero: Hero = {
    heroId: heroIds.ambassadorFaelin,
    avatarSrc: '/hero-avatars/ambassador.avatar.png',
    name: heroI18nKeys.heroNameAmbassadorFaelin,
    powerDescription: heroI18nKeys.heroPowerDescriptionAmbassadorFaelin,
};

const arannaStarseekerHero: Hero = {
    heroId: heroIds.arannaStarseeker,
    avatarSrc: '/hero-avatars/aranna.avatar.png',
    name: heroI18nKeys.heroNameArannaStarseeker,
    powerDescription: heroI18nKeys.heroPowerDescriptionArannaStarseeker,
};

const archVillainRafaamHero: Hero = {
    heroId: heroIds.archVillainRafaam,
    avatarSrc: '/hero-avatars/arch.avatar.png',
    name: heroI18nKeys.heroNameArchVillainRafaam,
    powerDescription: heroI18nKeys.heroPowerDescriptionArchVillainRafaam,
};

const brukanHero: Hero = {
    heroId: heroIds.brukan,
    avatarSrc: '/hero-avatars/brukan.avatar.png',
    name: heroI18nKeys.heroNameBrukan,
    powerDescription: heroI18nKeys.heroPowerDescriptionBrukan,
};

const cthunHero: Hero = {
    heroId: heroIds.cthun,
    avatarSrc: '/hero-avatars/cthun.avatar.png',
    name: heroI18nKeys.heroNameCthun,
    powerDescription: heroI18nKeys.heroPowerDescriptionCthun,
};

const captainHero: Hero = {
    heroId: heroIds.captain,
    avatarSrc: '/hero-avatars/captain.avatar.png',
    name: heroI18nKeys.heroNameCaptain,
    powerDescription: heroI18nKeys.heroPowerDescriptionCaptain,
};

export const heroes: Heroes = new Map([
    [afkayHero.heroId, afkayHero],
    [alkairHero.heroId, alkairHero],
    [alexstraszaHero.heroId, alexstraszaHero],
    [ambassadorFaelinHero.heroId, ambassadorFaelinHero],
    [arannaStarseekerHero.heroId, arannaStarseekerHero],
    [archVillainRafaamHero.heroId, archVillainRafaamHero],
    [brukanHero.heroId, brukanHero],
    [cthunHero.heroId, cthunHero],
    [captainHero.heroId, captainHero],
]);
