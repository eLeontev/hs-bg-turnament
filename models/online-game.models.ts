import { GameId, PlayerId } from './common.models';

export type OnlinePlayerIds = Set<PlayerId>;

export type JoinLeaveOnlineRoomPayload = {
    gameId: GameId;
    playerId: PlayerId;
};

export type ListOfOnlinePlayerIds = Array<PlayerId>;
export type OnlineRooms = Map<GameId, OnlinePlayerIds>;
