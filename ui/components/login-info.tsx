import Link from 'next/link';

import { loginPageUrl } from '../../constants/urls';

export const LoginInfo = () => (
    <>
        Before to play please create an account at{' '}
        <Link href={loginPageUrl}>login page</Link>
    </>
);
