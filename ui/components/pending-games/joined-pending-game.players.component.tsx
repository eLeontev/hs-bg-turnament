import { Group } from '@mantine/core';

import { PlayerInfo } from './player-info';

import { OnlinePlayerIds } from '../../../models/online-game.models';
import { Player, Players } from '../../../models/player.models';

export type JoinedPendingGamePlayersProps = {
    players: Players;
    onlinePlayerIds: OnlinePlayerIds;
};

export const JoinedPendingGamePlayers = ({
    players,
    onlinePlayerIds,
}: JoinedPendingGamePlayersProps) => {
    return (
        <Group>
            {players.map((player: Player) => (
                <PlayerInfo
                    key={player.playerId}
                    player={player}
                    onlinePlayerIds={onlinePlayerIds}
                ></PlayerInfo>
            ))}
        </Group>
    );
};
