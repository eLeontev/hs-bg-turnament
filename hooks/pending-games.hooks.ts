import {
    DocumentNode,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { useState } from 'react';
import {
    createPendingGameMutation,
    deletePendingGameMutation,
} from '../graphql/mutations';
import { getPendingGamesQuery } from '../graphql/queries';
import { MutationFn } from '../models/graphql.models';
import {
    PendingGames,
    PendingGamesQuery,
} from '../models/pending-games.models';
import {
    createPendingGame,
    deletePendingGame,
} from '../services/pending-games.service';
import { Message } from '../__generated__/resolvers-types';

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

const usePendingGameMutation = <R, B>(
    mutation: DocumentNode,
    serviceAction: (mutationFn: MutationFn<Message, B>) => R,
    successMessage: string
) => {
    const [pendingGameMutation] = useMutation<Message, B>(mutation);

    const action = async () => {
        try {
            await serviceAction(pendingGameMutation);
            alert(successMessage);
        } catch (e) {
            alert((e as { message: string }).message);
        }
    };

    return action;
};

export const useCreatePendingGame = () =>
    usePendingGameMutation(
        createPendingGameMutation,
        createPendingGame,
        'new game has been created'
    );

export const useDeletePendingGame = () =>
    usePendingGameMutation(
        deletePendingGameMutation,
        deletePendingGame,
        'new game has been deleted'
    );
