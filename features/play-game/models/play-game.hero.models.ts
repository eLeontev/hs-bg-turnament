import { z } from 'zod';

import { heroIdSchema } from '../schemas/play-game.hero.schemas';

import { heroI18nKeys } from '../../../i18n/enums/i18n.hero.enums';

export type HeroId = z.infer<typeof heroIdSchema>;
export type HeroIds = Array<HeroId>;

export type Hero = {
    heroId: HeroId;
    avatarSrc: string;
    name: heroI18nKeys;
    powerDescription: heroI18nKeys;
};

export type Heroes = Map<HeroId, Hero>;
