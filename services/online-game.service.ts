import { onlineRooms } from '../storages/online-game.storage';

import { GameId, PlayerId } from '../models/common.models';
import {
    JoinLeaveOnlineRoomPayload,
    OnlinePlayerIds,
} from '../models/online-game.models';

const registerPlayerIdOnline = (
    onlinePlayerIds: OnlinePlayerIds,
    playerId: PlayerId
) => new Set(onlinePlayerIds.add(playerId));

const registerPlayerIdOffine = (
    onlinePlayerIds: OnlinePlayerIds,
    playerId: PlayerId
) => {
    onlinePlayerIds.delete(playerId);
    return new Set(onlinePlayerIds);
};

const getOnlinePlayersInTheRoom = (gameId: GameId) =>
    onlineRooms.get(gameId) || new Set();

export const getListOfOnlinePlayerIds = (gameId: GameId) =>
    Array.from(getOnlinePlayersInTheRoom(gameId));

export const joinPlayerIdToTheRoom = ({
    gameId,
    playerId,
}: JoinLeaveOnlineRoomPayload) => {
    const onlinePlayerIds = getOnlinePlayersInTheRoom(gameId);
    onlineRooms.set(gameId, registerPlayerIdOnline(onlinePlayerIds, playerId));
};

export const leavePlayerIdToTheRoom = ({
    gameId,
    playerId,
}: JoinLeaveOnlineRoomPayload) => {
    const onlinePlayerIds = getOnlinePlayersInTheRoom(gameId);
    const restOnlinePlayerIds = registerPlayerIdOffine(
        onlinePlayerIds,
        playerId
    );

    if (restOnlinePlayerIds.size) {
        onlineRooms.set(
            gameId,
            registerPlayerIdOffine(onlinePlayerIds, playerId)
        );
    } else {
        onlineRooms.delete(gameId);
    }
};
