import { PlayGamePlayerDetails } from '../components/store/play-game.players.store';

import { PlayerKey } from '../../../models/common.models';

export const formPlayGamePlayers = (players: Array<PlayGamePlayerDetails>) =>
    players.reduce(
        (
            map: Map<PlayerKey, PlayGamePlayerDetails>,
            player: PlayGamePlayerDetails
        ): Map<PlayerKey, PlayGamePlayerDetails> =>
            map.set(player.playerKey, { ...player }),
        new Map<PlayerKey, PlayGamePlayerDetails>()
    );
