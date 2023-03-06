import Image from 'next/image';

import { Flex, Text } from '@mantine/core';

import {
    MinionHitPointsStyleProps,
    useMinionHitPointsStyles,
} from '../../styles/minion.styles';

export const MinionCountOfHitPoints = ({
    countOfHitPoints,
    isSummoned,
}: MinionHitPointsStyleProps) => {
    const { classes } = useMinionHitPointsStyles({
        countOfHitPoints,
        isSummoned,
    });

    return (
        <Flex className={classes.countOfHitPointsContainer}>
            <Image
                priority
                width={56}
                height={58}
                src="/hit-points.png"
                alt=""
            ></Image>
            <Text className={classes.countOfHitPoints}>{countOfHitPoints}</Text>
        </Flex>
    );
};
