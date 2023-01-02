import Link from 'next/link';
import { Group, Text, Anchor } from '@mantine/core';

import { pendingGamesPageUrl } from '../../constants/urls';

export const LoggedInInfo = () => (
    <Group>
        <Text>To start to search games please visit</Text>
        <Anchor>
            <Link href={pendingGamesPageUrl}>pending-games page</Link>{' '}
        </Anchor>
    </Group>
);
