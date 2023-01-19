'use client';

import { trpc } from '../../lib/client';

import { PlayGameDesk } from '../../features/play-game/components/play-game.desk.component';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerKeys,
} from '../../features/common/sockets/online-game.socket.hooks';
import { usePlayGameActions } from '../../features/play-game/hooks/play-game.socket.hooks';
import { usePlayGameInitialization } from '../../features/play-game/hooks/play-game.hooks';

import { getGameId } from '../../utils.ts/storage.utils';

const PlayGameScreen = () => {
    const gameId = getGameId() || '';

    useOnlineGameSocketRoom(gameId, true);
    const onlinePlayerIds = useOnlinePlayerKeys();

    const playGameActions = usePlayGameActions(gameId);
    usePlayGameInitialization();

    console.log(onlinePlayerIds);
    console.log(playGameActions);

    return <PlayGameDesk></PlayGameDesk>;
};

export default PlayGameScreen;
