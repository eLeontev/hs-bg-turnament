enum localStorageKeys {
    login = 'HS_BG_login',
    playerId = 'HS_BG_player-id',
}

const noValue = '';

const setItem = (key: localStorageKeys, value: string): void =>
    localStorage.setItem(key, value);
const getItem = (key: localStorageKeys) => localStorage.getItem(key);

export const setLogin = (login: string): void =>
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
