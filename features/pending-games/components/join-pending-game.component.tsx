import { IconArrowRight } from '@tabler/icons';

import { Group, Tooltip } from '@mantine/core';

import { IconButton } from '../../common/components/button.component';

import { joinPendingGameResponseHandler } from '../services/pending-games.client.service';

import { useJoinPendingGame } from '../hooks/pending-games.mutation.hooks';
import { useI18nTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { GameId } from '../../../models/common.models';

import { shouldDisplayTooltip } from '../../../utils.ts/tooltip.utils';

export type JoinPendingGameProps = { gameId: GameId; isInGame: boolean };

export const JoinPendingGame = ({ gameId, isInGame }: JoinPendingGameProps) => {
    const t = useI18nTranslate();

    const action = useJoinPendingGame();
    const onClick = () => action(gameId).then(joinPendingGameResponseHandler);

    return (
        <Tooltip
            withArrow
            color="red"
            label={t(labelI18nKeys.playerInGameDisableReasonLabel)}
            events={shouldDisplayTooltip(isInGame)}
        >
            <Group>
                <IconButton color="green" onClick={onClick} disabled={isInGame}>
                    <IconArrowRight></IconArrowRight>
                </IconButton>
            </Group>
        </Tooltip>
    );
};
