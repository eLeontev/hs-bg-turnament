'use client';

import { Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '../../common/components/button.component';
import {
    ConfirmationModal,
    useModal,
} from '../../common/components/modal.confirmation.component';

import { logoutHandler, redirectToLoginPageHandler } from '../login.service';

import {
    loginSelector,
    setLoginSelector,
    useLoginStore,
} from './store/login.store';

export const logoutlabels = {
    title: 'Please confirm logout action',
    cancelLabel: 'Cancel',
    confirmLabel: 'Logout',
};
export const Login = () => {
    const router = useRouter();

    const setLogin = useLoginStore(setLoginSelector);
    const login = useLoginStore(loginSelector);

    const props = useModal(() => logoutHandler(router, setLogin));

    return login ? (
        <Group spacing="xs">
            <ConfirmationModal {...props} {...logoutlabels}></ConfirmationModal>
            <Text>Welcome,</Text>
            <Text fw={700}>{login}</Text>
            <Button onClick={props.openModal} label={'Logout'}></Button>
        </Group>
    ) : (
        <Button
            onClick={() => redirectToLoginPageHandler(router)}
            label={'Login'}
        ></Button>
    );
};
