import { IconArrowRight } from '@tabler/icons';

import { Group, Tooltip } from '@mantine/core';

import { IconButton } from '../button.component';

import { useJoinPendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { GameId } from '../../../models/common.models';

import { shouldDisplayTooltip } from '../../../utils.ts/tooltip.utils';

const playerInGameDisableReasonLabel = 'only one game is avaialble at time';

export type JoinPendingGameProps = { gameId: GameId; isInGame: boolean };

export const JoinPendingGame = ({ gameId, isInGame }: JoinPendingGameProps) => {
    const action = useJoinPendingGame();

    const onClick = () => action(gameId);

    return (
        <Tooltip
            withArrow
            color="red"
            label={playerInGameDisableReasonLabel}
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
