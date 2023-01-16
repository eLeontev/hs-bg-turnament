'use client';

import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { rootPageUrl } from '../../constants/urls';

import { playerLoginState } from '../../features/login/components/atoms/player-login.atom';

export type LoginlayoutProps = {
    children: ReactElement;
};

const Loginlayout = ({ children }: LoginlayoutProps) => {
    const isLoggedIn = useRecoilValue(playerLoginState);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push(rootPageUrl);
        }
    }, [isLoggedIn, router]);

    return children;
};

export default Loginlayout;
