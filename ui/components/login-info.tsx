import Link from 'next/link';
import { Anchor, Group, Text } from '@mantine/core';

import { loginPageUrl } from '../../constants/urls';

export const LoginInfo = () => (
    <Group>
        <Text>Before to play please create an account at</Text>
        <Anchor>
            <Link href={loginPageUrl}>login page</Link>
        </Anchor>
    </Group>
);
