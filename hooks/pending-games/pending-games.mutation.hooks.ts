import { useState } from 'react';

import { DocumentNode, FetchResult, useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';

import {
    joinPendingGame,
    leavePendingGame,
    deletePendingGame,
    createPendingGame,
    createPendingGameValidator,
    createPendingGameResponseHandler,
} from '../../services/pending-games.service';
import { startPlayGame } from '../../services/play-game.service';

import {
    joinPendingGameMutation,
    leavePendingGameMutation,
    deletePendingGameMutation,
    startPlayGameMutation,
    createPendingGameMutation,
} from '../../graphql/mutations';

import { noGameName } from '../../constants/pending-games.constants';

import { MutationFn } from '../../models/graphql.models';

const usePendingGameMutation = <R, B, C>(
    mutation: DocumentNode,
    serviceAction: (
        mutationFn: MutationFn<R, B>,
        config: C
    ) => Promise<FetchResult<R>>
) => {
    const [pendingGameMutation] = useMutation<R, B>(mutation);

    const action = async (config: C) => {
        try {
            return serviceAction(pendingGameMutation, config);
        } catch (e) {
            alert((e as { message: string }).message);
        }
    };

    return action;
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
        action(gameName)
            .then(createPendingGameResponseHandler)
            .finally(() => setVisible(false));
    });

    const inputProps = form.getInputProps('gameName');

    return { inputProps, onSubmit, visible };
};

export const useJoinPendingGame = () =>
    usePendingGameMutation(joinPendingGameMutation, joinPendingGame);

export const useLeavePendingGame = () =>
    usePendingGameMutation(leavePendingGameMutation, leavePendingGame);

export const useDeletePendingGame = () =>
    usePendingGameMutation(deletePendingGameMutation, deletePendingGame);

export const useStartPlayGame = () =>
    usePendingGameMutation(startPlayGameMutation, startPlayGame);
