import { RefObject } from 'react';

import { playerLoginSchema } from '../player/player.schemas';

import { noLogin } from './login.constants';

export const loginValidator = (
    loginRef: RefObject<HTMLInputElement>
): string => {
    if (!loginRef.current) {
        return noLogin;
    }

    const res = playerLoginSchema.safeParse(loginRef.current.value.trim());
    return res.success ? res.data : noLogin;
};
