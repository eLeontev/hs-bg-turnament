import { IconPlayerPlay } from '@tabler/icons';

import { IconButton } from '../button.component';

import { useStartPendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { GameId } from '../../../models/common.models';

export type StartPendingGameProps = { gameId: GameId };

export const StartPendingGame = ({ gameId }: StartPendingGameProps) => {
    const action = useStartPendingGame();
    const onClick = () => action(gameId);

    return (
        <IconButton color="green" onClick={onClick}>
            <IconPlayerPlay></IconPlayerPlay>
        </IconButton>
    );
};
