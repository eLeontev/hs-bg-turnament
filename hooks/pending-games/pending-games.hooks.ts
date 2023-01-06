import { useState } from 'react';

import { isPlayerInGame } from '../../services/pending-games.service';

import { usePendingGamesFromQuery } from './pending-games.graphql.hooks';
import { usePendingGamesFromSocket } from './pending-games.socket.hooks';

import { PendingGames } from '../../models/pending-games.models';
import { getPlayerId } from '../../utils.ts/storage.utils';

const noPendingGames: PendingGames = [];

export const usePendingGames = () => {
    const [pendingGames, setPendingGames] =
        useState<PendingGames>(noPendingGames);

    usePendingGamesFromQuery(setPendingGames);
    usePendingGamesFromSocket(setPendingGames);

    const isInGame = isPlayerInGame(pendingGames, getPlayerId() || '');
    return { pendingGames, isInGame };
};
