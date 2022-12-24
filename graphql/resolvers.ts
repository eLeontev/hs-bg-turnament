import { Resolvers } from '../__generated__/resolvers-types';

import { pendingGameApiUrl } from '../constants/urls';
import { PendingGames } from '../models/pending-games.models';

export const resolvers: Resolvers = {
    Query: {
        users: () => [{ id: '123', name: 'John Smitt' }],
        pendingGames: async (): Promise<PendingGames> => {
            // TODO: switch to mutations to remove the hack
            return await fetch(
                `http://localhost:3000/${pendingGameApiUrl}`
            ).then((res) => res.json());
        },
    },
};
