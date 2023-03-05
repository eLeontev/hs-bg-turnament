'use client';

import { Box } from '@mantine/core';

import { PlayGameDesk } from '../../features/play-game/components/play-game.desk.component';
import { ErrorHandlerComponent } from '../../features/play-game/components/error-handler/error-handler.component';
import { PhaseWaiterComponent } from '../../features/play-game/components/play-game.phase-waiter.component';

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

    return (
        <Box>
            <ErrorHandlerComponent></ErrorHandlerComponent>
            <PhaseWaiterComponent></PhaseWaiterComponent>
            <PlayGameDesk></PlayGameDesk>;
        </Box>
    );
};

export default PlayGameScreen;
