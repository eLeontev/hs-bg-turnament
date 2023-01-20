'use client';

import { ReactElement, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ApolloProvider } from '@apollo/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { AppShell, MantineProvider } from '@mantine/core';

import { Navigation } from '../features/common/components/navigation';

import { playerLoginState } from '../features/login/components/atoms/player-login.atom';

import { useApollo } from '../lib/graphql.client';

import { noLogin } from '../features/login/login.constants';

import { getLogin } from '../utils.ts/storage.utils';

import '../styles/globals.css';
import { useBackgroundStyles } from '../styles/backround.styles';
import { playGamePageUrl } from '../constants/urls';

export type LayoutProps = {
    children: ReactElement;
};

const BrowserProvider = ({ children }: LayoutProps) => {
    const [isMounted, setMounted] = useState(false);
    const setPlayerLogin = useSetRecoilState(playerLoginState);

    useEffect(() => {
        setPlayerLogin(getLogin() || noLogin);
        setMounted(true);
    }, [setPlayerLogin]);

    if (!isMounted) {
        return null;
    }

    return children;
};

const RootContent = ({ children }: LayoutProps) => {
    const client = useApollo();

    const isPlayGamePage = usePathname() === playGamePageUrl;
    const { classes } = useBackgroundStyles({ isPlayGamePage });

    return (
        <AppShell
            padding="md"
            header={<Navigation></Navigation>}
            className={classes.backgroundContainer}
        >
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </AppShell>
    );
};

const RootLayout = ({ children }: LayoutProps) => (
    <html lang="en">
        <body>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: 'dark', loader: 'dots' }}
            >
                <RecoilRoot>
                    <BrowserProvider>
                        <RootContent>{children}</RootContent>
                    </BrowserProvider>
                </RecoilRoot>
            </MantineProvider>
        </body>
    </html>
);

export default RootLayout;
