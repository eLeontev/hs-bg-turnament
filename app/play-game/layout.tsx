'use client';

import { ReactElement } from 'react';

import { Group } from '@mantine/core';

import { trpc } from '../../lib/client';

import { PrivateRouter } from '../../features/common/components/routers/private-router';
import { InlineLink } from '../../features/common/components/link.component';
import { OverlayLoader } from '../../features/common/components/loader.component';

import {
    usePlayGameInitialization,
    useSetPlayGameBaseInput,
} from '../../features/play-game/hooks/play-game.hooks';

import {
    isReadySelector,
    usePlayGameStore,
} from '../../features/play-game/components/store/play-game.store';

import { pendingGamesPageUrl } from '../../constants/urls';

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
    const { isLoading, isError } = usePlayGameInitialization();
    const isReady = usePlayGameStore(isReadySelector);

    if (isLoading) {
        return <OverlayLoader visible></OverlayLoader>;
    }

    if (isError) {
        return <GameNotFound></GameNotFound>;
    }

    if (isReady) {
        return children;
    }

    return null;
};

export type PlayGameLayoutProps = {
    children: ReactElement;
};

const PlayGameLayout = ({ children }: PlayGameLayoutProps) => (
    <PrivateRouter>
        <PlayGame>{children}</PlayGame>
    </PrivateRouter>
);

type NextAddDirPage = (props: {
    children: ReactElement;
    pageProps: Record<string, unknown>;
}) => ReactElement;

const pageProps = {};

export default function PlayGameLayoutWithTRPCPage({
    children,
}: PlayGameLayoutProps) {
    useSetPlayGameBaseInput();

    // TODO: report error for appDir
    const Page = trpc.withTRPC(PlayGameLayout) as NextAddDirPage;
    return <Page pageProps={pageProps}>{children}</Page>;
}
