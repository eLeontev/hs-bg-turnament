import { useState } from 'react';

import { DocumentNode, FetchResult, useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';

import {
    createPendingGame,
    createPendingGameResponseHandler,
    createPendingGameValidator,
    deletePendingGame,
    joinPendingGame,
    leavePendingGame,
} from '../services/pending-games.client.service';

import {
    joinPendingGameMutation,
    leavePendingGameMutation,
    deletePendingGameMutation,
    createPendingGameMutation,
} from '../../../graphql/mutations';

import { noGameName } from '../pending-games.constants';

import { MutationFn } from '../../../models/graphql.models';
import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

const usePendingGameMutation = <R, B, C>(
    mutation: DocumentNode,
    serviceAction: (
        mutationFn: MutationFn<R, B>,
        config: C
    ) => Promise<FetchResult<R>>
) => {
    const [pendingGameMutation] = useMutation<R, B>(mutation);

    return (config: C) => {
        try {
            return serviceAction(pendingGameMutation, config);
        } catch (e) {
            alert((e as { message: string }).message);
        }
    };
};

export const useCreatePendingGame = () => {
    const t = useI18nLabelTranslate();

    const [visible, setVisible] = useState(false);
    const action = usePendingGameMutation(
        createPendingGameMutation,
        createPendingGame
    );
    const form = useForm({
        initialValues: { gameName: noGameName },
        validate: { gameName: createPendingGameValidator(t) },
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
