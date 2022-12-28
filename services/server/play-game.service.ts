import { playGames } from '../../constants/play-game.constants';
import { createPlayGameFactory } from '../../factories/play-game.factory';
import { GameId } from '../../models/common.models';
import { InitPlayGameBody } from '../../models/play-game.models';
import { Players } from '../../models/player-id.models';

export const startPlayGame = (gameId: GameId, players: Players) =>
    playGames.set(gameId, createPlayGameFactory(players));

export const getPlayGame = (gameId: GameId) => {
    const playGame = playGames.get(gameId);

    if (!playGame) {
        throw new Error('play game not found');
    }

    return playGame;
};

export const initPlayGame = ({
    gameId,
    privatePlayerId,
    playerId,
}: InitPlayGameBody) => {
    const playGame = getPlayGame(gameId);

    if (playGame.playerIds.has(privatePlayerId)) {
        throw new Error('you are ready to play the game');
    }

    console.log('register player in play game', privatePlayerId);
    playGame.playerIds.set(privatePlayerId, playerId);
};

export const finishPlayGame = (gameId: GameId) => {
    playGames.delete(gameId);
};
