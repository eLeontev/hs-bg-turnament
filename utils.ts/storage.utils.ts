import {
    playerIdInGameSchema,
    playerIdSchema,
    playerKeySchema,
} from '../features/player/player.schemas';
import { gameIdSchema } from '../features/pending-games/pending-games.schemas';

import { locales } from '../i18n/i18n.enums';

import {
    GameId,
    PlayerId,
    PlayerKey,
    PlayerLogin,
} from '../models/common.models';

enum localStorageKeys {
    login = 'HS_BG_login',
    playerId = 'HS_BG_player-id',
    playerIdInGame = 'HS_BG_player-id-in-game',
    playerKey = 'HS_BG_player-key',
    gameId = 'HS_BG_game-id',
    i18nLocale = 'HS_BG_i18n-locale',
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
export const getSavePlayerId = () => playerIdSchema.parse(getPlayerId());

export const setGameId = (gameId: GameId) =>
    setItem(localStorageKeys.gameId, gameId);
export const getGameId = () => getItem(localStorageKeys.gameId);
export const getSaveGameId = () => gameIdSchema.parse(getGameId());

export const clearAllLocalStorageValues = () => {
    Object.values(localStorageKeys).forEach((key: localStorageKeys) =>
        setItem(key, noValue)
    );
};

export const setPlayerIdInGame = (playerIdInGame: string) =>
    setItem(localStorageKeys.playerIdInGame, playerIdInGame);

export const getPlayerIdInGame = () => getItem(localStorageKeys.playerIdInGame);
export const getSavePlayerIdInGame = () =>
    playerIdInGameSchema.parse(getPlayerIdInGame());

export const setPlayerKey = (playerKey: PlayerKey) =>
    setItem(localStorageKeys.playerKey, playerKey);

export const getPlayerKey = () => getItem(localStorageKeys.playerKey);
export const getSavePlayerKey = () => playerKeySchema.parse(getPlayerKey());

export const setI18nLocale = (locale: locales) =>
    setItem(localStorageKeys.i18nLocale, locale);

export const getI18nLocale = () =>
    getItem(localStorageKeys.i18nLocale) as locales;
