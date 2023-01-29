import { playGameActions } from '../play-game.enums';

import { setPlayerHeroIdReducer } from './play-game.player.service';

import { usePlayGameStore } from '../components/store/play-game.store';
import { usePlayersStore } from '../components/store/play-game.players.store';

import {
    GameActionHandlers,
    PlayGameAction,
    PlayGameHeroesSelected,
    PlayGameHeroSelected,
    PlayGamePhaseData,
} from '../models/play-game.models';

const phaseChangeHandler = (playGamePhaseData: PlayGamePhaseData) =>
    usePlayGameStore.setState(playGamePhaseData);

const heroSelectedHandler = (playGameHeroSelected: PlayGameHeroSelected) =>
    usePlayersStore.setState({
        players: setPlayerHeroIdReducer(
            usePlayersStore.getState().players,
            playGameHeroSelected
        ),
    });

const heroesSelectedHandler = (
    playGameHeroesSelected: PlayGameHeroesSelected
) => playGameHeroesSelected.forEach(heroSelectedHandler);

const gameActionHandlers: GameActionHandlers = {
    [playGameActions.phaseChangedTo]: phaseChangeHandler,
    [playGameActions.heroSelected]: heroSelectedHandler,
    [playGameActions.heroesSelected]: heroesSelectedHandler,
};

export const playGameActionsHandler = <T extends playGameActions>({
    action,
    payload,
}: PlayGameAction<T>) => gameActionHandlers[action](payload);
