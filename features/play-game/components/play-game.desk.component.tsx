import { playGamePhases } from '@prisma/client';
import { GridComponent } from '../../common/components/table.grid.component';
import {
    durationFormats,
    Timer,
} from '../../common/components/timer.component';

import { SelectHeroDesk } from './hero-selection/play-game.select-hero.desk';

import {
    phaseDurationInMsSelector,
    phaseSelector,
    usePlayGameStore,
} from './store/play-game.store';

const playGamePhaseDesks = {
    [playGamePhases.heroSelection]: SelectHeroDesk,
    [playGamePhases.recruit]: SelectHeroDesk,
    [playGamePhases.combat]: SelectHeroDesk,
};

export const PlayGameDesk = () => {
    const playGamePhase = usePlayGameStore(phaseSelector);

    const PlayGamePhaseDesk = playGamePhaseDesks[playGamePhase];
    const phaseDurationInMs = usePlayGameStore(phaseDurationInMsSelector);

    return (
        <GridComponent>
            <Timer
                timeLeftUTC={new Date().toUTCString()}
                durationInMs={phaseDurationInMs}
                durationFormat={durationFormats.seconds}
                labelFontSize={12}
                size="xl"
            ></Timer>
            <PlayGamePhaseDesk></PlayGamePhaseDesk>
        </GridComponent>
    );
};
