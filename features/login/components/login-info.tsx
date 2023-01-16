import { Group, Text } from '@mantine/core';

import { loginPageUrl } from '../../../constants/urls';
import { InlineLink } from '../../common/components/link.component';

const loginPageLinkLabel = 'login page';

export const LoginInfo = () => (
    <Group>
        <Text>Before to play please create an account at</Text>
        <InlineLink href={loginPageUrl} label={loginPageLinkLabel}></InlineLink>
    </Group>
);
