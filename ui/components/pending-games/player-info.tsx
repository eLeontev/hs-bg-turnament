import { Card, Group, Badge, Text } from '@mantine/core';

import { OnlinePlayerIds } from '../../../models/online-game.models';
import { Player } from '../../../models/player-id.models';

export type PlayerInfoProps = {
    player: Player;
    onlinePlayerIds: OnlinePlayerIds;
};

export const PlayerInfo = ({
    player: { playerLogin, playerId },
    onlinePlayerIds,
}: PlayerInfoProps) => {
    const color = onlinePlayerIds.has(playerId) ? 'green' : 'red';
    const onlineLabel = onlinePlayerIds.has(playerId) ? 'Online' : 'Offline';
    return (
        <Card>
            <Group position="apart">
                <Text>Player:</Text>
                <Text weight={500}>{playerLogin}</Text>
                <Badge color={color} variant="light">
                    {onlineLabel}
                </Badge>
            </Group>
        </Card>
    );
};
