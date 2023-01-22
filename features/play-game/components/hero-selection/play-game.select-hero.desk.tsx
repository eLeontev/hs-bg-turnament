import { SelectedHero } from './play-game.selected-hero.component';
import { SelectHero } from './play-game.select-hero.component';

import {
    usePlayGameStore,
    selectedHeroIdSelector,
} from '../store/play-game.store';
import { heroes } from '../../../../data/heroes';

export const SelectHeroDesk = () => {
    const selectedHeroId = usePlayGameStore(selectedHeroIdSelector);
    const hero = selectedHeroId && heroes.get(selectedHeroId);

    if (hero) {
        return <SelectedHero {...hero}></SelectedHero>;
    }

    return <SelectHero></SelectHero>;
};
