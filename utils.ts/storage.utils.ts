import { noLogin } from '../constants/login.constants';

export enum localStorageKeys {
    login = 'HS_BG_login',
}

const setItem = (key: localStorageKeys, value: string): void =>
    localStorage.setItem(key, value);
const getItem = (key: localStorageKeys) => localStorage.getItem(key);

export const setLogin = (login: string): void =>
    setItem(localStorageKeys.login, login);
export const getLogin = () => getItem(localStorageKeys.login);
export const clearLogin = () => setItem(localStorageKeys.login, noLogin);
