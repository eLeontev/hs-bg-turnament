import { Button } from '../button.component';

import { useDeletePendingGameRef } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { deletePendingGameLabel } from '../../../constants/pending-games.constants';

import { GameId } from '../../../models/common.models';

export type DeletePendingGameProps = { gameId: GameId };

export const DeletePendingGame = ({ gameId }: DeletePendingGameProps) => {
    const action = useDeletePendingGameRef();
    const onClick = () => action(gameId);

    return <Button onClick={onClick} label={deletePendingGameLabel}></Button>;
};
