import { z } from 'zod';

import {
    createPendingGameBodySchema,
    deletePendingGameBodySchema,
} from '../schemas/pending-games.schemas';

export type PendingGame = {
    authorId: string;
    gameId: string;
    gameName: string;
    authorLogin: string;
    createdDate: string;
    countOfPlayers: number;
};
export type PendingGames = Array<PendingGame>;

export type PendingGamesQuery = { pendingGames: PendingGames };

export type CreatePendingGameBody = z.infer<typeof createPendingGameBodySchema>;
export type DeletePendingGameBody = z.infer<typeof deletePendingGameBodySchema>;

export type PendingGameMutationConfig<B> = Partial<B>;
