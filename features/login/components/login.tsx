'use client';

import { Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '../../common/components/button.component';
import {
    ConfirmationModal,
    useModal,
} from '../../common/components/modal.confirmation.component';

import { logoutHandler, redirectToLoginPageHandler } from '../login.service';

import {
    loginSelector,
    setLoginSelector,
    useLoginStore,
} from './store/login.store';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

export const logoutLabels = {
    title: labelI18nKeys.logoutConfirmationTitle,
    cancelLabel: labelI18nKeys.cancelButtonLabel,
    confirmLabel: labelI18nKeys.logoutLabel,
};

export const Login = () => {
    const router = useRouter();

    const setLogin = useLoginStore(setLoginSelector);
    const login = useLoginStore(loginSelector);

    const props = useModal(() => logoutHandler(router, setLogin));

    const t = useI18nLabelTranslate();

    return login ? (
        <Group spacing="xs">
            <ConfirmationModal {...props} {...logoutLabels}></ConfirmationModal>
            <Text>{t(labelI18nKeys.welcomeLoginLabel)}</Text>
            <Text fw={700}>{login}</Text>
            <Button
                onClick={props.openModal}
                label={t(labelI18nKeys.logoutLabel)}
            ></Button>
        </Group>
    ) : (
        <Button
            onClick={() => redirectToLoginPageHandler(router)}
            label={t(labelI18nKeys.loginButtonLabel)}
        ></Button>
    );
};
