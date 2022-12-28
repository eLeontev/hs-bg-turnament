import { z } from 'zod';
import { initPlayGameBodySchema } from '../schemas/play-game.schemas';
import { PlayerId, PrivatePlayerId } from './common.models';
import { Players } from './player-id.models';

export type PlayGame = {
    playerIds: Map<PrivatePlayerId, PlayerId>;
    players: Players;
    data: any;
};

export type InitPlayGameBody = z.infer<typeof initPlayGameBodySchema>;
