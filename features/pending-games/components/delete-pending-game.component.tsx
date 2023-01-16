import { IconTrash } from '@tabler/icons';

import { useDeletePendingGame } from '../hooks/pending-games.mutation.hooks';

import { IconButton } from '../../common/components/button.component';

import { GameId } from '../../../models/common.models';

export type DeletePendingGameProps = { gameId: GameId };

export const DeletePendingGame = ({ gameId }: DeletePendingGameProps) => {
    const action = useDeletePendingGame();
    const onClick = () => action(gameId);

    return (
        <IconButton color="red" onClick={onClick}>
            <IconTrash></IconTrash>
        </IconButton>
    );
};
