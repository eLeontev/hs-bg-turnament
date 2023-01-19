import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { playerLoginSchema } from '../player/player.schemas';

import { loginNotificationLabel, noLogin } from './login.constants';
import { loginPageUrl } from '../../constants/urls';

import { PlayerLogin } from '../../models/common.models';
import { SetRecoilLogin } from './login.models';

import { clearAllLocalStorageValues } from '../../utils.ts/storage.utils';

export const loginValidator = (value: PlayerLogin) =>
    playerLoginSchema.safeParse(value.trim()).success
        ? null
        : loginNotificationLabel;

export const logoutHandler = (
    router: AppRouterInstance,
    setRecoilLogin: SetRecoilLogin
) => {
    clearAllLocalStorageValues();
    setRecoilLogin(noLogin);
    router.push(loginPageUrl);
};

export const redirectToLoginPageHandler = (router: AppRouterInstance) =>
    router.push(loginPageUrl);