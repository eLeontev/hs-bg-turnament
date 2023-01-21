import { Group } from '@mantine/core';

import { PlayerInfo } from './player-info';

import { PublicPlayer, PublicPlayers } from '../../player/player.models';

export type JoinedPendingGamePlayersProps = {
    players: PublicPlayers;
};

export const JoinedPendingGamePlayers = ({
    players,
}: JoinedPendingGamePlayersProps) => (
    <Group>
        {players.map((player: PublicPlayer) => (
            <PlayerInfo key={player.playerKey} player={player}></PlayerInfo>
        ))}
    </Group>
);
