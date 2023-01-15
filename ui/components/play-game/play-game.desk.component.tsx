import { useRecoilValue } from 'recoil';
import { Container } from '@mantine/core';

import { playGamePhases } from '@prisma/client';

import { SelectHeroDesk } from './play-game.select-hero.desk';

import { playGamePhaseState } from '../../atoms/play-game.phases.atom';

const playGamePhaseDesks = {
    [playGamePhases.heroSelection]: SelectHeroDesk,
    [playGamePhases.recruit]: SelectHeroDesk,
    [playGamePhases.combat]: SelectHeroDesk,
};

export const PlayGameDesk = () => {
    const playGamePhase = useRecoilValue(playGamePhaseState);

    const PlayGamePhaseDesk = playGamePhaseDesks[playGamePhase];

    return (
        <Container>
            <PlayGamePhaseDesk></PlayGamePhaseDesk>
        </Container>
    );
};
