import { IconArrowLeft } from '@tabler/icons';

import { IconButton } from '../../common/components/button.component';

import { useLeavePendingGame } from '../hooks/pending-games.mutation.hooks';

import { GameId } from '../../../models/common.models';

export type LeavePendingGameProps = { gameId: GameId };

export const LeavePendingGame = ({ gameId }: LeavePendingGameProps) => {
    const action = useLeavePendingGame();
    const onClick = () => action(gameId);

    return (
        <IconButton color="red" onClick={onClick}>
            <IconArrowLeft></IconArrowLeft>
        </IconButton>
    );
};
