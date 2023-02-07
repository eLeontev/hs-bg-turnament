import Image from 'next/image';

import { Flex, Text } from '@mantine/core';

import { useMinionHitpointsStyles } from '../../styles/minion.styles';

export type MinionCountOfHitpointsProps = { countOfHitpoints: number };
export const MinionCountOfHitpoints = ({
    countOfHitpoints,
}: MinionCountOfHitpointsProps) => {
    const { classes } = useMinionHitpointsStyles(countOfHitpoints);

    return (
        <Flex className={classes.countOfHitpointsContainer}>
            <Image
                priority
                width={50}
                height={50}
                src="/hit-points.png"
                alt=""
            ></Image>
            <Text className={classes.countOfHitpoints}>{countOfHitpoints}</Text>
        </Flex>
    );
};
