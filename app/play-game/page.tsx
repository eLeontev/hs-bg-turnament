'use client';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerIds,
} from '../../hooks/online-game.socket.hooks';
import { usePlayGameActions } from '../../hooks/play-game/play-game.socket.hooks';
import { trpc } from '../../lib/client';

import { getGameId } from '../../utils.ts/storage.utils';

const Test = () => {
    const { data, mutate } = trpc.selectHero.useMutation();
    const onClick = () =>
        mutate({
            playerIdInGame: 'asdasd',
            gameId: getGameId() || '',
            heroId: '321',
        });
    console.log(data);
    return (
        <>
            <button onClick={onClick}>mutate</button>
        </>
    );
};

const PlayGameScreen = () => {
    const gameId = getGameId() || '';

    useOnlineGameSocketRoom(gameId, true);
    const onlinePlayerIds = useOnlinePlayerIds();

    const playGameActions = usePlayGameActions(gameId);

    console.log(onlinePlayerIds);
    console.log(playGameActions);

    return (
        <>
            <Test></Test>the game has been started
        </>
    );
};

export default PlayGameScreen;
