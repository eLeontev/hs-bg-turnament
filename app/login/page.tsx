'use client';

import { TextInput, Group, Card } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '../../features/common/components/button.component';
import { OverlayLoader } from '../../features/common/components/loader.component';

import { useLogin } from '../../features/login/login.hook';
import { useSetRecoilState } from 'recoil';

import { playerLoginState } from '../../features/login/components/atoms/player-login.atom';

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
