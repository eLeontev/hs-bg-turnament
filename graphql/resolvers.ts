import { Resolvers } from '../__generated__/resolvers-types';

import {
    createPendingGameRequest,
    deletePendingGameRequest,
    getPendingGamesRequest,
    joinPendingGameRequest,
    leavePendingGameRequest,
    startPendingGameRequest,
} from '../controllers/pending-games.controller';

export const resolvers: Resolvers = {
    Query: {
        pendingGames: getPendingGamesRequest,
    },
    Mutation: {
        createPendingGameRequest,
        deletePendingGameRequest,
        joinPendingGameRequest,
        leavePendingGameRequest,
        startPendingGameRequest,
    },
};
