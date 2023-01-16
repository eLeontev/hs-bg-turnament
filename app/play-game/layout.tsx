'use client';

import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Group } from '@mantine/core';

import { trpc } from '../../lib/client';

import { playGamePhaseState } from '../../features/play-game/components/atoms/play-game.phases.atom';

import { PrivateRouter } from '../../features/common/components/routers/private-router';
import { InlineLink } from '../../features/common/components/link.component';

import { pendingGamesPageUrl } from '../../constants/urls';

import { getGameId, getPlayerIdInGame } from '../../utils.ts/storage.utils';

const GameNotFound = () => (
    <Group>
        The game cannot be defined please
        <InlineLink
            href={pendingGamesPageUrl}
            label="search for a new game"
        ></InlineLink>
    </Group>
);

export type PlayGameProps = {
    children: ReactElement;
};

const PlayGame = ({ children }: PlayGameProps) => {
    const { data } = trpc.playGameDetails.useQuery({
        playerIdInGame: getPlayerIdInGame() || '',
        gameId: getGameId() || '',
    });
    const [playGamePhase, setPlayGameState] =
        useRecoilState(playGamePhaseState);

    useEffect(
        () => (data?.phase ? setPlayGameState(data.phase) : undefined),
        [setPlayGameState, data]
    );

    return playGamePhase ? children : <GameNotFound></GameNotFound>;
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
