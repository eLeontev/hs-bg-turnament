import { useOnlinePlayerIds } from '../../../hooks/online-game.socket.hooks';
import { OnlinePlayerIds } from '../../../models/online-game.models';
import { Players } from '../../../models/player-id.models';

export type JoinedPendingGamePlayersProps = {
    players: Players;
    onlinePlayerIds: OnlinePlayerIds;
};

export const JoinedPendingGamePlayers = ({
    players,
    onlinePlayerIds,
}: JoinedPendingGamePlayersProps) => {
    return (
        <ul>
            {players.map(({ playerId, playerLogin }) => (
                <li key={playerId}>
                    {playerLogin} -{' '}
                    {onlinePlayerIds.has(playerId) ? 'online' : 'offline'}
                </li>
            ))}
        </ul>
    );
};
