import { IconArrowRight } from '@tabler/icons';

import { IconButton } from '../button.component';

import { useJoinPendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { GameId } from '../../../models/common.models';

export type JoinPendingGameProps = { gameId: GameId };

export const JoinPendingGame = ({ gameId }: JoinPendingGameProps) => {
    const action = useJoinPendingGame();
    const onClick = () => action(gameId);

    return (
        <IconButton color="green" onClick={onClick}>
            <IconArrowRight></IconArrowRight>
        </IconButton>
    );
};
