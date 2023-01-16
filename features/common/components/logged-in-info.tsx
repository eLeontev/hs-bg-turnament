import { Group, Text } from '@mantine/core';

import { pendingGamesPageUrl } from '../../../constants/urls';
import { InlineLink } from './link.component';

const pendingGamePageLinkLabel = 'pending-games page';

export const LoggedInInfo = () => (
    <Group>
        <Text>To start to search games please visit</Text>
        <InlineLink
            href={pendingGamesPageUrl}
            label={pendingGamePageLinkLabel}
        ></InlineLink>
    </Group>
);
