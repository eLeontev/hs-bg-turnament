import { useRecoilValue } from 'recoil';

import { SelectedHero } from './play-game.selected-hero.component';
import { SelectHero } from './play-game.select-hero.component';

import { playsGameSelectedHeroIdState } from './atoms/play-game.selected-hero-id.atom';

export const SelectHeroDesk = () => {
    const selectedHeroId = useRecoilValue(playsGameSelectedHeroIdState);

    if (selectedHeroId) {
        return <SelectedHero></SelectedHero>;
    }

    return <SelectHero></SelectHero>;
};
