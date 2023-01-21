import {
    selectedHeroIdSelector,
    usePlayGameStore,
} from './store/play-game.store';

export const SelectedHero = () => {
    const selectedHeroId = usePlayGameStore(selectedHeroIdSelector);

    return <b>{selectedHeroId}</b>;
};
