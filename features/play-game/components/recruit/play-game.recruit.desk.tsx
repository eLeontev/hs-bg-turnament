import { useInitialRecruitPhaseData } from '../../hooks/play-game.hooks';
import { usePlayGameStore } from '../store/play-game.store';

const Test = () => {
    const data = usePlayGameStore();
    console.log(data);
    return <>recruit desk</>;
};

export const RecruitDesk = () => {
    useInitialRecruitPhaseData();

    return <Test></Test>;
};
