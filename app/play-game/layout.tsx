'use client';

import { ReactElement } from 'react';
import Link from 'next/link';

import { PrivateRouter } from '../../ui/routers/private-router';

import { usePlayGameQuery } from '../../hooks/play-game/play-game.hooks';

import { pendingGamesPageUrl } from '../../constants/urls';

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
    const data = usePlayGameQuery();
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
export default PlayGameLayout;
