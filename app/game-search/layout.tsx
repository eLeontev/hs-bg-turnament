'use client';

import { useSocketInitialization } from '../../lib/socket.client';

const GameSearchLayout = ({ children }: any) => {
    const socket = useSocketInitialization();
    return socket ? <>{children}</> : <>loading...</>;
};

export default GameSearchLayout;
