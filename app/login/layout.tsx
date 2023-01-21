'use client';

import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { rootPageUrl } from '../../constants/urls';

import {
    isLoggedInSelector,
    useLoginStore,
} from '../../features/login/components/store/login.store';

export type LoginlayoutProps = {
    children: ReactElement;
};

const Loginlayout = ({ children }: LoginlayoutProps) => {
    const isLoggedIn = useLoginStore(isLoggedInSelector);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push(rootPageUrl);
        }
    }, [isLoggedIn, router]);

    return children;
};

export default Loginlayout;
