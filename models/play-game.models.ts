import { z } from 'zod';
import { initPlayGameBodySchema } from '../schemas/play-game.schemas';
import { Players } from './player-id.models';

export type PlayGame = {
    gameID: string;
    players: Players;
};

export type InitPlayGameBody = z.infer<typeof initPlayGameBodySchema>;
