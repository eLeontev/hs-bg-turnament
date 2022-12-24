import { NextApiRequest, NextApiResponse } from 'next';
import {
    createPendingGame,
    deletePendingGame,
    getPendingGames,
} from '../../services/server/pending-game.server.service';
import pendingGamesStore from '../../constants/pending-games.constants';
import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    PendinGameBody,
} from '../../models/pending-games.models';

const getPendingGamesHandler = (res: NextApiResponse) =>
    res.send(getPendingGames());

const createPendingGameHandler = async (
    res: NextApiResponse,
    body: CreatePendingGameBody
) => {
    if (pendingGamesStore.pendingGamesAuthorIds.has(body.authorId)) {
        return res
            .status(401)
            .send({ message: 'only one game can be created at time' });
    }

    await createPendingGame(body);

    res.send({ message: 'game created' });
};

const deletePendingGameHandler = async (
    res: NextApiResponse,
    body: DeletePendingGameBody
) => {
    if (!pendingGamesStore.pendingGamesAuthorIds.has(body.authorId)) {
        return res
            .status(401)
            .send({ message: 'here are no games where you are an author' });
    }

    await deletePendingGame(body);

    res.status(201).send({ message: 'game deleted' });
};

const pendingGameHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const pendingGameBody: PendinGameBody = JSON.parse(req.body || '{}');

    if (req.method === 'POST') {
        createPendingGameHandler(res, pendingGameBody);
        return;
    }

    if (req.method === 'DELETE') {
        deletePendingGameHandler(res, pendingGameBody);
        return;
    }

    if (req.method === 'GET') {
        getPendingGamesHandler(res);
        return;
    }

    res.status(401).send({ message: 'not implemented yet' });
};

export default pendingGameHandler;
