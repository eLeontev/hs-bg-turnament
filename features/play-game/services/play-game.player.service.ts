import {
    PlayGamePlayerDetails,
    PlayGameStorePlayers,
} from '../components/store/play-game.players.store';

import { PlayerKey } from '../../../models/common.models';
import { PlayGameHeroSelected } from '../models/play-game.models';

export const formPlayGamePlayers = (players: Array<PlayGamePlayerDetails>) =>
    players.reduce(
        (
            map: Map<PlayerKey, PlayGamePlayerDetails>,
            player: PlayGamePlayerDetails
        ): Map<PlayerKey, PlayGamePlayerDetails> =>
            map.set(player.playerKey, { ...player }),
        new Map<PlayerKey, PlayGamePlayerDetails>()
    );

export const setPlayerHeroIdReducer = (
    players: PlayGameStorePlayers,
    { playerKey, selectedHeroId }: PlayGameHeroSelected
): PlayGameStorePlayers => {
    const player = players.get(playerKey) as PlayGamePlayerDetails;
    players.set(playerKey, { ...player, selectedHeroId });

    return new Map(players); // TODO: investigate zustand immutable flow
};
