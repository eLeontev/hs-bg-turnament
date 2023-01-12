'use client';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerIds,
} from '../../hooks/online-game.socket.hooks';
import { usePlayGame } from '../../hooks/play-game/play-game.socket.hooks';

import { getGameId } from '../../utils.ts/storage.utils';

const PlayGameScreen = () => {
    const gameId = getGameId() || '';

    useOnlineGameSocketRoom(gameId, true);
    const onlinePlayerIds = useOnlinePlayerIds();

    const data = usePlayGame(gameId);

    console.log(onlinePlayerIds);
    console.log(data);

    return <>the game has been started</>;
};
export default PlayGameScreen;
