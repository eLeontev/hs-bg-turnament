import { Resolvers } from '../__generated__/resolvers-types';

import {
    createPendingGameRequest,
    deletePendingGameRequest,
    getPendingGamesRequest,
    joinPendingGameRequest,
    leavePendingGameRequest,
    startPendingGameRequest,
} from '../controllers/pending-games.controller';
import { initPlayGameRequest } from '../controllers/play-game.controller';

export const resolvers: Resolvers = {
    Query: {
        pendingGames: getPendingGamesRequest,
        initPlayGameRequest,
    },
    Mutation: {
        createPendingGameRequest,
        deletePendingGameRequest,
        joinPendingGameRequest,
        leavePendingGameRequest,
        startPendingGameRequest,
    },
};
