'use client';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerIds,
} from '../../hooks/online-game.socket.hooks';

import { getGameId } from '../../utils.ts/storage.utils';

const PlayGameScreen = () => {
    useOnlineGameSocketRoom(getGameId() || '', true);
    const onlinePlayerIds = useOnlinePlayerIds();
    console.log(onlinePlayerIds);

    return <>the game has been started</>;
};
export default PlayGameScreen;
