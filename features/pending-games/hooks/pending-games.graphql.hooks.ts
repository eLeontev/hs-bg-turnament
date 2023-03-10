import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { getPendingGamesQuery } from '../../../graphql/queries';

import { PendingGames, PendingGamesQuery } from '../pending-games.models';

export const usePendingGamesFromQuery = (
    setPendingGames: (pendingGames: PendingGames) => void
) => {
    const [requestPendingGames] = useLazyQuery<PendingGamesQuery>(
        getPendingGamesQuery,
        { fetchPolicy: 'network-only' }
    );
    useEffect(() => {
        requestPendingGames().then(({ data }) => {
            if (data?.pendingGames) {
                setPendingGames(data.pendingGames);
            }
        });
    }, [requestPendingGames, setPendingGames]);
};
