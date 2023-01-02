import { Group, Title } from '@mantine/core';
import Image from 'next/image';

import { InlineLink } from './link.component';

import { rootPageUrl } from '../../constants/urls';

const logoSize = 36;

const logoSrc = '/hearthstone-logo.svg';
const logoAlt = 'HS BG';

const logoLabel = 'HS BG Competition';

export const Logo = () => (
    <Group>
        <Image
            width={logoSize}
            height={logoSize}
            src={logoSrc}
            alt={logoAlt}
        ></Image>
        <Title order={4}>
            <InlineLink href={rootPageUrl} label={logoLabel}></InlineLink>
        </Title>
    </Group>
);
