import Link from 'next/link';
import { Anchor } from '@mantine/core';

export type LinkProps = {
    label: string;
    href: string;
};

export const InlineLink = ({ label, href }: LinkProps) => (
    <Anchor component="span" variant="gradient">
        <Link href={href}>{label}</Link>
    </Anchor>
);
