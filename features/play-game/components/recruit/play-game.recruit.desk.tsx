import { usePlayGameStore } from '../store/play-game.store';

export const RecruitDesk = () => {
    const data = usePlayGameStore();
    console.log(data);
    return <>recruit desk</>;
};
