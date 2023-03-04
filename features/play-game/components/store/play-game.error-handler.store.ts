import { create } from 'zustand';
import { errorMessageI18nKeys } from '../../../../i18n/enums/i18n.error-message.enums';

export type NotificationErrorMessage = {
    errorMessageI18nKey: errorMessageI18nKeys;
    key: string;
};
export type NotificationErrorMessages = Array<NotificationErrorMessage>;

export type PlayGameErrorHandlerState = {
    errorMessageI18nKey: errorMessageI18nKeys | undefined;
    notificationErrorMessages: NotificationErrorMessages;
};

export type PlayGameErrorHandlerApi = {
    startErrorHandler: (errorMessageI18nKey: errorMessageI18nKeys) => void;
    completeErrorHandler: () => void;

    removeFromNotifications: (key: string) => void;
};
export const usePlayGameErrorHandlerStore = create<
    PlayGameErrorHandlerState & PlayGameErrorHandlerApi
>((set) => ({
    errorMessageI18nKey: undefined,
    notificationErrorMessages: [],
    startErrorHandler: (errorMessageI18nKey: errorMessageI18nKeys) =>
        set((state) => ({
            errorMessageI18nKey,
            notificationErrorMessages: [
                ...state.notificationErrorMessages,
                {
                    errorMessageI18nKey,
                    key: `${Math.random()}`,
                },
            ],
        })),
    completeErrorHandler: () => set({ errorMessageI18nKey: undefined }),
    removeFromNotifications: (key: string) =>
        set((state) => ({
            notificationErrorMessages: state.notificationErrorMessages.filter(
                (error: NotificationErrorMessage) => error.key !== key
            ),
        })),
}));

export const errorMessageI18nKeySelector = ({
    errorMessageI18nKey,
}: PlayGameErrorHandlerState) => errorMessageI18nKey;
export const notificationErrorMessagesSelector = ({
    notificationErrorMessages,
}: PlayGameErrorHandlerState) => notificationErrorMessages;

export const startErrorHandlerSelector = ({
    startErrorHandler,
}: PlayGameErrorHandlerApi) => startErrorHandler;
export const completeErrorHandlerSelector = ({
    completeErrorHandler,
}: PlayGameErrorHandlerApi) => completeErrorHandler;

export const removeFromNotificationsSelector = ({
    removeFromNotifications,
}: PlayGameErrorHandlerApi) => removeFromNotifications;
