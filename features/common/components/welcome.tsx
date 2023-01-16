'use client';

import { LoggedInInfo } from './logged-in-info';
import { LoginInfo } from '../../login/components/login-info';

import { getLogin } from '../../../utils.ts/storage.utils';
import { Center, Container, Space, Title } from '@mantine/core';

export const WelcomeScreen = () => {
    const isLoggedIn = getLogin();

    return (
        <Container>
            <Center>
                <Title order={1}>
                    Welcome to Hearthstone Battlegrounds Competition
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
