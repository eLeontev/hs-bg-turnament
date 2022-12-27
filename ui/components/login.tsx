'use client';

import { useRouter } from 'next/navigation';

import {
    logoutHandler,
    redirectToLoginPageHandler,
} from '../../services/login.service';

import { getLogin } from '../../utils.ts/storage.utils';

export const Login = () => {
    const router = useRouter();
    const login = getLogin();

    return login ? (
        <>
            <span>
                Hi, <b>{login}</b>
            </span>
            <button onClick={() => logoutHandler(router)}>Logout</button>
        </>
    ) : (
        <button onClick={() => redirectToLoginPageHandler(router)}>
            Login
        </button>
    );
};
