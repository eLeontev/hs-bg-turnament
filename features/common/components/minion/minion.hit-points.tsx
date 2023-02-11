import Image from 'next/image';

import { Flex, Text } from '@mantine/core';

import {
    MinionHitpointsStyleProps,
    useMinionHitpointsStyles,
} from '../../styles/minion.styles';

export const MinionCountOfHitpoints = ({
    countOfHitpoints,
    isSummoned,
}: MinionHitpointsStyleProps) => {
    const { classes } = useMinionHitpointsStyles({
        countOfHitpoints,
        isSummoned,
    });

    return (
        <Flex className={classes.countOfHitpointsContainer}>
            <Image
                priority
                width={56}
                height={58}
                src="/hit-points.png"
                alt=""
            ></Image>
            <Text className={classes.countOfHitpoints}>{countOfHitpoints}</Text>
        </Flex>
    );
};
