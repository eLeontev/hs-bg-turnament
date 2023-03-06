import { onlineRooms } from './online-game.storage';

import { GameId, PlayerKey } from '../../../models/common.models';
import {
    JoinLeaveOnlineRoomPayload,
    OnlinePlayerKeys,
} from './online-game.models';

const registerPlayerKeyOnline = (
    onlinePlayerKeys: OnlinePlayerKeys,
    playerKey: PlayerKey
) => new Set(onlinePlayerKeys.add(playerKey));

const registerPlayerKeyOffline = (
    onlinePlayerKeys: OnlinePlayerKeys,
    playerKey: PlayerKey
) => {
    onlinePlayerKeys.delete(playerKey);
    return new Set(onlinePlayerKeys);
};

const getOnlinePlayerKeysInTheRoom = (gameId: GameId) =>
    onlineRooms.get(gameId) || new Set();

export const getListOfOnlinePlayerIds = (gameId: GameId) =>
    Array.from(getOnlinePlayerKeysInTheRoom(gameId));

export const joinPlayerIdToTheRoom = ({
    gameId,
    playerKey,
}: JoinLeaveOnlineRoomPayload) => {
    const onlinePlayerKeys = getOnlinePlayerKeysInTheRoom(gameId);
    onlineRooms.set(
        gameId,
        registerPlayerKeyOnline(onlinePlayerKeys, playerKey)
    );
};

export const leavePlayerKeyFromTheRoom = ({
    gameId,
    playerKey,
}: JoinLeaveOnlineRoomPayload) => {
    const onlinePlayerKeys = getOnlinePlayerKeysInTheRoom(gameId);
    const restOnlinePlayerKeys = registerPlayerKeyOffline(
        onlinePlayerKeys,
        playerKey
    );

    if (restOnlinePlayerKeys.size) {
        onlineRooms.set(
            gameId,
            registerPlayerKeyOffline(onlinePlayerKeys, playerKey)
        );
    } else {
        onlineRooms.delete(gameId);
    }
};
