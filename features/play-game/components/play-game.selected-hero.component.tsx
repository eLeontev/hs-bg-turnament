import { useRecoilValue } from 'recoil';

import { playsGameSelectedHeroIdState } from './atoms/play-game.selected-hero-id.atom';

export const SelectedHero = () => {
    const selectedHeroId = useRecoilValue(playsGameSelectedHeroIdState);

    return <b>{selectedHeroId}</b>;
};
