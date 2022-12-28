'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { ReactElement, useMemo } from 'react';
import { gameSearchPageUrl } from '../../constants/urls';
import { initPlayGameQuery } from '../../graphql/queries';
import { Message } from '../../models/graphql.models';
import { InitPlayGameVariables } from '../../models/init-play-game.models';
import { InitPlayGameBody } from '../../models/play-game.models';
import { getInitPlayGameVariables } from '../../services/init-play-game.service';
import { PrivateRouter } from '../../ui/routers/private-router';

export type InitPlayGameProps = PlayGameLayoutProps & {
    initPlayGameVariables: InitPlayGameVariables;
};
export type PlayGameLayoutProps = {
    children: ReactElement;
};

const GameNotFound = () => (
    <>
        The game cannot be defined please{' '}
        <Link href={gameSearchPageUrl}>search for a new game</Link>
    </>
);
const InitPlayGame = ({
    initPlayGameVariables,
    children,
}: InitPlayGameProps) => {
    const { data } = useQuery<Message, InitPlayGameBody>(
        initPlayGameQuery,
        initPlayGameVariables
    );

    return data ? children : <GameNotFound></GameNotFound>;
};

const PlayGameLayout = ({ children }: PlayGameLayoutProps) => {
    const initPlayGameVariables = useMemo(() => getInitPlayGameVariables(), []);

    return (
        <PrivateRouter>
            {initPlayGameVariables ? (
                <InitPlayGame initPlayGameVariables={initPlayGameVariables}>
                    {children}
                </InitPlayGame>
            ) : (
                <GameNotFound></GameNotFound>
            )}
        </PrivateRouter>
    );
};
export default PlayGameLayout;
