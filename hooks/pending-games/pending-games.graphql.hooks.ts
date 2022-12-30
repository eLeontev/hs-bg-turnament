import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { getPendingGamesQuery } from '../../graphql/queries';

import {
    PendingGames,
    PendingGamesQuery,
} from '../../models/pending-games.models';

export const usePendingGamesFromQuery = (
    setPendingGames: (pendingGames: PendingGames) => void
) => {
    const { data } = useQuery<PendingGamesQuery>(getPendingGamesQuery);
    useEffect(() => {
        if (data?.pendingGames) {
            setPendingGames(data.pendingGames);
        }
    }, [data, setPendingGames]);
};
