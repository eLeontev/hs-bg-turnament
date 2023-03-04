'use client';

import { ReactElement } from 'react';

import { Group } from '@mantine/core';

import { trpc } from '../../lib/client';

import { PrivateRouter } from '../../features/common/components/routers/private-router';
import { InlineLink } from '../../features/common/components/link.component';
import { OverlayLoader } from '../../features/common/components/loader.component';

import {
    usePlayGameInitialization,
    useSetPlayGameInitialization,
} from '../../features/play-game/hooks/play-game.hooks';
import { useI18nLabelTranslate } from '../../i18n/i18n.hooks';

import {
    isReadySelector,
    usePlayGameStore,
} from '../../features/play-game/components/store/play-game.store';

import { labelI18nKeys } from '../../i18n/enums/i18n.label.enums';

import { pendingGamesPageUrl } from '../../constants/urls';

const GameNotFound = () => {
    const t = useI18nLabelTranslate();

    return (
        <Group>
            {t(labelI18nKeys.pendingGameSearchNewGamePrefix)}
            <InlineLink
                href={pendingGamesPageUrl}
                label={t(labelI18nKeys.pendingGameSearchNewGamePostfix)}
            ></InlineLink>
        </Group>
    );
};

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
    useSetPlayGameInitialization();

    // TODO: report error for appDir
    const Page = trpc.withTRPC(PlayGameLayout) as NextAddDirPage;
    return <Page pageProps={pageProps}>{children}</Page>;
}
