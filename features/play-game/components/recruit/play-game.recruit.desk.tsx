import { useInitialRecruitPhaseData } from '../../hooks/play-game.hooks';
import { usePlayerStore } from '../store/play-game.player.store';

const UpgradeTavernTest = () => {
    const data = usePlayerStore();
    console.log(data);
    return <>UpgradeTavernTest</>;
};

const BuyMinionTest = () => {
    // const data = usePlayGameStore();
    // console.log(data);
    return <>BuyMinionTest</>;
};

const PlayMinionTest = () => {
    // const data = usePlayGameStore();
    // console.log(data);
    return <>PlayMinionTest</>;
};

const SellMinionTest = () => {
    // const data = usePlayGameStore();
    // console.log(data);
    return <>SellMinionTest</>;
};

export const RecruitDesk = () => {
    useInitialRecruitPhaseData();

    return <UpgradeTavernTest></UpgradeTavernTest>;
};
