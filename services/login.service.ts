import { RefObject, KeyboardEvent, MouseEvent } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { enterKey, keydownEventType } from '../constants/keyboard.constants';

import {
    loginNotificationLabel,
    maxLoginLength,
} from '../constants/login.constants';

import { gameSearchPageUrl, loginPageUrl } from '../constants/urls';
import { clearLogin, getLogin, setLogin } from '../utils.ts/storage.utils';

export const shouldSkipLogin = (event: KeyboardEvent | MouseEvent) =>
    event.type === keydownEventType &&
    (event as KeyboardEvent).key !== enterKey;

export const loginHandler = (
    router: AppRouterInstance,
    loginRef: RefObject<HTMLInputElement>
) => {
    if (!loginRef.current) {
        return;
    }

    const trimmedLogin = loginRef.current.value.trim();
    if (trimmedLogin && trimmedLogin.length < maxLoginLength) {
        setLogin(trimmedLogin);
        router.push(gameSearchPageUrl);

        return;
    }

    alert(loginNotificationLabel);
};

export const logoutHandler = (router: AppRouterInstance) => {
    clearLogin();
    router.push(loginPageUrl);
};
