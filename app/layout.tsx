'use client';

import { ReactElement, useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';

import { Navigation } from '../ui/components/navigation';

import { useApollo } from '../lib/graphql.client';

import '../styles/globals.css';

export type LayoutProps = {
    children: ReactElement;
};

const BrowserProvider = ({ children }: LayoutProps) => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!isMounted) {
        return null;
    }

    return children;
};

const RootContent = ({ children }: LayoutProps) => {
    const client = useApollo();

    return (
        <>
            <Navigation></Navigation>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </>
    );
};
const RootLayout = ({ children }: LayoutProps) => (
    <html lang="en">
        <body>
            <BrowserProvider>
                <RootContent>{children}</RootContent>
            </BrowserProvider>
        </body>
    </html>
);

export default RootLayout;
