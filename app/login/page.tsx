'use client';

import { TextInput, Group, Card } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '../../features/common/components/button.component';
import { OverlayLoader } from '../../features/common/components/loader.component';

import { useLogin } from '../../features/login/login.hook';
import { useI18nLabelTranslate } from '../../i18n/i18n.hooks';

import {
    setLoginSelector,
    useLoginStore,
} from '../../features/login/components/store/login.store';

import { labelI18nKeys } from '../../i18n/enums/i18n.label.enums';

const Login = () => {
    const router = useRouter();
    const setLogin = useLoginStore(setLoginSelector);
    const { inputProps, onSubmit, visible } = useLogin(router, setLogin);

    const t = useI18nLabelTranslate();

    return (
        <Card mx="auto" maw="300px">
            <OverlayLoader visible={visible} />
            <form onSubmit={onSubmit}>
                <TextInput
                    withAsterisk
                    label={t(labelI18nKeys.loginInputLabel)}
                    placeholder={t(labelI18nKeys.loginInputPlaceholder)}
                    {...inputProps}
                />

                <Group mt="md">
                    <Button
                        fullWidth
                        type="submit"
                        label={t(labelI18nKeys.loginButtonLabel)}
                    ></Button>
                </Group>
            </form>
        </Card>
    );
};

export default Login;
