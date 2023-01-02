'use client';

import { TextInput, Group, Card } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '../../ui/components/button.component';
import { OverlayLoader } from '../../ui/components/loader.component';

import { useLogin } from '../../hooks/login.hook';
import { useSetRecoilState } from 'recoil';

import { playerLoginState } from '../../ui/atoms/player-login.atom';

const inputLabel = 'Login';
const inputPlaceholder = 'Your Login';
const loginButtonLabel = 'Login';

const Login = () => {
    const router = useRouter();
    const setRecoilLogin = useSetRecoilState(playerLoginState);
    const { inputProps, onSubmit, visible } = useLogin(router, setRecoilLogin);

    return (
        <Card mx="auto" maw="300px">
            <OverlayLoader visible={visible} />
            <form onSubmit={onSubmit}>
                <TextInput
                    withAsterisk
                    label={inputLabel}
                    placeholder={inputPlaceholder}
                    {...inputProps}
                />

                <Group mt="md">
                    <Button
                        fullWidth
                        type="submit"
                        label={loginButtonLabel}
                    ></Button>
                </Group>
            </form>
        </Card>
    );
};

export default Login;
