import { Group } from '@mantine/core';

import { PlayerInfo } from './player-info';

import { OnlinePlayerKeys } from '../../common/sockets/online-game.models';
import { PublicPlayer, PublicPlayers } from '../../player/player.models';

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
