import { useState } from 'react';

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

    const isInGame = pendingGames.some(({ players }) =>
        players.some(({ playerId }) => playerId === getPlayerId())
    );
    return { pendingGames, isInGame };
};
