'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { ReactElement, useMemo } from 'react';
import { pendingGamesPageUrl } from '../../constants/urls';
import { usePlayGameQuery } from '../../hooks/play-game/play-game.hooks';
import { Message } from '../../models/graphql.models';
import { PrivateRouter } from '../../ui/routers/private-router';

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
    console.log(data);
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
