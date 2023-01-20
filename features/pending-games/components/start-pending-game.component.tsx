import { ReactElement } from 'react';
import { IconPlayerPlay } from '@tabler/icons';

import { trpc } from '../../../lib/client';

import { IconButton } from '../../common/components/button.component';

import { GameId } from '../../../models/common.models';

import { getSavePlayerId } from '../../../utils.ts/storage.utils';

export type StartPendingGameProps = { gameId: GameId };

export const StartPendingGameComponent = ({
    gameId,
}: StartPendingGameProps) => {
    const mutation = trpc.startPlayGame.useMutation();
    const onClick = () =>
        mutation.mutate({ gameId, playerId: getSavePlayerId() });

    return (
        <IconButton color="green" onClick={onClick}>
            <IconPlayerPlay></IconPlayerPlay>
        </IconButton>
    );
};

type NextAddDirPage = (
    props: StartPendingGameProps & {
        pageProps: Record<string, unknown>;
    }
) => ReactElement;

const pageProps = {};

export function StartPendingGame({ gameId }: StartPendingGameProps) {
    // TODO: report error for appDir
    const Component = trpc.withTRPC(
        StartPendingGameComponent
    ) as NextAddDirPage;
    return <Component gameId={gameId} pageProps={pageProps}></Component>;
}
