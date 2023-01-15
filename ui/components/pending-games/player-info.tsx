import { Card, Group, Badge } from '@mantine/core';

import { PairComponent } from '../pair.component';

import { OnlinePlayerKeys } from '../../../models/online-game.models';
import { PublicPlayer } from '../../../models/player.models';

export type PlayerInfoProps = {
    player: PublicPlayer;
    onlinePlayerKeys: OnlinePlayerKeys;
};

export const PlayerInfo = ({
    player: { playerLogin, playerKey },
    onlinePlayerKeys,
}: PlayerInfoProps) => {
    const color = onlinePlayerKeys.has(playerKey) ? 'green' : 'red';
    const onlineLabel = onlinePlayerKeys.has(playerKey) ? 'Online' : 'Offline';

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
