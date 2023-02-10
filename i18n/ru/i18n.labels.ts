import {
    minLoginLength,
    maxLoginLength,
} from '../../features/login/login.config';
import {
    minGameNameLength,
    maxGameNameLength,
} from '../../features/pending-games/pending-games.config';

import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const ruLabelMessages: I18nTransMessages<namespaces.labels> = {
    selectLanguage: 'Выберите язык',
    en: 'Английский',
    ru: 'Русский',

    welcomePageText:
        'Добро пожаловать в Hearthstone Battlegrounds Соревнование',
    welcomeHelperText: 'Чтобы начать игру перейдите на',
    welcomeRedirectLink: 'страницу подбора игр',

    loginInputLabel: 'Логин',
    loginInputPlaceholder: 'Введите логин',
    loginButtonLabel: 'Логин',
    pendingGameSearchNewGamePrefix:
        'Игра не найдена, пожалуйста, попробуйте найти',
    pendingGameSearchNewGamePostfix: 'другую игру',
    timerPendingLabel: 'ждемс',
    logoutConfirmationTitle: 'Пожалуйста, подтвердите выход',
    cancelButtonLabel: 'Отмена',
    logoutLabel: 'Выход',
    welcomeLoginLabel: 'Хей,',

    loginInfoText:
        'Пожалуйста, создайте аккаунт, перед тем как начать играть на',
    loginPageLink: 'странице регистрации',
    loginNotificationLabel: `Длина логина должна быть в диапазоне от ${minLoginLength} до ${maxLoginLength} символов.`,

    pendingGameCountOfPlayers: 'Количество игроков',
    pendingGameNoGamesFound: 'Пока игр нет',
    pendingGameAuthor: 'Автор',
    pendingGameGameName: 'Название игры',
    pendingGameCreactionTime: 'Дата создания',
    playerInGameDisableReasonLabel: 'одновременно доступна только одна игра',
    createPendingGameInputLabel:
        'Пожалуйста, введите название игры перед тем как создать ее',
    createPendingGameInputPlaceholder: 'Название игры',
    createGameButtonLabel: 'Создать',
    createPendingGameLabel: 'Создать игру',
    pendingGameNameErrorMessage: `Длина названия игры должна быть в диапазоне от ${minGameNameLength} до ${maxGameNameLength} символов.`,
    pendingGameTimeAgoPostfix: 'назад',

    online: 'Онлайн',
    offline: 'Оффлайн',
    player: 'Игрок',

    selectHeroLabel: 'Выбрать героя',

    gameConfigTitle:
        'Добро пожаловать в настройки игры. Здесь вы сможете кастомизировать свою игру.',

    switchToTriple: 'Триплет',
    switchToRegular: 'Обычный',
};
