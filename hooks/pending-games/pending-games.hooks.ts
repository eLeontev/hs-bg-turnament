import { useState } from 'react';

import { usePendingGamesFromQuery } from './pending-games.graphql.hooks';
import { usePendingGamesFromSocket } from './pending-games.socket.hooks';

import { PendingGames } from '../../models/pending-games.models';

const noPendingGames: PendingGames = [];

export const usePendingGames = () => {
    const [pendingGames, setPendingGames] =
        useState<PendingGames>(noPendingGames);

    usePendingGamesFromQuery(setPendingGames);
    usePendingGamesFromSocket(setPendingGames);

    return pendingGames;
};
