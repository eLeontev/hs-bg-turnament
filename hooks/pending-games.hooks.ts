import {
    DocumentNode,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { RefObject, useState } from 'react';
import { noLogin } from '../constants/login.constants';
import { pendingGameNameErrorMessage } from '../constants/pending-games.constants';
import {
    createPendingGameMutation,
    deletePendingGameMutation,
} from '../graphql/mutations';
import { getPendingGamesQuery } from '../graphql/queries';
import { useSocketGameSearch } from '../lib/socket.client';
import { MutationFn } from '../models/graphql.models';
import {
    PendingGameMutationConfig,
    PendingGames,
    PendingGamesQuery,
} from '../models/pending-games.models';
import { gameNameSchema } from '../schemas/pending-games.schemas';
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

    useSocketGameSearch(setPendingGames);

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
    serviceAction: (
        mutationFn: MutationFn<Message, B>,
        config?: PendingGameMutationConfig<B>
    ) => R,
    successMessage: string
) => {
    const [pendingGameMutation] = useMutation<Message, B>(mutation);

    const action = async (config?: PendingGameMutationConfig<B>) => {
        try {
            await serviceAction(pendingGameMutation, config);
            alert(successMessage);
        } catch (e) {
            alert((e as { message: string }).message);
        }
    };

    return action;
};

export const useCreatePendingGame = (
    gameNameRef: RefObject<HTMLInputElement>
) => {
    const action = usePendingGameMutation(
        createPendingGameMutation,
        createPendingGame,
        'new game has been created'
    );

    return () => {
        const validationResult = gameNameSchema.safeParse(
            gameNameRef.current?.value
        );
        const gameName = validationResult.success
            ? validationResult.data
            : noLogin;

        if (!gameName) {
            return alert(pendingGameNameErrorMessage);
        }

        action({ gameName });
    };
};

export const useDeletePendingGame = () =>
    usePendingGameMutation(
        deletePendingGameMutation,
        deletePendingGame,
        'new game has been deleted'
    );
