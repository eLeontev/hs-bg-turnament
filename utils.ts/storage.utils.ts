import { ResultOf } from '@graphql-typed-document-node/core';
import { GameId, PlayerId, PlayerLogin } from '../models/common.models';

enum localStorageKeys {
    login = 'HS_BG_login',
    playerId = 'HS_BG_player-id',
    playerIdInGame = 'HS_BG_player-id-in-game',
    gameId = 'HS_BG_game-id',
}

const noValue = '';

const setItem = (key: localStorageKeys, value: string) =>
    localStorage.setItem(key, value);

const getItem = (key: localStorageKeys) => localStorage.getItem(key);

export const setLogin = (login: PlayerLogin): void | null =>
    setItem(localStorageKeys.login, login);
export const getLogin = () => getItem(localStorageKeys.login);

export const setPlayerId = (playerId: PlayerId) =>
    setItem(localStorageKeys.playerId, playerId);
export const getPlayerId = () => getItem(localStorageKeys.playerId);

export const setGameId = (gameId: GameId) =>
    setItem(localStorageKeys.gameId, gameId);
export const getGameId = () => getItem(localStorageKeys.gameId);

export const clearAllLocalStorageValues = () => {
    Object.values(localStorageKeys).forEach((key: localStorageKeys) =>
        setItem(key, noValue)
    );
};

export const setPlayerIdInGame = (playerIdInGame: string) =>
    setItem(localStorageKeys.playerIdInGame, playerIdInGame);

export const getPlayerIdInGame = () => getItem(localStorageKeys.playerIdInGame);
