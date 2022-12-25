import pendingGamesStore from '../../constants/pending-games.constants';
import { socketRoomIds } from '../../enums/socket.enums';

import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    PendingGame,
} from '../../models/pending-games.models';

import { getHash } from '../../utils.ts/hash-server.utils';
import { getSocket } from '../../utils.ts/socket.utils';

export const createPendingGame = async ({
    authorId,
    authorLogin,
}: CreatePendingGameBody) => {
    if (pendingGamesStore.pendingGamesAuthorIds.has(authorId)) {
        throw new Error('only one game can be created at time');
    }

    pendingGamesStore.pendingGamesAuthorIds.add(authorId);
    pendingGamesStore.pendingGames = [
        ...pendingGamesStore.pendingGames,
        {
            authorId,
            gameId: await getHash(),
            authorLogin: authorLogin,
            createdDate: new Date().toUTCString(),
            countOfPlayers: 1,
        },
    ];
    console.log('create', pendingGamesStore.pendingGames);
};

export const deletePendingGame = ({ authorId }: DeletePendingGameBody) => {
    if (!pendingGamesStore.pendingGamesAuthorIds.has(authorId)) {
        throw new Error('you are not an author of any game');
    }

    pendingGamesStore.pendingGamesAuthorIds.delete(authorId);
    pendingGamesStore.pendingGames = pendingGamesStore.pendingGames.filter(
        (pendingGame: PendingGame) => pendingGame.authorId !== authorId
    );
};

export const getPendingGames = () => {
    console.log('get', pendingGamesStore.pendingGames);
    return pendingGamesStore.pendingGames;
};
