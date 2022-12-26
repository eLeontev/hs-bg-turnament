import { z } from 'zod';

import {
    createPendingGameBodySchema,
    deletePendingGameBodySchema,
    joinPendingGameBodySchema,
    leavePendingGameBodySchema,
    startPendingGameBodySchema,
} from '../schemas/pending-games.schemas';
import { Players } from './player-id.models';

export type PendingGame = {
    authorId: string;
    gameId: string;
    gameName: string;
    authorLogin: string;
    createdDate: string;
    players: Players;
};
export type PendingGames = Array<PendingGame>;

export type PendingGamesQuery = { pendingGames: PendingGames };

export type CreatePendingGameBody = z.infer<typeof createPendingGameBodySchema>;
export type DeletePendingGameBody = z.infer<typeof deletePendingGameBodySchema>;

export type JoinPendingGameBody = z.infer<typeof joinPendingGameBodySchema>;
export type LeavePendingGameBody = z.infer<typeof leavePendingGameBodySchema>;

export type StartPendingGameBody = z.infer<typeof startPendingGameBodySchema>;
