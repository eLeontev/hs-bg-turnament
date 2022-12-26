'use client';

import Link from 'next/link';
import { gameSearchPageUrl } from '../../constants/urls';
import { useSocketInitialization } from '../../lib/socket.client';

const GamePlayLayout = ({ children }: any) => {
    const socket = useSocketInitialization();
    return socket ? (
        <>
            <p>
                <Link href={gameSearchPageUrl}>go to game search page</Link>
            </p>
            {children}
        </>
    ) : (
        <>loading...</>
    );
};

export default GamePlayLayout;
