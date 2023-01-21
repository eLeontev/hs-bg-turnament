import { SelectedHero } from './play-game.selected-hero.component';
import { SelectHero } from './play-game.select-hero.component';

import {
    selectedHeroIdSelector,
    usePlayGameStore,
} from './store/play-game.store';

export const SelectHeroDesk = () => {
    const selectedHeroId = usePlayGameStore(selectedHeroIdSelector);

    if (selectedHeroId) {
        return <SelectedHero></SelectedHero>;
    }

    return <SelectHero></SelectHero>;
};
