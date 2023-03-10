import { z } from 'zod';

import {
    createPendingGameBodySchema,
    deletePendingGameBodySchema,
    joinPendingGameBodySchema,
    leavePendingGameBodySchema,
} from './pending-games.schemas';

import { PendingGamePlayers, PublicPlayer } from '../player/player.models';

export type PendingGame = {
    authorId: string;
    gameId: string;
    gameName: string;
    authorLogin: string;
    createdDate: string;
    players: Array<PublicPlayer>;
};
export type OperationPendingGame = Exclude<PendingGame, 'players'> & {
    players: PendingGamePlayers;
};

export type PendingGames = Array<PendingGame>;

export type PendingGamesQuery = { pendingGames: PendingGames };

export type CreatePendingGameBody = z.infer<typeof createPendingGameBodySchema>;
export type DeletePendingGameBody = z.infer<typeof deletePendingGameBodySchema>;

export type JoinPendingGameBody = z.infer<typeof joinPendingGameBodySchema>;
export type LeavePendingGameBody = z.infer<typeof leavePendingGameBodySchema>;
