import { playGamePhases } from '@prisma/client';
import { dateInUtcString } from '../../../utils.ts/date.utils';
import { GridComponent } from '../../common/components/table.grid.component';
import {
    durationFormats,
    Timer,
} from '../../common/components/timer.component';

import { SelectHeroDesk } from './hero-selection/play-game.select-hero.desk';
import { RecruitDesk } from './recruit/play-game.recruit.desk';

import {
    phaseDurationInMsSelector,
    phaseSelector,
    phaseStartDateSelector,
    usePlayGameStore,
} from './store/play-game.store';

const playGamePhaseDesks = {
    [playGamePhases.heroSelection]: SelectHeroDesk,
    [playGamePhases.recruit]: RecruitDesk,
    [playGamePhases.combat]: SelectHeroDesk,
};

export const PlayGameDesk = () => {
    const playGamePhase = usePlayGameStore(phaseSelector);
    const phaseStartDate = usePlayGameStore(phaseStartDateSelector);
    const phaseDurationInMs = usePlayGameStore(phaseDurationInMsSelector);

    const PlayGamePhaseDesk = playGamePhaseDesks[playGamePhase];

    return (
        <GridComponent>
            <Timer
                timeLeftUTC={phaseStartDate}
                durationInMs={phaseDurationInMs}
                durationFormat={durationFormats.seconds}
                labelFontSize={12}
                size="xl"
            ></Timer>
            <PlayGamePhaseDesk></PlayGamePhaseDesk>
        </GridComponent>
    );
};
