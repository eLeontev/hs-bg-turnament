import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import { getPendingGamesQuery } from '../graphql/queries';
import {
    PendingGames,
    PendingGamesQuery,
} from '../models/pending-games.models';

const noPendingGames: PendingGames = [];

export const usePendingGames = () => {
    const { data, loading } = useQuery<PendingGamesQuery>(getPendingGamesQuery);
    const [pendingGames, setPendingGames] = useState<PendingGames>(
        data?.pendingGames || noPendingGames
    );
    const [refreshPendingGamesQuery] = useLazyQuery<PendingGamesQuery>(
        getPendingGamesQuery,
        {
            fetchPolicy: 'no-cache',
            notifyOnNetworkStatusChange: true,
        }
    );
    const refreshPendingGames = async () => {
        const { data } = await refreshPendingGamesQuery();
        setPendingGames(data?.pendingGames || noPendingGames);
    };

    return { pendingGames, loading, refreshPendingGames };
};
