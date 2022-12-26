import {
    DocumentNode,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { useRouter } from 'next/navigation';
import { RefObject, useEffect, useState } from 'react';
import { noLogin } from '../constants/login.constants';
import { pendingGameNameErrorMessage } from '../constants/pending-games.constants';
import { gamePlayPageUrl } from '../constants/urls';
import {
    createPendingGameMutation,
    deletePendingGameMutation,
    joinPendingGameMutation,
    leavePendingGameMutation,
    startPendingGameMutation,
} from '../graphql/mutations';
import { getPendingGamesQuery } from '../graphql/queries';
import { useSocket, useSocketGameSearch } from '../lib/socket.client';
import { MutationFn } from '../models/graphql.models';
import {
    PendingGames,
    PendingGamesQuery,
} from '../models/pending-games.models';
import { gameNameSchema } from '../schemas/pending-games.schemas';
import {
    createPendingGame,
    deletePendingGame,
    joinPendingGame,
    leavePendingGame,
    startPendingGame,
} from '../services/pending-games.service';
import { getStartPendingGameEventName } from '../utils.ts/socket.utils';
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

const usePendingGameMutation = <R, B, C>(
    mutation: DocumentNode,
    serviceAction: (mutationFn: MutationFn<Message, B>, config: C) => R,
    successMessage: string
) => {
    const [pendingGameMutation] = useMutation<Message, B>(mutation);

    const action = async (config: C) => {
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

        action(gameName);
    };
};

export const useDeletePendingGame = () =>
    usePendingGameMutation(
        deletePendingGameMutation,
        deletePendingGame,
        'new game has been deleted'
    );

export const useJoinPendingGame = () => {
    const action = usePendingGameMutation(
        joinPendingGameMutation,
        joinPendingGame,
        'joined to the game'
    );

    return (gameId: string) => action(gameId);
};

export const useStartPendingGame = () =>
    usePendingGameMutation(
        startPendingGameMutation,
        startPendingGame,
        'new game has been started'
    );

export const useLeavePendingGame = (gameId: string) => {
    const socket = useSocket();
    const router = useRouter();

    useEffect(() => {
        const eventName = getStartPendingGameEventName(gameId);
        socket.on(eventName, () => {
            socket.off(eventName);
            router.push(gamePlayPageUrl);
        });
        // TODO: how to handle memory leak
    }, [socket, router, gameId]);

    const action = usePendingGameMutation(
        leavePendingGameMutation,
        leavePendingGame,
        'left the game'
    );

    return () => action(gameId);
};
