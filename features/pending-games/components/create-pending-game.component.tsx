import { Card, TextInput, Group } from '@mantine/core';

import { Button } from '../../common/components/button.component';
import { OverlayLoader } from '../../common/components/loader.component';

import { useCreatePendingGame } from '../hooks/pending-games.mutation.hooks';
import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

export const CreatePendingGame = () => {
    const t = useI18nLabelTranslate();
    const { inputProps, onSubmit, visible } = useCreatePendingGame();

    return (
        <Card>
            <OverlayLoader visible={visible} />
            <form onSubmit={onSubmit}>
                <TextInput
                    withAsterisk
                    label={t(labelI18nKeys.createPendingGameInputLabel)}
                    placeholder={t(
                        labelI18nKeys.createPendingGameInputPlaceholder
                    )}
                    {...inputProps}
                />

                <Group mt="md">
                    <Button
                        fullWidth
                        type="submit"
                        label={t(labelI18nKeys.createGameButtonLabel)}
                    ></Button>
                </Group>
            </form>
        </Card>
    );
};
