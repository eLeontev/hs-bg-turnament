import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSocket } from '../../../lib/socket.client';

import { playGameJoinLeavePayloadSchema } from '../schemas/play-game.schemas';

import { playGamePageUrl } from '../../../constants/urls';

import {
    playGameEventNames,
    socketRoomChangesEventNames,
} from '../../common/sockets/socket.enums';
import { playGameActions } from '../play-game.enums';

import { GameId } from '../../../models/common.models';
import { PlayGameAction, PlayGameActions } from '../models/play-game.models';

import { getPlayerIdInGame, setGameId } from '../../../utils.ts/storage.utils';

export const useStartPlayGameFromSocket = () => {
    const socket = useSocket();
    const router = useRouter();

    useEffect(() => {
        socket.on(playGameEventNames.startPlayGame, (gameId: GameId) => {
            setGameId(gameId);
            router.push(playGamePageUrl);
        });

        return () => {
            socket.removeAllListeners(playGameEventNames.startPlayGame);
        };
    }, [socket, router]);
};

export const usePlayGameActions = (gameId: GameId) => {
    const [gameActions, setPlayGameActions] = useState<PlayGameActions>([]);
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

        socket.on(
            playGameEventNames.gameAction,
            (gameAction: PlayGameAction<playGameActions>) =>
                setPlayGameActions((gameActions) => [
                    ...gameActions,
                    gameAction,
                ])
        );

        return () => {
            socket.emit(socketRoomChangesEventNames.leavePlayGameRoom);
            socket.removeAllListeners(playGameEventNames.gameAction);
        };
    }, [socket, gameId]);

    return gameActions;
};
