'use client';

import { LoggedInInfo } from './logged-in-info';
import { LoginInfo } from './login-info';

import { getLogin } from '../../utils.ts/storage.utils';

export const WelcomeScreen = () => {
    const isLoggedIn = getLogin();

    return (
        <>
            <h1>welcome to Hearthstone Battlegrounds Turnament</h1>
            {isLoggedIn ? (
                <LoggedInInfo></LoggedInInfo>
            ) : (
                <LoginInfo></LoginInfo>
            )}
        </>
    );
};
