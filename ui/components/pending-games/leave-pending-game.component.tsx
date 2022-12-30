import { Button } from '../button.component';

import { useLeavePendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { leavePendingGameLabel } from '../../../constants/pending-games.constants';

import { GameId } from '../../../models/common.models';

export type LeavePendingGameProps = { gameId: GameId };

export const LeavePendingGame = ({ gameId }: LeavePendingGameProps) => {
    const action = useLeavePendingGame();
    const onClick = () => action(gameId);

    return <Button onClick={onClick} label={leavePendingGameLabel}></Button>;
};
