import { Container } from '@mantine/core';

import { playGamePhases } from '@prisma/client';

import { SelectHeroDesk } from './hero-selection/play-game.select-hero.desk';

import { phaseSelector, usePlayGameStore } from './store/play-game.store';

const playGamePhaseDesks = {
    [playGamePhases.heroSelection]: SelectHeroDesk,
    [playGamePhases.recruit]: SelectHeroDesk,
    [playGamePhases.combat]: SelectHeroDesk,
    [playGamePhases.initialisation]: () => null,
};

export const PlayGameDesk = () => {
    const playGamePhase = usePlayGameStore(phaseSelector);

    const PlayGamePhaseDesk = playGamePhaseDesks[playGamePhase];

    return (
        <Container>
            <PlayGamePhaseDesk></PlayGamePhaseDesk>
        </Container>
    );
};
