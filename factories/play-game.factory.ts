import { PlayGame } from '../models/play-game.models';
import { Players } from '../models/player-id.models';

export const createPlayGameFactory = (players: Players): PlayGame => ({
    playerIds: new Map(),
    players,
    data: undefined,
});
