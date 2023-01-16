'use client';

import { Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Button } from '../../common/components/button.component';

import { logoutHandler, redirectToLoginPageHandler } from '../login.service';

import { playerLoginState } from './atoms/player-login.atom';

export const Login = () => {
    const router = useRouter();
    const [login, setRecoilLogin] = useRecoilState(playerLoginState);

    return login ? (
        <Group spacing="xs">
            <Text>Welcome,</Text>
            <Text fw={700}>{login}</Text>
            <Button
                onClick={() => logoutHandler(router, setRecoilLogin)}
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
