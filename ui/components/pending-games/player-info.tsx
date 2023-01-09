import { Card, Group, Badge } from '@mantine/core';

import { PairComponent } from '../pair.component';

import { OnlinePlayerIds } from '../../../models/online-game.models';
import { Player } from '../../../models/player.models';

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
        <Card h="60px">
            <Group position="apart">
                <PairComponent
                    label="Player"
                    value={playerLogin}
                ></PairComponent>
                <Badge color={color} variant="light">
                    {onlineLabel}
                </Badge>
            </Group>
        </Card>
    );
};
