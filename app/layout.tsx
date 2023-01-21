'use client';

import { ReactElement, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ApolloProvider } from '@apollo/client';

import { AppShell, MantineProvider } from '@mantine/core';

import { Navigation } from '../features/common/components/navigation';

import { useApollo } from '../lib/graphql.client';

import { noLogin } from '../features/login/login.constants';

import { getLogin } from '../utils.ts/storage.utils';

import '../styles/globals.css';
import { useBackgroundStyles } from '../styles/backround.styles';
import { playGamePageUrl } from '../constants/urls';
import {
    setLoginSelector,
    useLoginStore,
} from '../features/login/components/store/login.store';

export type LayoutProps = {
    children: ReactElement;
};

const BrowserProvider = ({ children }: LayoutProps) => {
    const [isMounted, setMounted] = useState(false);
    const setPlayerLogin = useLoginStore(setLoginSelector);

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
                <BrowserProvider>
                    <RootContent>{children}</RootContent>
                </BrowserProvider>
            </MantineProvider>
        </body>
    </html>
);

export default RootLayout;
