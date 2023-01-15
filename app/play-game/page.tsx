'use client';

import { trpc } from '../../lib/client';

import { PlayGameDesk } from '../../ui/components/play-game/play-game.desk.component';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerIds,
} from '../../hooks/online-game.socket.hooks';
import { usePlayGameActions } from '../../hooks/play-game/play-game.socket.hooks';

import { getGameId } from '../../utils.ts/storage.utils';

const PlayGameScreen = () => {
    const gameId = getGameId() || '';

    useOnlineGameSocketRoom(gameId, true);
    const onlinePlayerIds = useOnlinePlayerIds();

    const playGameActions = usePlayGameActions(gameId);

    console.log(onlinePlayerIds);
    console.log(playGameActions);

    return <PlayGameDesk></PlayGameDesk>;
};

export default PlayGameScreen;
