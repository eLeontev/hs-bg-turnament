import Link from 'next/link';

import { gameSearchPageUrl } from '../../constants/urls';

export const LoggedInInfo = () => (
    <>
        To start to search games please visit{' '}
        <Link href={gameSearchPageUrl}>game search page</Link>
    </>
);
