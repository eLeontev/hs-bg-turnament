import { Server } from 'Socket.IO';

import { deletePlayGameOperation } from '../operations/play-game.operations';

import { notifyPlayersInPlayGame } from '../sockets/play-game.notification.socket';

import { playGameActions } from '../play-game.enums';

import { GameId } from '../../../models/common.models';
import { PlayGamePlayer } from '../../player/player.models';

export const finishPlayGame = async (
    io: Server,
    gameId: GameId,
    { playerKey }: PlayGamePlayer
) => {
    await deletePlayGameOperation(gameId);
    notifyPlayersInPlayGame(io, gameId, {
        action: playGameActions.gameOver,
        payload: { playerKey, cards: [] }, // TODO: add cards to send them to winner
    });
};
