import { useEffect } from 'react';
import { usePlayGameStore } from '../store/play-game.store';

export const CombatDesk = () => {
    const data = usePlayGameStore();
    console.log(data);
    useEffect(() => {
        setTimeout(() => {
            data.switchToRecruitPhase();
        }, data.phaseDurationInMs);
    }, [data]);
    return <>combat desk</>;
};
