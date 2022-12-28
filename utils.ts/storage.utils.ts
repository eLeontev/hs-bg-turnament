import { ResultOf } from '@graphql-typed-document-node/core';
import {
    PlayerId,
    PlayerLogin,
    PrivatePlayerId,
} from '../models/common.models';

enum localStorageKeys {
    login = 'HS_BG_login',
    playerId = 'HS_BG_player-id',
    privatePlayerId = 'HS_BG_private_player-id',
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

export const setPrivatePlayerId = (privatePlayerId: PrivatePlayerId) =>
    setItem(localStorageKeys.privatePlayerId, privatePlayerId);
export const getPrivatePlayerId = () =>
    getItem(localStorageKeys.privatePlayerId);

export const clearAllLocalStorageValues = () => {
    Object.values(localStorageKeys).forEach((key: localStorageKeys) =>
        setItem(key, noValue)
    );
};
