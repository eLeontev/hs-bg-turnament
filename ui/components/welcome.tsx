'use client';

import { LoggedInInfo } from './logged-in-info';
import { LoginInfo } from './login-info';

import { getLogin } from '../../utils.ts/storage.utils';
import {Container, Space, Title} from "@mantine/core";

export const WelcomeScreen = () => {
    const isLoggedIn = getLogin();

    return (
        <Container>
            <Title order={1} mx="">Welcome to Hearthstone Battlegrounds Competition</Title>
          <Space h="xl"></Space>
            {isLoggedIn ? (
                <LoggedInInfo></LoggedInInfo>
            ) : (
                <LoginInfo></LoginInfo>
            )}
        </Container>
    );
};
