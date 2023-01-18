import { useState } from 'react';
import { Modal, Group } from '@mantine/core';

import { Button } from './button.component';

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
    title: string;
    cancelLabel: string;
    confirmLabel: string;
};
export const ConfirmationModal = ({
    closeModal,
    confirmAction,
    opened,
    title,
    cancelLabel,
    confirmLabel,
}: ConfirmationModalProps) => (
    <Modal opened={opened} onClose={closeModal} title={title}>
        <Group position="apart">
            <Button onClick={closeModal} label={cancelLabel}></Button>
            <Button
                color="red"
                onClick={confirmAction}
                label={confirmLabel}
            ></Button>
        </Group>
    </Modal>
);
