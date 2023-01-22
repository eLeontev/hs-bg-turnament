import { z } from 'zod';

import { heroIdSchema } from '../schemas/play-game.hero.schemas';

export type HeroId = z.infer<typeof heroIdSchema>;
export type HeroIds = Array<HeroId>;

export type Hero = {
    heroId: HeroId;
    name: string;
    avatarSrc: string;
    powerDescription: string;
};

export type Heroes = Map<HeroId, Hero>;
