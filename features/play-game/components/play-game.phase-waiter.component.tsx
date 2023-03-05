import { useEffect, useState } from 'react';

import { OverlayLoader } from '../../common/components/loader.component';

import {
    phaseDurationInMsSelector,
    phaseStartDateSelector,
    usePlayGameStore,
} from './store/play-game.store';

import { getDelayIMsFromNow } from '../../../utils.ts/date.utils';

export const PhaseWaiterComponent = () => {
    const [shouldDisplayWaiter, setDisplayWaiter] = useState(false);

    const phaseStartDate = usePlayGameStore(phaseStartDateSelector);
    const phaseDurationInMs = usePlayGameStore(phaseDurationInMsSelector);

    useEffect(() => {
        setDisplayWaiter(false);

        const timer = setTimeout(
            () => setDisplayWaiter(true),
            getDelayIMsFromNow(phaseStartDate, phaseDurationInMs)
        );

        return () => clearTimeout(timer);
    }, [setDisplayWaiter, phaseStartDate, phaseDurationInMs]);

    return <OverlayLoader visible={shouldDisplayWaiter}></OverlayLoader>;
};
