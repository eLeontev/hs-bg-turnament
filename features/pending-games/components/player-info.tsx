import { Card, Group, Badge } from '@mantine/core';

import { LabelTrans } from '../../../i18n/i18n.trans.component';
import { PairComponent } from '../../common/components/pair.component';

import {
    onlinePlayersSelector,
    usePlayersStore,
} from '../../play-game/components/store/play-game.players.store';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { PublicPlayer } from '../../player/player.models';

export type PlayerInfoProps = {
    player: PublicPlayer;
};

export const PlayerInfo = ({
    player: { playerLogin, playerKey },
}: PlayerInfoProps) => {
    const t = useI18nLabelTranslate();

    const onlinePlayerKeys = usePlayersStore(onlinePlayersSelector);
    const color = onlinePlayerKeys.has(playerKey) ? 'green' : 'red';
    const onlineI18nKey = onlinePlayerKeys.has(playerKey)
        ? labelI18nKeys.online
        : labelI18nKeys.offline;

    return (
        <Card h="60px">
            <Group position="apart">
                <PairComponent
                    label={t(labelI18nKeys.player)}
                    value={playerLogin}
                ></PairComponent>
                <Badge color={color} variant="light">
                    <LabelTrans i18nKey={onlineI18nKey}></LabelTrans>
                </Badge>
            </Group>
        </Card>
    );
};
