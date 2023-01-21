import { playGameActions } from '../play-game.enums';

import { setPlayerHeroIdReducer } from './play-game.player.service';

import { usePlayGameStore } from '../components/store/play-game.store';
import { usePlayersStore } from '../components/store/play-game.players.store';

import {
    PlayGameAction,
    PlayGameHeroSelected,
    PlayGamePhases,
} from '../models/play-game.models';

const phaseChangeHandler = ({ phase, phaseDurationInMs }: PlayGamePhases) =>
    usePlayGameStore.setState({ phase, phaseDurationInMs });

const heroSelectedHandler = (playGameHeroSelected: PlayGameHeroSelected) => {
    usePlayersStore.setState({
        players: setPlayerHeroIdReducer(
            usePlayersStore.getState().players,
            playGameHeroSelected
        ),
    });
};

const gameActionHandlers = {
    [playGameActions.phaseChangedTo]: phaseChangeHandler,
    [playGameActions.heroSelected]: heroSelectedHandler,
};

export const playGameactionsHandler = ({
    action,
    payload,
}: PlayGameAction<playGameActions>) => gameActionHandlers[action](payload); // TODO: fix types
