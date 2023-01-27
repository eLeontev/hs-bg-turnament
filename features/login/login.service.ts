import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { playerLoginSchema } from '../player/player.schemas';

import { noLogin } from './login.constants';
import { loginPageUrl } from '../../constants/urls';

import { labelI18nKeys } from '../../i18n/enums/i18n.label.enums';

import { PlayerLogin } from '../../models/common.models';
import { SetRecoilLogin } from './login.models';

import { clearAllLocalStorageValues } from '../../utils.ts/storage.utils';

export const loginValidator =
    (t: (i18nKey: labelI18nKeys) => string) => (value: PlayerLogin) =>
        playerLoginSchema.safeParse(value.trim()).success
            ? null
            : t(labelI18nKeys.loginNotificationLabel);

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
