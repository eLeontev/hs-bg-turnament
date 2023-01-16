import { GameId, PlayerId, PlayerKey } from '../../../models/common.models';

export type OnlinePlayerKeys = Set<PlayerKey>;

export type JoinLeaveOnlineRoomPayload = {
    gameId: GameId;
    playerId: PlayerId;
    playerKey: PlayerKey;
    isPlayGame?: boolean;
};

export type ListOfOnlinePlayerKeys = Array<PlayerKey>;
export type OnlineRooms = Map<GameId, OnlinePlayerKeys>;
