import { Flex } from '@mantine/core';
import { heroIds } from '@prisma/client';

import { GridComponent } from '../../../common/components/table.grid.component';
import { HeroCard } from './play-game.hero-card.component';
import { Timer } from '../../../common/components/timer.component';

import {
    phaseDurationInMsSelector,
    usePlayGameStore,
} from '../store/play-game.store';

import { Hero } from '../../models/play-game.hero.models';

export type SelectedHeroProps = {
    selectedHeroId: heroIds;
};
export const SelectedHero = (hero: Hero) => {
    const phaseDurationInMs = usePlayGameStore(phaseDurationInMsSelector);

    return (
        <GridComponent>
            <Timer
                timeLeftUTC={new Date().toUTCString()}
                durationInMs={phaseDurationInMs}
                size="xl"
            ></Timer>
            <Flex justify="center">
                <HeroCard
                    {...hero}
                    selectedHeroId={hero.heroId}
                    setHeroId={() => {}}
                ></HeroCard>
            </Flex>
        </GridComponent>
    );
};
