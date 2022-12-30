import { Button } from '../button.component';

import { useStartPendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { startPendingGameLabel } from '../../../constants/pending-games.constants';

import { GameId } from '../../../models/common.models';

export type StartPendingGameProps = { gameId: GameId };

export const StartPendingGame = ({ gameId }: StartPendingGameProps) => {
    const action = useStartPendingGame();
    const onClick = () => action(gameId);

    return <Button onClick={onClick} label={startPendingGameLabel}></Button>;
};
