import { PlayGamePlayer, PlayGamePlayers } from '../../player/player.models';

export const buildPlayerPairs = (players: PlayGamePlayers) => {
    const sortedPlayers = players.sort(
        (playerA: PlayGamePlayer, playerB: PlayGamePlayer) => {
            if (hasMoreHitPointsWithArmor(playerA, playerB)) {
                return 1;
            }
            if (hasMoreHitPointsWithArmor(playerB, playerA)) {
                return -1;
            }

            if (isLastWin(playerA, playerB)) {
                return 1;
            }

            if (isLastWin(playerB, playerA)) {
                return -1;
            }

            return 0;
        }
    );

    const playersWithOpponent: PlayGamePlayers = [];
    for (let i = 0; i < sortedPlayers.length - 1; i += 2) {
        const playerA = sortedPlayers[i];
        const playerB = sortedPlayers[i + 1];

        playersWithOpponent.push({ ...playerA, ...getPlayerOpponent(playerB) });
        playersWithOpponent.push({ ...playerB, ...getPlayerOpponent(playerA) });
    }

    return playersWithOpponent;
};

function getPlayerOpponent({ playerIdInGame, playerKey }: PlayGamePlayer): {
    opponentId: string;
    opponentKey: string;
} {
    return { opponentId: playerIdInGame, opponentKey: playerKey };
}

function hasMoreHitPointsWithArmor(
    playerA: PlayGamePlayer,
    playerB: PlayGamePlayer
): boolean {
    return (
        playerA.countOfArmor + playerA.countOfHitPoints >
        playerB.countOfArmor + playerB.countOfHitPoints
    );
}

function isLastWin(playerA: PlayGamePlayer, playerB: PlayGamePlayer): boolean {
    return Boolean(playerA.isWonLastTime && !playerB.isWonLastTime);
}
