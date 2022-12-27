import { ResultOf } from '@graphql-typed-document-node/core';

enum localStorageKeys {
    login = 'HS_BG_login',
    playerId = 'HS_BG_player-id',
}

const noValue = '';

const inBrowser = <T>(cb: () => T): T | null =>
    typeof localStorage !== 'undefined' ? cb() : null;

const setItem = (key: localStorageKeys, value: string): null | void =>
    inBrowser(() => localStorage.setItem(key, value));

const getItem = (key: localStorageKeys) =>
    inBrowser(() => localStorage.getItem(key));

export const setLogin = (login: string): void | null =>
    setItem(localStorageKeys.login, login);
export const getLogin = () => getItem(localStorageKeys.login);

export const setPlayerId = (playerId: string) =>
    setItem(localStorageKeys.playerId, playerId);
export const getPlayerId = () => getItem(localStorageKeys.playerId);

export const clearAllLocalStorageValues = () => {
    Object.values(localStorageKeys).forEach((key: localStorageKeys) =>
        setItem(key, noValue)
    );
};
