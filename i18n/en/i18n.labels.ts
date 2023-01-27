import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const enLabelMessages: I18nTransMessages<namespaces.labels> = {
    selectLanguage: 'Select a Language',
    en: 'English',
    ru: 'Russian',
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
};
