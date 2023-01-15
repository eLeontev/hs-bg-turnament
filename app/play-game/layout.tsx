'use client';

import { ReactElement } from 'react';
import Link from 'next/link';

import { PrivateRouter } from '../../ui/routers/private-router';

import { pendingGamesPageUrl } from '../../constants/urls';
import { trpc } from '../../lib/client';
import { getGameId, getPlayerIdInGame } from '../../utils.ts/storage.utils';

const GameNotFound = () => (
    <>
        The game cannot be defined please{' '}
        <Link href={pendingGamesPageUrl}>search for a new game</Link>
    </>
);

export type PlayGameProps = {
    children: ReactElement;
};

const PlayGame = ({ children }: PlayGameProps) => {
    const data = trpc.playGameDetails.useQuery({
        playerIdInGame: getPlayerIdInGame() || '',
        gameId: getGameId() || '',
    });
    return data ? children : <GameNotFound></GameNotFound>;
};

export type PlayGameLayoutProps = {
    children: ReactElement;
};

const PlayGameLayout = ({ children }: PlayGameLayoutProps) => {
    return (
        <PrivateRouter>
            <PlayGame>{children}</PlayGame>
        </PrivateRouter>
    );
};

type NextAddDirPage = (props: {
    children: ReactElement;
    pageProps: Record<string, unknown>;
}) => ReactElement;

const pageProps = {};

export default function PlayGameLayoutWithTRPCPage({
    children,
}: PlayGameLayoutProps) {
    // TODO: report error for appDir
    const Page = trpc.withTRPC(PlayGameLayout) as NextAddDirPage;
    return <Page pageProps={pageProps}>{children}</Page>;
}
