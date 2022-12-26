import { RefObject } from 'react';
import { playerLoginSchema } from '../schemas/player.schemas';

const noLogin = ''; // TODO:improve valdiation flow

export const loginValidator = (
    loginRef: RefObject<HTMLInputElement>
): string => {
    if (!loginRef.current) {
        return noLogin;
    }

    const res = playerLoginSchema.safeParse(loginRef.current.value.trim());
    return res.success ? res.data : noLogin;
};
