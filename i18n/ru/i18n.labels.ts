import { namespaces } from '../enums/i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const ruLabelMessages: I18nTransMessages<namespaces.labels> = {
    selectLanguage: 'Выберите язык',
    en: 'Английский',
    ru: 'Русский',
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
};
