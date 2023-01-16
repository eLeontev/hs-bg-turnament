import { Resolvers } from '../__generated__/resolvers-types';

import {
    createPendingGameRequest,
    deletePendingGameRequest,
    getPendingGamesRequest,
    joinPendingGameRequest,
    leavePendingGameRequest,
} from '../features/pending-games/pending-games.controller';

export const resolvers: Resolvers = {
    Query: {
        pendingGames: getPendingGamesRequest,
    },
    Mutation: {
        createPendingGameRequest,
        deletePendingGameRequest,
        joinPendingGameRequest,
        leavePendingGameRequest,
    },
};
