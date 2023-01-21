'use client';

import { PlayGameDesk } from '../../features/play-game/components/play-game.desk.component';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerKeys,
} from '../../features/common/sockets/online-game.socket.hooks';
import { usePlayGameActions } from '../../features/play-game/hooks/play-game.socket.hooks';

import {
    baseInputSelector,
    usePlayGameStore,
} from '../../features/play-game/components/store/play-game.store';

const PlayGameScreen = () => {
    const { gameId } = usePlayGameStore(baseInputSelector);

    useOnlineGameSocketRoom(gameId, true);
    usePlayGameActions(gameId);
    useOnlinePlayerKeys();

    return <PlayGameDesk></PlayGameDesk>;
};

export default PlayGameScreen;
