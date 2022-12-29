import { GameId, PlayerId } from '../../models/common.models';

export const registerPlayerOnline = (
    onlinePlayerIdsPerGame: Map<GameId, Set<PlayerId>>,
    gameId: GameId,
    playerId: PlayerId
) => {
    const onlinePlayerIds =
        onlinePlayerIdsPerGame.get(gameId) || new Set<PlayerId>();
    onlinePlayerIds.add(playerId);
    onlinePlayerIdsPerGame.set(gameId, onlinePlayerIds);

    return Array.from(onlinePlayerIds);
};

export const deleteOnlinePlayerIds = (
    onlinePlayerIdsPerGame: Map<GameId, Set<PlayerId>>,
    gameId: GameId
) => {
    if (onlinePlayerIdsPerGame.get(gameId)?.size === 1) {
        onlinePlayerIdsPerGame.delete(gameId);
    }
};
