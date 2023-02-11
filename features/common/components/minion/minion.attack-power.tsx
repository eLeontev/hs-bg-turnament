import Image from 'next/image';

import { Flex, Text } from '@mantine/core';

import {
    MinionAttackPowerStyleProps,
    useMinionAttackPowerStyles,
} from '../../styles/minion.styles';

export const MinionAttackPower = ({
    attackPower,
    isSummoned,
}: MinionAttackPowerStyleProps) => {
    const { classes } = useMinionAttackPowerStyles({ attackPower, isSummoned });

    return (
        <Flex className={classes.attackPowerContainer}>
            <Image
                priority
                width={isSummoned ? 60 : 55}
                height={isSummoned ? 60 : 55}
                src="/attack-power.png"
                alt=""
            ></Image>
            <Text className={classes.attackPower}>{attackPower}</Text>
        </Flex>
    );
};
