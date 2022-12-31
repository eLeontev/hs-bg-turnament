import { Group, Title } from '@mantine/core';
import Image from 'next/image';

const logoSize = 36;
const logoSrc = '/hearthstone-logo.svg';
const logoAlt = 'HS BG';

export const Logo = () => (
    <Group>
        <Image
            width={logoSize}
            height={logoSize}
            src={logoSrc}
            alt={logoSrc}
        ></Image>
        <Title order={4}>HS BG Competition</Title>
    </Group>
);
