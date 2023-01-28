import { Flex } from '@mantine/core';
import { heroIds } from '@prisma/client';

import { HeroCard } from './play-game.hero-card.component';

import { Hero } from '../../models/play-game.hero.models';

export type SelectedHeroProps = {
    selectedHeroId: heroIds;
};
export const SelectedHero = (hero: Hero) => (
    <Flex justify="center">
        <HeroCard
            {...hero}
            selectedHeroId={hero.heroId}
            setHeroId={() => {}}
        ></HeroCard>
    </Flex>
);
