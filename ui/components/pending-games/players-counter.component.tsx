import { Group, Text } from '@mantine/core';

import { maxCountOfPlayers } from '../../../constants/game-config.constants';

import { Players } from '../../../models/player-id.models';

export type PlayersCounterProps = { players: Players };

export const PlayersCounter = ({ players }: PlayersCounterProps) => (
    <Group>
        Count of players:
        <Text component="b">
            {players.length}/{maxCountOfPlayers}
        </Text>
    </Group>
);
