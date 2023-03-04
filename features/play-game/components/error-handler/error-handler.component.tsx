import { Box } from '@mantine/core';

import { Notifications } from './notification.component';
import { OverlayLoader } from '../../../common/components/loader.component';

import {
    completeErrorHandlerSelector,
    errorMessageI18nKeySelector,
    usePlayGameErrorHandlerStore,
} from '../store/play-game.error-handler.store';

import { useOnRecruitPhaseInit } from '../../hooks/play-game.hooks';

export const ErrorHandlerComponent = () => {
    const errorMessageI18nKey = usePlayGameErrorHandlerStore(
        errorMessageI18nKeySelector
    );

    return (
        <Box>
            <Notifications></Notifications>
            <OverlayLoader
                visible={Boolean(errorMessageI18nKey)}
            ></OverlayLoader>
            {errorMessageI18nKey && <SyncEvent></SyncEvent>}
        </Box>
    );
};

const SyncEvent = () => {
    const hideNotification = usePlayGameErrorHandlerStore(
        completeErrorHandlerSelector
    );

    useOnRecruitPhaseInit(hideNotification);

    return null;
};
