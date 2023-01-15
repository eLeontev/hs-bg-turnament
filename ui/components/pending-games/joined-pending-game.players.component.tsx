import { Group } from '@mantine/core';

import { PlayerInfo } from './player-info';

import { OnlinePlayerKeys } from '../../../models/online-game.models';
import { PublicPlayer, PublicPlayers } from '../../../models/player.models';

export type JoinedPendingGamePlayersProps = {
    players: PublicPlayers;
    onlinePlayerKeys: OnlinePlayerKeys;
};

export const JoinedPendingGamePlayers = ({
    players,
    onlinePlayerKeys,
}: JoinedPendingGamePlayersProps) => {
    return (
        <Group>
            {players.map((player: PublicPlayer) => (
                <PlayerInfo
                    key={player.playerKey}
                    player={player}
                    onlinePlayerKeys={onlinePlayerKeys}
                ></PlayerInfo>
            ))}
        </Group>
    );
};
