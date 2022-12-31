'use client';

import { Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from './button.component';

import {
    logoutHandler,
    redirectToLoginPageHandler,
} from '../../services/login.service';

import { getLogin } from '../../utils.ts/storage.utils';

export const Login = () => {
    const router = useRouter();
    const login = getLogin();

    return login ? (
        <Group spacing="xs">
            <Text>Welcome,</Text>
            <Text fw={700}>{login}</Text>
            <Button
                onClick={() => logoutHandler(router)}
                label={'Logout'}
            ></Button>
        </Group>
    ) : (
        <Button
            onClick={() => redirectToLoginPageHandler(router)}
            label={'Login'}
        ></Button>
    );
};
