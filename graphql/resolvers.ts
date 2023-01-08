import { Resolvers } from '../__generated__/resolvers-types';

import {
    createPendingGameRequest,
    deletePendingGameRequest,
    getPendingGamesRequest,
    joinPendingGameRequest,
    leavePendingGameRequest,
    startPendingGameRequest,
} from '../controllers/pending-games.controller';

import { getPlayGameRequest } from '../controllers/play-game.controller';

export const resolvers: Resolvers = {
    Query: {
        pendingGames: getPendingGamesRequest,
        playGame: getPlayGameRequest,
    },
    Mutation: {
        createPendingGameRequest,
        deletePendingGameRequest,
        joinPendingGameRequest,
        leavePendingGameRequest,
        startPendingGameRequest,
    },
};
