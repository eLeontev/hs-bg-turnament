import { Card, TextInput, Group } from '@mantine/core';

import { Button } from '../../common/components/button.component';
import { OverlayLoader } from '../../common/components/loader.component';

import { useCreatePendingGame } from '../hooks/pending-games.mutation.hooks';

import {
    createGameButtonLabel,
    createPendingGameInputLabel,
    createPendingGameInputPlaceholder,
} from '../pending-games.constants';

export const CreatePendingGame = () => {
    const { inputProps, onSubmit, visible } = useCreatePendingGame();

    return (
        <Card>
            <OverlayLoader visible={visible} />
            <form onSubmit={onSubmit}>
                <TextInput
                    withAsterisk
                    label={createPendingGameInputLabel}
                    placeholder={createPendingGameInputPlaceholder}
                    {...inputProps}
                />

                <Group mt="md">
                    <Button
                        fullWidth
                        type="submit"
                        label={createGameButtonLabel}
                    ></Button>
                </Group>
            </form>
        </Card>
    );
};
