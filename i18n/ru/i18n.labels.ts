import { namespaces } from '../i18n.enums';

import { I18nTransMessages } from '../i18n.models';

export const ruLabelMessages: I18nTransMessages<namespaces.labels> = {
    selectLanguage: 'Выберите язык',
    en: 'Английский',
    ru: 'Русский',
    loginInputlabel: 'Логин',
    loginInputPlaceholder: 'Введите логин',
    loginButtonLabel: 'Логин',
    pendingGameSearchNewGamePrefix:
        'Игра не найдена, пожалуйста, попробуйте найти',
    pendingGameSearchNewGamePostfix: 'другую игру',
    timerPendingLabel: 'ждемс',
};
