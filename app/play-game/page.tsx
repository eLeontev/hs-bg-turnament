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
import { OverlayLoader } from '../../features/common/components/loader.component';

const PlayGameScreen = () => {
    const { isLoading, isError, data } = usePlayGameInitialization();

    const { gameId } = useRecoilValue(playGameBaseInputState);

    useOnlineGameSocketRoom(gameId, true);

    const onlinePlayerIds = useOnlinePlayerKeys();
    const playGameActions = usePlayGameActions(gameId);

    console.log(onlinePlayerIds);
    console.log(playGameActions);

    if (isLoading) {
        return <OverlayLoader visible></OverlayLoader>;
    }

    if (isError) {
        return <b>Something went wrong</b>;
    }

    if (data) {
        return <PlayGameDesk></PlayGameDesk>;
    }

    return null;
};

export default PlayGameScreen;
