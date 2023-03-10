import {
    maxLoginLength,
    minLoginLength,
} from '../../features/login/login.config';
import {
    minGameNameLength,
    maxGameNameLength,
} from '../../features/pending-games/pending-games.config';

import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const enLabelMessages: I18nTransMessages<namespaces.labels> = {
    selectLanguage: 'Select a Language',
    en: 'English',
    ru: 'Russian',

    welcomePageText: 'Welcome to Hearthstone Battlegrounds Competition',
    welcomeHelperText: 'To start to search games please visit',
    welcomeRedirectLink: 'pending-games page',

    loginInputLabel: 'Login',
    loginInputPlaceholder: 'Your Login',
    loginButtonLabel: 'Login',
    pendingGameSearchNewGamePrefix: 'The game cannot be defined please',
    pendingGameSearchNewGamePostfix: 'search for a new game',
    timerPendingLabel: 'waiting',
    logoutConfirmationTitle: 'Please confirm logout action',
    cancelButtonLabel: 'Cancel',
    logoutLabel: 'Logout',
    welcomeLoginLabel: 'Welcome,',

    loginInfoText: 'Before to play please create an account at',
    loginPageLink: 'login page',
    loginNotificationLabel: `login length should be in the range between ${minLoginLength} and ${maxLoginLength}`,

    pendingGameCountOfPlayers: 'Count of players',
    pendingGameNoGamesFound: 'No games found',
    pendingGameAuthor: 'Author',
    pendingGameGameName: 'Game name',
    pendingGameCreationTime: 'Time created',
    playerInGameDisableReasonLabel: 'only one game is available at time',
    createPendingGameInputLabel: 'Please enter game name before to create it',
    createPendingGameInputPlaceholder: 'Game name',
    createGameButtonLabel: 'Create Game',
    createPendingGameLabel: 'Create pending game',
    pendingGameNameErrorMessage: `Game name length should be between the range ${minGameNameLength} and ${maxGameNameLength}.`,
    pendingGameTimeAgoPostfix: 'ago',

    online: 'Online',
    offline: 'Offline',
    player: 'Player',

    selectHeroLabel: 'Select hero',

    gameConfigTitle: 'Welcome to config. Here you can customize your game.',

    switchToTriple: 'Triple',
    switchToRegular: 'Regular',
    switchToTavernMinions: `tavern's minions`,
    switchToSummonedMinions: 'summoned minions',
};
