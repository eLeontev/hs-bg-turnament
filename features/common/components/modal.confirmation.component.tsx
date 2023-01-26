import { useState } from 'react';
import { Modal, Group } from '@mantine/core';

import { Button } from './button.component';

import { useI18nTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/i18n.enums';

export const useModal = (action: () => void) => {
    const [opened, setOpened] = useState(false);

    const closeModal = () => setOpened(false);
    const openModal = () => setOpened(true);
    const confirmAction = () => {
        action();
        closeModal();
    };

    return { openModal, closeModal, confirmAction, opened };
};

export type ConfirmationModalProps = {
    closeModal: () => void;
    confirmAction: () => void;
    opened: boolean;
    title: labelI18nKeys;
    cancelLabel: labelI18nKeys;
    confirmLabel: labelI18nKeys;
};
export const ConfirmationModal = ({
    closeModal,
    confirmAction,
    opened,
    title,
    cancelLabel,
    confirmLabel,
}: ConfirmationModalProps) => {
    const t = useI18nTranslate();

    return (
        <Modal opened={opened} onClose={closeModal} title={t(title)}>
            <Group position="apart">
                <Button onClick={closeModal} label={t(cancelLabel)}></Button>
                <Button
                    color="red"
                    onClick={confirmAction}
                    label={t(confirmLabel)}
                ></Button>
            </Group>
        </Modal>
    );
};
