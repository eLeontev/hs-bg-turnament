'use client';

import { useRecoilValue } from 'recoil';

import { PlayGameDesk } from '../../features/play-game/components/play-game.desk.component';

import {
    useOnlineGameSocketRoom,
    useOnlinePlayerKeys,
} from '../../features/common/sockets/online-game.socket.hooks';
import { usePlayGameActions } from '../../features/play-game/hooks/play-game.socket.hooks';
import { usePlayGameInitialization } from '../../features/play-game/hooks/play-game.hooks';

import { playGameBaseInputState } from '../../features/play-game/components/atoms/play-game.base-input.atom';

const PlayGameScreen = () => {
    usePlayGameInitialization();

    const { gameId } = useRecoilValue(playGameBaseInputState);

    useOnlineGameSocketRoom(gameId, true);

    const onlinePlayerIds = useOnlinePlayerKeys();
    const playGameActions = usePlayGameActions(gameId);

    console.log(onlinePlayerIds);
    console.log(playGameActions);

    return <PlayGameDesk></PlayGameDesk>;
};

export default PlayGameScreen;
