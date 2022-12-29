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
import { playGamePageUrl } from '../constants/urls';
import { socketRoomIds } from '../enums/socket.enums';
import {
    createPendingGameMutation,
    deletePendingGameMutation,
    joinPendingGameMutation,
    leavePendingGameMutation,
    startPendingGameMutation,
} from '../graphql/mutations';
import { getPendingGamesQuery } from '../graphql/queries';
import { useSocket, useSocketGameSearch } from '../lib/socket.client';
import { GameId, PlayerId } from '../models/common.models';
import { Message, MutationFn } from '../models/graphql.models';
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
import { retrievePrivatePlayerId } from '../services/player-id.service';
import {
    getPlayersOnlineEventName,
    getStartPendingGameEventName,
} from '../utils.ts/socket.utils';
import { setGameId } from '../utils.ts/storage.utils';

const noPendingGames: PendingGames = [];

export const usePendingGames = () => {
    const { data, loading } = useQuery<PendingGamesQuery>(getPendingGamesQuery);
    const [pendingGames, setPendingGames] =
        useState<PendingGames>(noPendingGames);

    useEffect(() => {
        if (data?.pendingGames) {
            setPendingGames(data?.pendingGames);
        }
    }, [data]);

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

    return async () => {
        const validationResult = gameNameSchema.safeParse(
            gameNameRef.current?.value
        );
        const gameName = validationResult.success
            ? validationResult.data
            : noLogin;

        if (!gameName) {
            return alert(pendingGameNameErrorMessage);
        }

        await retrievePrivatePlayerId();
        action(gameName);
    };
};

export const useDeletePendingGame = () => {
    const socket = useSocket();
    const action = usePendingGameMutation(
        deletePendingGameMutation,
        deletePendingGame,
        'new game has been deleted'
    );

    return async () => {
        await action(null);
        socket.emit(socketRoomIds.leaveGameOnlineStatus);
    };
};

export const useJoinPendingGame = () => {
    const action = usePendingGameMutation(
        joinPendingGameMutation,
        joinPendingGame,
        'joined to the game'
    );

    return async (gameId: GameId) => {
        await retrievePrivatePlayerId();
        action(gameId);
    };
};

export const useStartPendingGame = () =>
    usePendingGameMutation(
        startPendingGameMutation,
        startPendingGame,
        'new game has been started'
    );

export const useLeavePendingGame = (gameId: GameId) => {
    const socket = useSocket();
    const router = useRouter();

    useEffect(() => {
        const eventName = getStartPendingGameEventName(gameId);
        socket.on(eventName, () => {
            socket.off(eventName);

            setGameId(gameId);
            router.push(playGamePageUrl);
        });
        // TODO: how to handle memory leak
    }, [socket, router, gameId]);

    const action = usePendingGameMutation(
        leavePendingGameMutation,
        leavePendingGame,
        'left the game'
    );

    return async () => {
        await action(gameId);
        socket.emit(socketRoomIds.leaveGameOnlineStatus);
    };
};

export const useOnlinePlayerStatuses = (gameId: string, playerId: PlayerId) => {
    const socket = useSocket();
    const [onlinePlayerIds, setOnlinePlayerIds] = useState(new Set<PlayerId>());
    useEffect(() => {
        socket.emit(socketRoomIds.joinGameOnlineStatus, {
            gameId,
            playerId,
        });
    }, [socket, gameId, playerId]);

    useEffect(() => {
        const playerOnlineEventName = getPlayersOnlineEventName(gameId);
        socket.on(playerOnlineEventName, (playerIds: Array<PlayerId>) =>
            setOnlinePlayerIds(new Set(playerIds))
        );

        socket.on(socketRoomIds.leaveGameOnlineStatus, (playerId: PlayerId) =>
            setOnlinePlayerIds((set) => {
                set.delete(playerId);
                return new Set(set);
            })
        );

        return () => {
            socket.removeAllListeners(playerOnlineEventName);
            socket.removeAllListeners(socketRoomIds.leaveGameOnlineStatus);
        };
    }, [socket, gameId, setOnlinePlayerIds]);

    return onlinePlayerIds;
};
