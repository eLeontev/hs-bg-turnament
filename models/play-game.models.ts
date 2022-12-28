import { PrivatePlayerId } from './common.models';
import { PlayerId, Players } from './player-id.models';

export type PlayGame = {
    playerIds: Map<PrivatePlayerId, PlayerId>;
    players: Players;
    data: any;
};
