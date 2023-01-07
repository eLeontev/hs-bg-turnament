import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSocket } from '../../lib/socket.client';

import { playGamePageUrl } from '../../constants/urls';

import { playGameEventNames } from '../../enums/socket.enums';

import { GameId } from '../../models/common.models';

import { setGameId } from '../../utils.ts/storage.utils';

export const useStartPlayGameFromSocket = () => {
    const socket = useSocket();
    const router = useRouter();

    useEffect(() => {
        socket.on(playGameEventNames.startPlayGame, (gameId: GameId) => {
            setGameId(gameId);
            router.push(playGamePageUrl);
        });

        return () => {
            socket.removeAllListeners(playGameEventNames.startPlayGame);
        };
    }, [socket, router]);
};
