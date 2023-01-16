import { useState } from 'react';

import { isPlayerInGame } from '../services/pending-games.client.service';

import { usePendingGamesFromQuery } from './pending-games.graphql.hooks';
import { usePendingGamesFromSocket } from './pending-games.socket.hooks';

import { PendingGames } from '../pending-games.models';
import { getPlayerKey } from '../../../utils.ts/storage.utils';

const noPendingGames: PendingGames = [];

export const usePendingGames = () => {
    const [pendingGames, setPendingGames] =
        useState<PendingGames>(noPendingGames);

    usePendingGamesFromQuery(setPendingGames);
    usePendingGamesFromSocket(setPendingGames);

    const isInGame = isPlayerInGame(pendingGames, getPlayerKey() || '');
    return { pendingGames, isInGame };
};
