import { RefObject, KeyboardEvent, MouseEvent } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { enterKey, keydownEventType } from '../constants/keyboard.constants';

import { loginNotificationLabel } from '../constants/login.constants';

import { gameSearchPageUrl, loginPageUrl } from '../constants/urls';
import {
    clearAllLocalStorageValues,
    setLogin,
} from '../utils.ts/storage.utils';
import { loginValidator } from '../validators/login.validators';

const shouldSkipLogin = (event: KeyboardEvent | MouseEvent) =>
    event.type === keydownEventType &&
    (event as KeyboardEvent).key !== enterKey;

export const loginAction =
    (
        setLogin: (login: string) => void,
        loginRef: RefObject<HTMLInputElement>
    ) =>
    (event: MouseEvent | KeyboardEvent) => {
        if (shouldSkipLogin(event)) {
            return;
        }

        const validatedLogin = loginValidator(loginRef);

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
