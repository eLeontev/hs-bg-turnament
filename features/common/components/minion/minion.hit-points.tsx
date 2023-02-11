import Image from 'next/image';

import { Flex, Text } from '@mantine/core';

import { useMinionHitpointsStyles } from '../../styles/minion.styles';
import { minionIds } from '@prisma/client';

export type MinionCountOfHitpointsProps = {
    minionId: minionIds;
    countOfHitpoints: number;
};
export const MinionCountOfHitpoints = ({
    countOfHitpoints,
}: MinionCountOfHitpointsProps) => {
    const { classes } = useMinionHitpointsStyles(countOfHitpoints);

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
