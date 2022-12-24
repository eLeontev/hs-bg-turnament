'use client';

import { useRouter } from 'next/navigation';
import { useRef, RefObject, useState, Dispatch, SetStateAction } from 'react';
import { noLogin } from '../../constants/login.constants';

import { loginAction, loginHandler } from '../../services/login.service';

const LoginDefinition = ({ login }: { login: string }) => {
    const router = useRouter();
    loginHandler(router, login);

    return <>loading...</>;
};

const Login = () => {
    const [login, setLogin] = useState(noLogin);
    const loginRef = useRef<HTMLInputElement>(null);

    const onLogin = loginAction(setLogin, loginRef);

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
            {login && <LoginDefinition login={login} />}
        </section>
    );
};

export default Login;
