import { Resolvers } from '../__generated__/resolvers-types';

import {
    createPendingGameRequest,
    deletePendingGameRequest,
    getPendingGamesRequest,
} from '../controllers/pending-games.controller';

export const resolvers: Resolvers = {
    Query: {
        users: () => [{ id: '123', name: 'John Smitt' }],
        pendingGames: getPendingGamesRequest,
    },
    Mutation: {
        createPendingGameRequest,
        deletePendingGameRequest,
    },
};
