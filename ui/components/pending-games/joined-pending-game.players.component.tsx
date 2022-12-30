import { Players } from '../../../models/player-id.models';

export type JoinedPendingGamePlayersProps = {
    players: Players;
};

export const JoinedPendingGamePlayers = ({
    players,
}: JoinedPendingGamePlayersProps) => (
    <ul>
        {players.map(({ playerId, playerLogin }) => (
            <li key={playerId}>{playerLogin}</li>
        ))}
    </ul>
);
