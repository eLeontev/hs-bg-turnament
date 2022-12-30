import { Button } from '../button.component';

import { useJoinPendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import { joinPendingGameLabel } from '../../../constants/pending-games.constants';

import { GameId } from '../../../models/common.models';

export type JoinPendingGameProps = { gameId: GameId };

export const JoinPendingGame = ({ gameId }: JoinPendingGameProps) => {
    const action = useJoinPendingGame();
    const onClick = () => action(gameId);

    return <Button onClick={onClick} label={joinPendingGameLabel}></Button>;
};
