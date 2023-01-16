import { Server } from 'Socket.IO';

import {
    deletePendingGame,
    getPendingGames,
} from './pending-game.server.service';

import { notifyPendingGames } from '../sockets/pending-games.notification.socket';

import { pendginGameLiveDurationInMs } from '../pending-games.constants';

import { GameId, PlayerId } from '../../../models/common.models';

import {
    actionTypes,
    cancelTask,
    formActionId,
    scheduleTask,
} from '../../../utils.ts/scheduled-time.utils';

export const schedulePendingGameDelition = (
    io: Server,
    playerId: PlayerId,
    gameId: GameId
) => {
    const action = async () => {
        await deletePendingGame({ playerId, gameId });
        notifyPendingGames(io, getPendingGames());
        console.log('pending game deleted due expiration time:', gameId);
    };

    scheduleTask(
        action,
        formActionId(actionTypes.deletePendingGame, gameId),
        pendginGameLiveDurationInMs
    );
};

export const cancelDeletePendingGame = (gameId: GameId) => {
    cancelTask(formActionId(actionTypes.deletePendingGame, gameId));
    console.log('canceled scheduled game deletion:', gameId);
};
