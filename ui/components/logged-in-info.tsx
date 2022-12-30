import Link from 'next/link';

import { pendingGamesPageUrl } from '../../constants/urls';

export const LoggedInInfo = () => (
    <>
        To start to search games please visit{' '}
        <Link href={pendingGamesPageUrl}>pending-games page</Link>
    </>
);
