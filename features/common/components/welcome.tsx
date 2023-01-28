'use client';

import { Center, Container, Space, Title } from '@mantine/core';

import { LabelTrans } from '../../../i18n/i18n.trans.component';
import { LoggedInInfo } from './logged-in-info';
import { LoginInfo } from '../../login/components/login-info';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { getLogin } from '../../../utils.ts/storage.utils';

export const WelcomeScreen = () => {
    const isLoggedIn = getLogin();

    return (
        <Container>
            <Center>
                <Title order={1} sx={{ textAlign: 'center' }}>
                    <LabelTrans
                        i18nKey={labelI18nKeys.welcomePageText}
                    ></LabelTrans>
                </Title>
            </Center>
            <Space h="xl"></Space>
            <Center>
                {isLoggedIn ? (
                    <LoggedInInfo></LoggedInInfo>
                ) : (
                    <LoginInfo></LoginInfo>
                )}
            </Center>
        </Container>
    );
};
