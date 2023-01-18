'use client';

import { Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import { Button } from '../../common/components/button.component';
import {
    ConfirmationModal,
    useModal,
} from '../../common/components/modal.confirmation.component';

import { logoutHandler, redirectToLoginPageHandler } from '../login.service';

import { playerLoginState } from './atoms/player-login.atom';

export const logoutlabels = {
    title: 'Please confirm logout action',
    cancelLabel: 'Cancel',
    confirmLabel: 'Logout',
};
export const Login = () => {
    const router = useRouter();
    const [login, setRecoilLogin] = useRecoilState(playerLoginState);

    const props = useModal(() => logoutHandler(router, setRecoilLogin));

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
