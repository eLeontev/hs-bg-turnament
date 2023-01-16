'use client';

import { ReactElement, useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppShell, MantineProvider } from '@mantine/core';

import { Navigation } from '../features/common/components/navigation';

import { useApollo } from '../lib/graphql.client';

import '../styles/globals.css';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { playerLoginState } from '../features/login/components/atoms/player-login.atom';
import { getLogin } from '../utils.ts/storage.utils';
import { noLogin } from '../features/login/login.constants';

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

    return (
        <AppShell
            padding="md"
            header={<Navigation></Navigation>}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
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
