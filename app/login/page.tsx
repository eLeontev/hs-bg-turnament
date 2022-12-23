'use client';

import { useRouter } from 'next/navigation';
import { useRef, KeyboardEvent, MouseEvent } from 'react';

import { loginHandler, shouldSkipLogin } from '../../services/login.service';

const Login = () => {
    const loginRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const login = (event: MouseEvent | KeyboardEvent) => {
        if (shouldSkipLogin(event)) {
            return;
        }

        loginHandler(router, loginRef);
    };

    return (
        <section>
            Login
            <section>
                <label htmlFor="name">
                    To start the game search you need to enter login
                    <input
                        onKeyDown={login}
                        ref={loginRef}
                        name="name"
                        type="text"
                    />
                </label>
                <button onClick={login}>Login</button>
            </section>
        </section>
    );
};

export default Login;
