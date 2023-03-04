import { useEffect } from 'react';
import { Box, Notification } from '@mantine/core';

import {
    NotificationErrorMessage,
    notificationErrorMessagesSelector,
    removeFromNotificationsSelector,
    usePlayGameErrorHandlerStore,
} from '../store/play-game.error-handler.store';

import { useI18nErrorMessageTranslate } from '../../../../i18n/i18n.hooks';

import { errorMessageI18nKeys } from '../../../../i18n/enums/i18n.error-message.enums';

import { useNotificationStyles } from '../styles/play-game.notification.styles';

type NotificationComponentProps = {
    notificationErrorMessage: NotificationErrorMessage;
};
export const NotificationComponent = ({
    notificationErrorMessage: { errorMessageI18nKey, key },
}: NotificationComponentProps) => {
    const { classes } = useNotificationStyles();

    const t = useI18nErrorMessageTranslate();

    const removeFromNotifications = usePlayGameErrorHandlerStore(
        removeFromNotificationsSelector
    );

    useEffect(() => {
        setTimeout(() => removeFromNotifications(key), 5000);
    }, [key, removeFromNotifications]);

    return (
        <Notification
            className={classes.notification}
            disallowClose={true}
            color="red"
            title={t(errorMessageI18nKeys.errorTitle)}
        >
            {t(errorMessageI18nKey)}
        </Notification>
    );
};

export const Notifications = () => {
    const { classes } = useNotificationStyles();

    const notificationErrorMessages = usePlayGameErrorHandlerStore(
        notificationErrorMessagesSelector
    );

    return (
        <Box className={classes.notifications}>
            {notificationErrorMessages.map(
                (notificationErrorMessage: NotificationErrorMessage) => (
                    <NotificationComponent
                        key={notificationErrorMessage.key}
                        notificationErrorMessage={notificationErrorMessage}
                    ></NotificationComponent>
                )
            )}
        </Box>
    );
};
