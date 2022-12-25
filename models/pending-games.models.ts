import { z } from 'zod';

export type PendingGame = {
    authorId: string;
    gameId: string;
    authorLogin: string;
    createdDate: string;
    countOfPlayers: number;
};
export type PendingGames = Array<PendingGame>;

export type PendingGamesQuery = { pendingGames: PendingGames };

const authorId = z.object({ authorId: z.string() });
const authorLogin = z.object({ authorLogin: z.string() });

export const deletePendingGameBody = authorId;
export const createPendingGameBody = authorId.merge(authorLogin);

export type DeletePendingGameBody = z.infer<typeof deletePendingGameBody>;
export type CreatePendingGameBody = z.infer<typeof createPendingGameBody>;
