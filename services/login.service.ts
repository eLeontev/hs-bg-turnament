import { RefObject, KeyboardEvent, MouseEvent } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { enterKey, keydownEventType } from '../constants/keyboard.constants';

import {
    loginNotificationLabel,
    maxLoginLength,
    noLogin,
} from '../constants/login.constants';

import { gameSearchPageUrl, loginPageUrl } from '../constants/urls';
import {
    clearAllLocalStorageValues,
    setLogin,
} from '../utils.ts/storage.utils';

const shouldSkipLogin = (event: KeyboardEvent | MouseEvent) =>
    event.type === keydownEventType &&
    (event as KeyboardEvent).key !== enterKey;

const getValidatedLogin = (loginRef: RefObject<HTMLInputElement>): string => {
    if (!loginRef.current) {
        return noLogin;
    }

    const trimmedLogin = loginRef.current.value.trim();
    return trimmedLogin && trimmedLogin.length < maxLoginLength
        ? trimmedLogin
        : noLogin;
};

export const loginAction =
    (
        setLogin: (login: string) => void,
        loginRef: RefObject<HTMLInputElement>
    ) =>
    (event: MouseEvent | KeyboardEvent) => {
        if (shouldSkipLogin(event)) {
            return;
        }

        const validatedLogin = getValidatedLogin(loginRef);

        setLogin(validatedLogin);
        if (!validatedLogin) {
            alert(loginNotificationLabel);
        }
    };

export const loginHandler = (router: AppRouterInstance, login: string) => {
    setLogin(login);
    router.push(gameSearchPageUrl);
};

export const logoutHandler = (router: AppRouterInstance) => {
    clearAllLocalStorageValues();
    router.push(loginPageUrl);
};
