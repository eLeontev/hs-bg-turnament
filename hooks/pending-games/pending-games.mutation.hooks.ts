import { useState } from 'react';

import { DocumentNode, useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';

import { retrievePrivatePlayerId } from '../../services/player-id.service';
import {
    joinPendingGame,
    leavePendingGame,
    deletePendingGame,
    startPendingGame,
    createPendingGame,
    createPendingGameValidator,
} from '../../services/pending-games.service';

import {
    joinPendingGameMutation,
    leavePendingGameMutation,
    deletePendingGameMutation,
    startPendingGameMutation,
    createPendingGameMutation,
} from '../../graphql/mutations';

import { noGameName } from '../../constants/pending-games.constants';

import { GameId } from '../../models/common.models';
import { Message, MutationFn } from '../../models/graphql.models';

const usePendingGameMutation = <R, B, C>(
    mutation: DocumentNode,
    serviceAction: (mutationFn: MutationFn<Message, B>, config: C) => R
) => {
    const [pendingGameMutation] = useMutation<Message, B>(mutation);

    const action = async (config: C) => {
        try {
            await serviceAction(pendingGameMutation, config);
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
    const [visible, setVisible] = useState(false);
    const action = usePendingGameMutation(
        createPendingGameMutation,
        createPendingGame
    );
    const form = useForm({
        initialValues: { gameName: noGameName },
        validate: { gameName: createPendingGameValidator },
    });

    const onSubmit = form.onSubmit(({ gameName }: typeof form['values']) => {
        setVisible(true);
        withRetrievePlayerId(action)(gameName).finally(() => setVisible(false));
    });

    const inputProps = form.getInputProps('gameName');

    return { inputProps, onSubmit, visible };
};

export const useJoinPendingGame = () => {
    const action = usePendingGameMutation(
        joinPendingGameMutation,
        joinPendingGame
    );

    return withRetrievePlayerId<GameId>(action);
};

export const useLeavePendingGame = () =>
    usePendingGameMutation(leavePendingGameMutation, leavePendingGame);

export const useDeletePendingGame = () =>
    usePendingGameMutation(deletePendingGameMutation, deletePendingGame);

export const useStartPendingGame = () =>
    usePendingGameMutation(startPendingGameMutation, startPendingGame);
