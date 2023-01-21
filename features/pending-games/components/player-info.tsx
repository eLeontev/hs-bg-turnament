import { Card, Group, Badge } from '@mantine/core';

import { PairComponent } from '../../common/components/pair.component';

import {
    onlinePlayersSelector,
    usePlayersStore,
} from '../../play-game/components/store/play-game.players.store';
import { PublicPlayer } from '../../player/player.models';

export type PlayerInfoProps = {
    player: PublicPlayer;
};

export const PlayerInfo = ({
    player: { playerLogin, playerKey },
}: PlayerInfoProps) => {
    const onlinePlayerKeys = usePlayersStore(onlinePlayersSelector);
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
