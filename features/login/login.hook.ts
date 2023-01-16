import { useState } from 'react';

import { useForm } from '@mantine/form';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { loginValidator } from './login.service';

import { pendingGamesPageUrl } from '../../constants/urls';
import { noLogin } from './login.constants';

import { SetRecoilLogin } from './login.models';

import { setLogin } from '../../utils.ts/storage.utils';

export const useLogin = (
    router: AppRouterInstance,
    setRecoilLogin: SetRecoilLogin
) => {
    const [visible, setVisible] = useState(false);
    const form = useForm({
        initialValues: { login: noLogin },
        validate: { login: loginValidator },
    });

    const onSubmit = form.onSubmit(({ login }: typeof form['values']) => {
        setLogin(login);
        setRecoilLogin(login);
        setVisible(true);
        router.push(pendingGamesPageUrl);
    });

    const inputProps = form.getInputProps('login');
    return { inputProps, onSubmit, visible };
};
