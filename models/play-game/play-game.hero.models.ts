import { z } from 'zod';

import { heroIdSchema } from '../../schemas/play-game.hero.schemas';

export type HeroId = z.infer<typeof heroIdSchema>;

export type Hero = {
    heroId: HeroId;
    name: string;
    avatarUrl: string;
    powerDescription: string;
};

export type Heroes = Map<HeroId, Hero>;
