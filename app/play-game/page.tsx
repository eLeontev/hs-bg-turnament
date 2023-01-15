'use client';

import { ReactElement } from 'react';
import {
    useOnlineGameSocketRoom,
    useOnlinePlayerIds,
} from '../../hooks/online-game.socket.hooks';
import { usePlayGameActions } from '../../hooks/play-game/play-game.socket.hooks';
import { trpc } from '../../lib/client';

import { getGameId } from '../../utils.ts/storage.utils';

const Test = () => {
    const { data, mutate } = trpc.selectHero.useMutation();
    const onClick = () => mutate({ playerIdInGame: 'asdasd', heroId: '321' });
    return (
        <>
            {data}
            <button onClick={onClick}>mutate</button>
        </>
    );
};
const PlayGameScreen = () => {
    const gameId = getGameId() || '';

    useOnlineGameSocketRoom(gameId, true);
    const onlinePlayerIds = useOnlinePlayerIds();

    const playGameActions = usePlayGameActions(gameId);

    console.log(onlinePlayerIds);
    console.log(playGameActions);

    return (
        <>
            <Test></Test>the game has been started
        </>
    );
};

type NextAddDirPage = (props: {
    pageProps: Record<string, unknown>;
}) => ReactElement;

const pageProps = {};

export default function PlayGameWithTRPCPage() {
    // TODO: report error for appDir
    const Page = trpc.withTRPC(PlayGameScreen) as NextAddDirPage;
    return <Page pageProps={pageProps}></Page>;
}
