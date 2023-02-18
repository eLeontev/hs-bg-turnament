export const getAlivePlayers = <T extends { countOfHitPoints: number }>(
    players: Array<T>
) => players.filter(({ countOfHitPoints }) => countOfHitPoints);
