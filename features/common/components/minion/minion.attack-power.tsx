import Image from 'next/image';

import { Flex, Text } from '@mantine/core';

import { useMinionAttackPowerStyles } from '../../styles/minion.styles';

export type MinionAttackPowerProps = { attackPower: number };
export const MinionAttackPower = ({ attackPower }: MinionAttackPowerProps) => {
    const { classes } = useMinionAttackPowerStyles(attackPower);

    return (
        <Flex className={classes.attackPowerContainer}>
            <Image
                priority
                width={55}
                height={55}
                src="/attack-power.png"
                alt=""
            ></Image>
            <Text className={classes.attackPower}>{attackPower}</Text>
        </Flex>
    );
};
