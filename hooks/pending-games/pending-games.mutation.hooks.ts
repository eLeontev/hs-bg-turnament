import { DocumentNode, useMutation } from '@apollo/client';

import { retrievePrivatePlayerId } from '../../services/player-id.service';
import {
    joinPendingGame,
    leavePendingGame,
    deletePendingGame,
    startPendingGame,
    createPendingGame,
} from '../../services/pending-games.service';

import {
    joinPendingGameMutation,
    leavePendingGameMutation,
    deletePendingGameMutation,
    startPendingGameMutation,
    createPendingGameMutation,
} from '../../graphql/mutations';

import { GameId } from '../../models/common.models';
import { Message, MutationFn } from '../../models/graphql.models';

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

const withRetrievePlayerId =
    <T>(action: (context: T) => void) =>
    async (context: T) => {
        await retrievePrivatePlayerId();
        action(context);
    };

export const useCreatePendingGame = () => {
    const action = usePendingGameMutation(
        createPendingGameMutation,
        createPendingGame,
        'new game has been created'
    );

    return withRetrievePlayerId<string>(action);
};

export const useJoinPendingGame = () => {
    const action = usePendingGameMutation(
        joinPendingGameMutation,
        joinPendingGame,
        'joined to the game'
    );

    return withRetrievePlayerId<GameId>(action);
};

export const useLeavePendingGame = () =>
    usePendingGameMutation(
        leavePendingGameMutation,
        leavePendingGame,
        'left the game'
    );

export const useDeletePendingGameRef = () =>
    usePendingGameMutation(
        deletePendingGameMutation,
        deletePendingGame,
        'new game has been deleted'
    );

export const useStartPendingGame = () =>
    usePendingGameMutation(
        startPendingGameMutation,
        startPendingGame,
        'new game has been started'
    );
