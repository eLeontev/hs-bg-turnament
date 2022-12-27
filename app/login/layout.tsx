'use client';

import { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { getLogin } from '../../utils.ts/storage.utils';
import { rootPageUrl } from '../../constants/urls';

export type LoginlayoutProps = {
    children: ReactElement;
};

const Loginlayout = ({ children }: LoginlayoutProps) => {
    const isLoggedIn = getLogin();
    const router = useRouter();

    if (isLoggedIn) {
        router.push(rootPageUrl);

        return null;
    }

    return children;
};

export default Loginlayout;
