import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSocket } from '../../../lib/socket.client';

import { playGameJoinLeavePayloadSchema } from '../schemas/play-game.schemas';

import { playGameActionsHandler } from '../services/play-game.actions.service';

import {
    displayOverlaySelector,
    hideOverlaySelector,
    useWaitingPlayGameStore,
} from '../../pending-games/components/stores/pending-game.waiting-game.store';

import {
    playGameEventNames,
    socketRoomChangesEventNames,
} from '../../common/sockets/socket.enums';

import { GameId } from '../../../models/common.models';

import { getPlayerIdInGame, setGameId } from '../../../utils.ts/storage.utils';

import { playGamePageUrl } from '../../../constants/urls';

export const useStartPlayGameFromSocket = () => {
    const socket = useSocket();
    const router = useRouter();

    const displayOverlay = useWaitingPlayGameStore(displayOverlaySelector);
    const hideOverlay = useWaitingPlayGameStore(hideOverlaySelector);

    useEffect(() => {
        socket.on(playGameEventNames.startPlayGame, (gameId: GameId) => {
            displayOverlay();
            setGameId(gameId);
            router.push(playGamePageUrl);
        });

        return () => {
            socket.removeAllListeners(playGameEventNames.startPlayGame);
            hideOverlay();
        };
    }, [socket, router, displayOverlay, hideOverlay]);
};

export const usePlayGameActions = (gameId: GameId) => {
    const socket = useSocket();

    useEffect(() => {
        const playGameJoinLeavePayload = playGameJoinLeavePayloadSchema.parse({
            gameId,
            playerIdInGame: getPlayerIdInGame(),
        });

        socket.emit(
            socketRoomChangesEventNames.joinPlayGameRoom,
            playGameJoinLeavePayload
        );

        socket.on(playGameEventNames.gameAction, playGameActionsHandler);

        return () => {
            socket.emit(socketRoomChangesEventNames.leavePlayGameRoom);
            socket.removeAllListeners(playGameEventNames.gameAction);
        };
    }, [socket, gameId]);
};
