import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { getPendingGamesQuery } from '../../graphql/queries';

import {
    PendingGames,
    PendingGamesQuery,
} from '../../models/pending-games.models';

export const usePendingGamesFromQuery = (
    setPendingGames: (pendingGames: PendingGames) => void
) => {
    const [requestPendingGames] = useLazyQuery<PendingGamesQuery>(
        getPendingGamesQuery,
        { fetchPolicy: 'network-only' }
    );
    useEffect(() => {
        requestPendingGames().then(({ data }) => {
            console.log(data);

            if (data?.pendingGames) {
                setPendingGames(data.pendingGames);
            }
        });
    }, [requestPendingGames, setPendingGames]);
};
