import { Group, Text } from '@mantine/core';

export type PairComponentProps = { label: string; value: string };

export const PairComponent = ({ label, value }: PairComponentProps) => (
    <Group>
        <Text>{label}:</Text>
        <Text weight={700}>{value}</Text>
    </Group>
);
