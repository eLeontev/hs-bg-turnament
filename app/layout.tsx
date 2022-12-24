'use client';

import { ApolloProvider } from '@apollo/client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';

import { logoutHandler } from '../services/login.service';

import { useRouting } from '../hooks/routing.hook';

import { useApollo } from '../lib/graphql.client';

import { noLoginLabel } from '../constants/login.constants';

import { getLogin } from '../utils.ts/storage.utils';

import '../styles/globals.css';
import { useSetPlayerId } from '../hooks/player-id.hook';

const Login = ({ router }: { router: AppRouterInstance }) => {
    const login = getLogin();

    return login ? (
        <button onClick={() => logoutHandler(router)}>
            {login} {'>'} logout
        </button>
    ) : (
        <span>{noLoginLabel}</span>
    );
};

const RootLayout = ({ children }: any) => {
    const client = useApollo();
    const router = useRouter();

    useSetPlayerId();
    useRouting(router);

    return (
        <html lang="en">
            <body>
                <Login router={router} />
                <ApolloProvider client={client}>{children}</ApolloProvider>
            </body>
        </html>
    );
};

export default RootLayout;
