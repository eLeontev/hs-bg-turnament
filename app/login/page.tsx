'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { loginAction } from '../../services/login.service';

const Login = () => {
    const loginRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onLogin = loginAction(loginRef, router);

    return (
        <section>
            Login
            <section>
                <label htmlFor="name">
                    To start the game search you need to enter login
                    <input
                        onKeyDown={onLogin}
                        ref={loginRef}
                        name="name"
                        type="text"
                    />
                </label>
                <button onClick={onLogin}>Login</button>
            </section>
        </section>
    );
};

export default Login;
