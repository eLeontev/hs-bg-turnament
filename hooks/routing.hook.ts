import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { usePathname } from 'next/navigation';

import {
    gameSearchPageUrl,
    loginPageUrl,
    rootPageUrl,
} from '../constants/urls';

import { getLogin } from '../utils.ts/storage.utils';

const isLoginPage = (pathname: string | null) => pathname === loginPageUrl;
const isRootPage = (pathname: string | null) => pathname === rootPageUrl;

export const useRouting = (router: AppRouterInstance) => {
    const pathname = usePathname();
    const login = getLogin();

    if (isRootPage(pathname)) {
        router.push(loginPageUrl);
        return;
    }

    const isOnLoginPage = isLoginPage(pathname);
    if (!login && !isOnLoginPage) {
        router.push(loginPageUrl);
        return;
    }

    if (login && isOnLoginPage) {
        router.push(gameSearchPageUrl);
        return;
    }
};
