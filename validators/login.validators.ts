import { RefObject } from 'react';
import { loginSchema } from '../schemas/login.schemas';

const noLogin = ''; // TODO:improve valdiation flow

export const loginValidator = (
    loginRef: RefObject<HTMLInputElement>
): string => {
    if (!loginRef.current) {
        return noLogin;
    }

    const res = loginSchema.safeParse(loginRef.current.value.trim());
    return res.success ? res.data : noLogin;
};
