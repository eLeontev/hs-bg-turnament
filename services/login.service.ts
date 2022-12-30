import { RefObject, KeyboardEvent, MouseEvent } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { enterKey, keydownEventType } from '../constants/keyboard.constants';

import { loginNotificationLabel } from '../constants/login.constants';

import { pendingGamesPageUrl, loginPageUrl } from '../constants/urls';
import {
    clearAllLocalStorageValues,
    setLogin,
} from '../utils.ts/storage.utils';
import { loginValidator } from '../validators/login.validators';

const shouldSkipLogin = (event: KeyboardEvent | MouseEvent) =>
    event.type === keydownEventType &&
    (event as KeyboardEvent).key !== enterKey;

export const loginAction =
    (loginRef: RefObject<HTMLInputElement>, router: AppRouterInstance) =>
    (event: MouseEvent | KeyboardEvent) => {
        if (shouldSkipLogin(event)) {
            return;
        }

        const login = loginValidator(loginRef);

        if (!login) {
            alert(loginNotificationLabel);
            return;
        }

        setLogin(login);
        router.push(pendingGamesPageUrl);
    };

export const logoutHandler = (router: AppRouterInstance) => {
    clearAllLocalStorageValues();
    router.push(loginPageUrl);
};

export const redirectToLoginPageHandler = (router: AppRouterInstance) =>
    router.push(loginPageUrl);
